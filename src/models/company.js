import mongoose from '../lib/mongoose.js';
const Schema = mongoose.Schema;

const companySchema = new Schema({
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String
});

module.exports = mongoose.model('Company', companySchema);
