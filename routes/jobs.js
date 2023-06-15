const express = require('express');
const router = express();

const {getAllJobs,getJob,createJob,upadateJob,deleteJob} = require('../controllers/jobs');

router.get('/',getAllJobs);
router.post('/',createJob);
router.get('/:id',getJob);
router.patch('/:id',upadateJob);
router.delete('/:id',deleteJob);

module.exports = router;
