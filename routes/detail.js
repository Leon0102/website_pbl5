const express = require('express');
const router = express.Router();
const {getAllEmployees,getEmployee} = require('../controllers/DetailsController');

router.route('/:id').get(getEmployee);
router.route('/').get(getAllEmployees);

module.exports = router;
