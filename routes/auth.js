const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { redirectIfAuthenticated, requireAuth } = require('../middleware/auth');

router.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.redirect(req.session.user.role === 'admin' ? '/admin' : '/dashboard');
});

router.get('/register', redirectIfAuthenticated, (req, res) => {
  res.render('register', { title: 'Create Account', errors: [], old: {}, success: req.flash('success') });
});

router.post('/register', redirectIfAuthenticated, [
  body('name').trim().notEmpty().withMessage('Full name is required.'),
  body('email').isEmail().withMessage('Enter a valid email address.').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
  body('password_confirm').custom((value, { req }) => {
    if (value !== req.body.password) throw new Error('Passwords do not match.');
    return true;
  }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('register', { title: 'Create Account', errors: errors.array(), old: req.body, success: [] });
  }

  const { name, email, password } = req.body;
  const existing = db.get('users').find({ email }).value();
  if (existing) {
    return res.render('register', {
      title: 'Create Account',
      errors: [{ msg: 'An account with this email already exists.' }],
      old: req.body, success: [],
    });
  }

  const hashed = bcrypt.hashSync(password, 10);
  const users = db.get('users').value();
  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

  db.get('users').push({
    id: newId, name, email,
    password: hashed,
    role: 'user',
    created_at: new Date().toISOString()
  }).write();

  req.flash('success', 'Account created! You can now log in.');
  res.redirect('/login');
});

router.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('login', { title: 'Sign In', error: req.flash('error'), success: req.flash('success'), old: {} });
});

router.post('/login', redirectIfAuthenticated, [
  body('email').isEmail().withMessage('Enter a valid email.').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required.'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('login', { title: 'Sign In', error: [errors.array()[0].msg], success: [], old: req.body });
  }

  const { email, password } = req.body;
  const user = db.get('users').find({ email }).value();

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.render('login', { title: 'Sign In', error: ['Invalid email or password.'], success: [], old: req.body });
  }

  req.session.user = { id: user.id, name: user.name, email: user.email, role: user.role };

  res.redirect(user.role === 'admin' ? '/admin' : '/dashboard');
});

router.get('/dashboard', requireAuth, (req, res) => {
  if (req.session.user.role === 'admin') return res.redirect('/admin');
  res.render('dashboard', { title: 'Dashboard', user: req.session.user });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;
