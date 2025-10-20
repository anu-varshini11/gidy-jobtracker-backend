const Job = require('../models/Job');
const User = require('../models/User');

// GET all jobs for logged-in user
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// CREATE job
exports.createJob = async (req, res) => {
  try {
    const { companyName, jobTitle, applicationDate, status } = req.body;

    // ✅ Validation
    if (!companyName || companyName.trim().length < 3)
      return res.status(400).json({ success: false, message: 'Company name must be at least 3 characters.' });

    if (!jobTitle || !jobTitle.trim())
      return res.status(400).json({ success: false, message: 'Job title is required.' });

    if (!applicationDate)
      return res.status(400).json({ success: false, message: 'Application date is required.' });

    const date = new Date(applicationDate);
    if (isNaN(date.getTime()))
      return res.status(400).json({ success: false, message: 'Invalid date format.' });

    if (date > new Date())
      return res.status(400).json({ success: false, message: 'Application date cannot be in the future.' });

    const validStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];
    if (!validStatuses.includes(status))
      return res.status(400).json({ success: false, message: 'Invalid job status.' });

    const job = new Job({
      companyName: companyName.trim(),
      jobTitle: jobTitle.trim(),
      applicationDate: date,
      status,
      userId: req.user._id
    });

    await job.save();
    res.status(201).json({ success: true, job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// UPDATE job
exports.updateJob = async (req, res) => {
  try {
    const { companyName, jobTitle, applicationDate, status } = req.body;

    // ✅ Validation (same as create)
    if (!companyName || companyName.trim().length < 3)
      return res.status(400).json({ success: false, message: 'Company name must be at least 3 characters.' });

    if (!jobTitle || !jobTitle.trim())
      return res.status(400).json({ success: false, message: 'Job title is required.' });

    if (!applicationDate)
      return res.status(400).json({ success: false, message: 'Application date is required.' });

    const date = new Date(applicationDate);
    if (isNaN(date.getTime()))
      return res.status(400).json({ success: false, message: 'Invalid date format.' });

    if (date > new Date())
      return res.status(400).json({ success: false, message: 'Application date cannot be in the future.' });

    const validStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];
    if (!validStatuses.includes(status))
      return res.status(400).json({ success: false, message: 'Invalid job status.' });

    const job = await Job.findOne({ _id: req.params.id, userId: req.user._id });
    if (!job)
      return res.status(404).json({ success: false, message: 'Job not found.' });

    job.companyName = companyName.trim();
    job.jobTitle = jobTitle.trim();
    job.applicationDate = date;
    job.status = status;

    await job.save();
    res.json({ success: true, job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!job)
      return res.status(404).json({ success: false, message: 'Job not found.' });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
