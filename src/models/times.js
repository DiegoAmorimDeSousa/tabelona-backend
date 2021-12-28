const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  state: String,
  seriesType: String,
  country: String,
  logo: String,
  titles: [],
  initials: String,
  surname: String,
  switching: [],
  lastPosition: String,
  classification: []
}, {
  timestamps: true
});

const User = mongoose.model('times-teste', UserSchema, 'times-teste');

module.exports = User;
