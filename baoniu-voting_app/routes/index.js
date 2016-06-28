var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  res.locals.user = req.isAuthenticated()? req.user : null;
  next();
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'express'});
});

require('./auth')(router);
require('./polls')(router);

module.exports = router;
