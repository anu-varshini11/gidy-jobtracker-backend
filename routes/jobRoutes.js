const express = require('express');
const router = express.Router();
const { getJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authMiddleware'); // make sure you have auth middleware

router.use(authMiddleware); // protect all routes

router.get('/', getJobs);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;
