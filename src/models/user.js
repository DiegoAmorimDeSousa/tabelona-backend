const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  companyName: String,
  password: String,
  accessToken: String,
  userIdStore: String,
  refreshToken_rd: String,
  botPublish: String,
  origin_initial: String,
  integrations: [],
  code_rd: String,
  boteria: {
    userIdBoteria: String,
    dashboardToken: String,
    companyId: String,
    organizationId: String,
  },
  closeInitialGif: Boolean
}, {
  timestamps: true
});

const User = mongoose.model('user', UserSchema, 'user');

module.exports = User;
