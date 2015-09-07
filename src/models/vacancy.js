import mongoose from '../lib/mongoose';

const Schema = mongoose.Schema;

const vacancySchema = new Schema({
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  title: String
});

module.exports = mongoose.model('Vacancy', vacancySchema);
