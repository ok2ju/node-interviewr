import bcrypt from 'bcryptjs';
import mongoose from '../lib/mongoose.js';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  password: String,
  name: String,
  surname: String,
  country: String,
  skills: [{ text: String }],
  companies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Company'}]
});

userSchema.pre('save', function(next) {
  const self = this;
  if(!self.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(salfError, salt) {
    if(salfError) {
      return next(salfError);
    }
    bcrypt.hash(self.password, salt, function(hashError, hash) {
      if(hashError) {
        return next(hashError);
      }
      self.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

export default mongoose.model('User', userSchema);
