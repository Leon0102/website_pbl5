const express = require('express');
const router = express.Router();
const { getAllEmployees,getEmployee,getInsertForm,createEmployee,updateEmployee,deleteEmployee,getUpdateForm } = require('../controllers/EmployeeController');

router.route('/').get(getAllEmployees);
router.route('/insert').post(createEmployee);
router.route('/insert').get(getInsertForm);
router.route('/:id').delete(deleteEmployee).get(getEmployee);

module.exports = router;
