var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Company = require('../models/company');
var Vacancy = require('./models/vacancy');

router.route('/vacancies')
  .post(function(req, res) {
    // TODO: Add vacancy to company whitch have user
  })
  .get(function(req, res) {
    Vacancy.find(function(err, vacancies) {
      if(err) res.send(err);

      res.json(vacancies);
    });
  });

router.route('/vacancies/:id')
  .get(function(req, res) {
    Vacancy.findById(req.params.id, function(err, vacancy) {
      if(err) res.send(err);

      res.json(vacancy);
    });
  })
  .put(function(req, res) {
    Vacancy.findById(req.params.id, function(err, vacancy) {
      if(err) res.send(err);

      vacancy.title = req.body.title;
      // TODO: add other fields to update

      vacancy.save(function(err) {
        if(err) res.send(err);

        res.json({message: 'Vacancy updated!'});
      });
    });
  })
  .delete(function(req, res) {
    Vacancy.remove({
      _id: req.params.id
    }, function(err, vacancy) {
      if(err) res.send(err);

      res.json({message: 'Successfully deleted!'});
    });
  });

module.exports = router;
