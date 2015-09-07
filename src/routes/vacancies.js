import Vacancy from '../models/vacancy';

export default {
  create(req, res) {
    // TODO: Add vacancy to company whitch have user
  },
  async list(req, res) {
    try {
      const list = await Vacancy.find();
      res.json(list);
    } catch(err) {
      res.send(err);
    }
  },
  async getOne(req, res) {
    try {
      const vacancy = await Vacancy.findById(req.params.id);
      res.json(vacancy);
    } catch(err) {
      res.send(err);
    }
  },
  async update(req, res) {
    try {
      const vacancy = await Vacancy.findById(req.params.id);
      vacancy.title = req.body.title;
      vacancy.save();
      res.json({message: 'Vacancy updated!'});
    } catch(err) {
      res.send(err);
    }
  },
  remove(req, res) {
    Vacancy.remove({
      _id: req.params.id
    }, function(err, vacancy) {
      if(err) res.send(err);

      res.json({message: 'Successfully deleted!'});
    });
  }
};
