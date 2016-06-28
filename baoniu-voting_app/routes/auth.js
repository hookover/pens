/**
 * Created by apple on 16/6/28.
 */
var passport = require('passport');

module.exports = function(router) {
    router.get('/login', function(req, res, next) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    router.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('loginMessage') });
    });

    router.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', { user: req.user });
    });

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/auth/github', passport.authenticate('github'));

    router.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect: '/profile',
        failureRedirect: '/',
    }));


    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true,
    }));

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true,
    }));
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}