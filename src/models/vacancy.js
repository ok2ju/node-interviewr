var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vacancySchema = new Schema({
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  title: String
});

module.exports = mongoose.model('Vacancy', vacancySchema);
