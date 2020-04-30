const mongoose = require('mongoose');

const Userchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  timestamps: true
});

Userchema.statics.findByEmail = async function (email) {
  return await this.findOne({ email });
};

Userchema.statics.findByCompany = async function (email) {
  return await this.findOne({ email });
};

Userchema.statics.authenticate = async function (email, password) {
  return await this.findOne({ email, password }, { password: false });
};

const User = mongoose.model('User', Userchema);

module.exports = User;