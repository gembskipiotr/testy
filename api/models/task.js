const mongoose = require('mongoose');
const User = require('./user');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: String,
  endTime: String,
  creatorId: String,
  orderId: String,
  userId: String,
  description: String,
}, {
  timestamps: true
});

TaskSchema.statics.getTaskWithDetails = async function (taskId) {
  try {
    const task = await this.findOne({ _id: taskId });
  
    let responseData = {}
    const user = await User.findById(task.userId);
  
    responseData = {
      _id: task._id,
      name: task.name,
      status: task.status,
      endTime: task.endTime,
      orderId: task.orderId,
      userId: task.userId,
      description: task.description,
      userName: `${user.name} ${user.lastname}`
    };
  
    return responseData;
  } catch (error) {
    throw new Error(error);
  }
};

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;