import Company from '../models/company';

export default {
  async create(req, res) {
    const company = new Company({
      owner_id: req.user._id,
      name: req.body.companyName
    });

    company.save(function(err) {
      if(err) {
        return res.send(err);
      }
      res.json({message: 'Company created!'});
    });
  },

  list(req, res) {
    Company.find(function(err, companies) {
      if(err) res.send(err);

      res.json(companies);
    });
  },

  getOne(req, res) {
    Company.findById(req.params.id, function(err, company) {
      if(err) res.send(err);

      res.json(company);
    });
  },

  update(req, res) {
    Company.findById(req.params.id, function(err, company) {
      if(err) res.send(err);

      company.name = req.body.name;
      // TODO: add other fields to update

      company.save(function(err) {
        if(err) res.send(err);

        res.json({message: 'Company updated!'});
      });
    });
  },

  remove(req, res) {
    Company.remove({
      _id: req.params.id
    }, function(err, company) {
      if(err) res.send(err);

      res.json({message: 'Successfully deleted!'});
    });
  }
};
