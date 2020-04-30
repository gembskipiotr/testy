const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyId: String,
  creatorId: String,
  users: [String],
  tasks: [String],
}, {
  timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;