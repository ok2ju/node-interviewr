var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.route('/users')
  .post(function(req, res) {
    var user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      surname: req.body.surname,
      country: req.body.country
    });

    user.save(function(err) {
      if(err) res.send(err);

      res.json({message: 'User created!'});
    });
  })
  .get(function(req, res) {
    User.find(function(err, users) {
      if(err) res.send(err);

      res.json(users);
    });
  });

router.route('/users/:id')
  .get(function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if(err) res.send(err);

      res.json(user);
    });
  })
  .put(function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if(err) res.send(err);

      user.name = req.body.name;
      // TODO: add other fields to update

      user.save(function(err) {
        if(err) res.send(err);

        res.json({message: 'User updated!'});
      });
    });
  })
  .delete(function(res, req) {
    User.remove({
      _id: req.params.id
    }, function(err, user) {
      if(err) res.send(err);

      res.json({message: 'Successfully deleted!'});
    });
  });

module.exports = router;
