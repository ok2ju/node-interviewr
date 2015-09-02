var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var config = require('../config');

var User = require('../models/user');

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), 'secret', { expiresInMinutes: 60*5 });
}

router.route('/login')
  .post(function(req, res) {
    User.findOne({ username: req.body.username }, function(err, user) {
      if (err) res.send(err);

      if (!user) {
        return res.status(401).send("The username or password don't match");
      }

      if (!user.password === req.body.password) {
        return res.status(401).send("The username or password don't match");
      }

      res.status(201).send({
        id_token: createToken(user)
      });

    });
  });

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

      res.status(201).send({
        id_token: createToken(user)
      });
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
      user.surname = req.body.surname;
      user.email = req.body.email;
      user.username = req.body.username;
      user.country = req.body.country;

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
