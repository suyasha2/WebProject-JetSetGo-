const mongoose = require('mongoose');

const AdminServiceSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  name: { type: String, required: true },  
  phone: { type: String, required: true },
  availability: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('AdminService', AdminServiceSchema);