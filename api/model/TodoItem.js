const mongoose = require('mongoose');
const TodoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true }
});

module.exports = mongoose.model('Item', TodoSchema);
