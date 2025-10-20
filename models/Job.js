const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    applicationDate: { type: Date, required: true },
    status: { type: String, enum: ['Applied', 'Interview', 'Offer', 'Rejected'], default: 'Applied' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
