
function redirectIfAuthenticated(req, res, next) {
  if (req.session.user) {
    return res.redirect(req.session.user.role === 'admin' ? '/admin' : '/dashboard');
  }
  next();
}


function requireAuth(req, res, next) {
  if (!req.session.user) {
    req.flash('error', 'Please log in to access this page.');
    return res.redirect('/login');
  }
  next();
}


function requireAdmin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', 'Please log in.');
    return res.redirect('/login');
  }
  if (req.session.user.role !== 'admin') {
    return res.status(403).render('403', { title: 'Access Denied' });
  }
  next();
}

module.exports = { redirectIfAuthenticated, requireAuth, requireAdmin };
