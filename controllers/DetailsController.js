const Employee = require('../models/Employee');
const {StatusCodes} = require('http-status-codes');

const getAllEmployees = async (req, res, next) => {
    const emp = await Employee.find({});
    empObject = emp.map(emp => emp.toObject());
    res.status(StatusCodes.OK).render('details/details', {empObject});
}

const getEmployee = async (req, res, next) => {
    const emp = await Employee.findOne({_id: req.params.id});
    empObject = emp.toObject();
    res.status(StatusCodes.OK).render('details/emp-info', {empObject});
}

module.exports = {
    getAllEmployees,
    getEmployee
}