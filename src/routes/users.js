import jwt from 'jsonwebtoken';
import _ from 'lodash';
import User from '../models/user';

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), 'secret', {expiresInMinutes: 60 * 5});
}

export default {
  heartbeat(req, res) {
    res.status(200).send('Hello from interviewr');
  },
  async login(req, res) {
    try {
      const user = await User.findOne({username: req.body.username});
      res.status(201).send({
        id_token: createToken(user)
      });
    } catch(err) {
      res.send(err);
    }
  },

  async create(req, res) {
    try {
      let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        country: req.body.country
      });

      user = await user.save();
      res.status(201).send({
        'id_token': createToken(user)
      });
    } catch(err) {
      res.send(err);
    }
  },

  async list(req, res) {
    try {
      const list = await User.find();
      res.json(list);
    } catch(err) {
      res.send(err);
    }
  },

  async get(req, res) {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch(err) {
      res.send(err);
    }
  },

  async update(req, res) {
    try {
      let user = await User.findById(req.params.id);
      user.name = req.body.name;
      user.surname = req.body.surname;
      user.email = req.body.email;
      user.username = req.body.username;
      user.country = req.body.country;
      user.skills = req.body.skills;
      user = await user.save();
      res.json({message: 'User updated!'});
    } catch(err) {
      res.send(err);
    }
  },

  remove(res, req) {
    User.remove({
      _id: req.params.id
    }, (err) => {
      if(err) res.send(err);

      res.json({message: 'Successfully deleted!'});
    });
  }
};
