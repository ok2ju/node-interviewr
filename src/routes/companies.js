var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Company = require('../models/company');

router.route('/companies')
  .post(function(req, res) {

    console.log(req.user);

    var company = new Company({
      owner_id: req.user._id,
      name: req.body.companyName
    });

    company.save(function(err) {
      if (err) res.send(err);

      res.json({message: 'Company created!'});
    });
  })
  .get(function(req, res) {
    Company.find(function(err, companies) {
      if(err) res.send(err);

      res.json(companies);
    });
  });

router.route('/companies/:id')
  .get(function(req, res) {
    Company.findById(req.params.id, function(err, company) {
      if(err) res.send(err);

      res.json(company);
    });
  })
  .put(function(req, res) {
    Company.findById(req.params.id, function(err, company) {
      if(err) res.send(err);

      company.name = req.body.name;
      // TODO: add other fields to update

      company.save(function(err) {
        if(err) res.send(err);

        res.json({message: 'Company updated!'});
      });
    });
  })
  .delete(function(req, res) {
    Company.remove({
      _id: req.params.id
    }, function(err, company) {
      if(err) res.send(err);

      res.json({message: 'Successfully deleted!'});
    });
  });

module.exports = router;