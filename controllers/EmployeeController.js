const Employee = require('../models/Employee');
const History = require('../models/History');
const {StatusCodes} = require('http-status-codes');

const getAllEmployees = async (req, res, next) => {
    const emp = await Employee.find({});
    empObject = emp.map(emp => emp.toObject());
    const his = await History.find({});
    hisObject = his.map(his => his.toObject());
    for (let i = 0; i < empObject.length; i++) {
        for (let j = 0; j < hisObject.length; j++) {
            if (empObject[i].mssv == hisObject[j].createdBy) {
                // console.log(empObject[i].name);
                empObject[i].time_In = hisObject[j].time_In.toUTCString();
                // console.log(empObject[i].time_In);
            }
        }
    }
    // console.log(empObject);
    // res.status(StatusCodes.OK).json(empObject);
    res.status(StatusCodes.OK).render('home', {empObject});
}
const getInsertForm = async (req, res) => {
    res.status(StatusCodes.OK).render('insert');
}
const getEmployee = async (req, res, next) => {
    const Employee = await Employee.findById(req.params.id);
    res.status(StatusCodes.OK).json(Employee);
}
const createEmployee = async (req, res, next) => {
    const emp = new Employee(req.body);
    await emp.save();
    res.status(StatusCodes.CREATED).redirect('/details');
    // res.status(StatusCodes.CREATED).json(emp);
}
const getUpdateForm = async (req, res) => {
    const emp = await Employee.findOne({_id: req.params.id});
    empObject = emp.toObject();
    res.status(StatusCodes.OK).render('update',{empObject});
}

const updateEmployee = async (req, res, next) => {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(StatusCodes.OK).redirect('/details');
}
const deleteEmployee = async (req, res, next) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).redirect('/home');
}

module.exports = {
    getAllEmployees,
    getEmployee,
    getInsertForm,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getUpdateForm
}
