const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');
const { requireAdmin } = require('../middleware/auth');

router.get('/', requireAdmin, (req, res) => {
  const users = db.get('users').value();
  const totalUsers  = users.filter(u => u.role !== 'admin').length;
  const totalAdmins = users.filter(u => u.role === 'admin').length;
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentSignups = users.filter(u => new Date(u.created_at) >= weekAgo && u.role !== 'admin').length;

  res.render('admin/dashboard', {
    title: 'Admin Panel',
    admin: req.session.user,
    users: users.filter(u => u.role !== 'admin'),
    stats: { totalUsers, totalAdmins, recentSignups },
    success: req.flash('success'),
    error: req.flash('error'),
  });
});

router.get('/users', requireAdmin, (req, res) => {
  const search = (req.query.search || '').toLowerCase();
  let users = db.get('users').filter(u => u.role !== 'admin').value();
  if (search) {
    users = users.filter(u =>
      u.name.toLowerCase().includes(search) ||
      u.email.toLowerCase().includes(search)
    );
  }
  res.render('admin/users', {
    title: 'Manage Users',
    admin: req.session.user,
    users,
    search,
    success: req.flash('success'),
    error: req.flash('error'),
  });
});

router.get('/users/add', requireAdmin, (req, res) => {
  res.render('admin/add-user', {
    title: 'Add User',
    admin: req.session.user,
    errors: [],
    old: {},
  });
});

router.post('/users/add', requireAdmin, [
  body('name').trim().notEmpty().withMessage('Full name is required.'),
  body('email').isEmail().withMessage('Enter a valid email.').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
  body('role').isIn(['user', 'admin']).withMessage('Invalid role.'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('admin/add-user', {
      title: 'Add User', admin: req.session.user,
      errors: errors.array(), old: req.body,
    });
  }

  const { name, email, password, role } = req.body;
  const existing = db.get('users').find({ email }).value();
  if (existing) {
    return res.render('admin/add-user', {
      title: 'Add User', admin: req.session.user,
      errors: [{ msg: 'This email is already registered.' }], old: req.body,
    });
  }

  const users = db.get('users').value();
  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

  db.get('users').push({
    id: newId, name, email,
    password: bcrypt.hashSync(password, 10),
    role: role || 'user',
    created_at: new Date().toISOString()
  }).write();

  req.flash('success', `User "${name}" added successfully.`);
  res.redirect('/admin/users');
});

router.post('/users/delete/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const user = db.get('users').find({ id }).value();

  if (!user) {
    req.flash('error', 'User not found.');
    return res.redirect('/admin/users');
  }
  if (user.role === 'admin') {
    req.flash('error', 'Cannot delete an admin account.');
    return res.redirect('/admin/users');
  }

  db.get('users').remove({ id }).write();
  req.flash('success', `User "${user.name}" deleted.`);
  res.redirect('/admin/users');
});

router.post('/users/toggle-role/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const user = db.get('users').find({ id }).value();

  if (!user || user.role === 'admin') {
    req.flash('error', 'Cannot change this user\'s role.');
    return res.redirect('/admin/users');
  }

  const newRole = user.role === 'user' ? 'admin' : 'user';
  db.get('users').find({ id }).assign({ role: newRole }).write();
  req.flash('success', `${user.name}'s role changed to "${newRole}".`);
  res.redirect('/admin/users');
});

module.exports = router;
