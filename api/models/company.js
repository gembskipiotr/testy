const mongoose = require('mongoose');
const User = require('./user');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  creatorId: String,
  users: [String],
  pendingUsers: [String],
}, {
  timestamps: true
});

CompanySchema.statics.findInitialData = async function (userId) {
  const company = await this.findOne({
    $or: [
      { creatorId: userId },
      { users: userId }
    ]
  });

  let responseData = {};

  if (company) {
    const fullUsers = await User.find({ _id : { $in : company.users } }).exec();
    const fullPendingUsers = await User.find({ _id : { $in : company.pendingUsers } }).exec();
    responseData = {
      _id: company._id,
      name: company.name,
      creatorId: company.creatorId,
      users: fullUsers || company.users,
      pendingUsers: fullPendingUsers || company.fullPendingUsers,
      orders: []
    };
  } else {
    const companies = await this.find({});
    responseData = { companies };
  }

  return responseData;
};

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;