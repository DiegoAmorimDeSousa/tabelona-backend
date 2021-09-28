const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  companyName: String,
  password: String,
  botPublish: String,
  originInitial: String,
  integrations: [],
}, {
  timestamps: true
});

const User = mongoose.model('user', UserSchema, 'user');

module.exports = User;
