const mongoose = require('mongoose');
const User = require('./user');

const NotificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  userId: String,
  creatorId: String,
  read: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

NotificationSchema.statics.sendNotification = async function (creatorId, userId, message) {
  try {
    const creator = await User.findById(creatorId);
    const extendedMessage = `${creator.name} ${creator.lastname} ${message}`;
    return await new this({ creatorId, userId, message: extendedMessage }).save();
  } catch (error) {
    throw new Error(error);
  }
};

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;