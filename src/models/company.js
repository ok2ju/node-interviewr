var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String
});

module.exports = mongoose.model('Company', companySchema);
