const express = require('express');
const router = express.Router();
const { getAllEmployees,getEmployee,getInsertForm,createEmployee,updateEmployee,deleteEmployee,getUpdateForm } = require('../controllers/EmployeeController');

router.route('/:id').get(getUpdateForm).patch(updateEmployee);

module.exports = router;
