const History = require('../models/History');
const Employee = require('../models/Employee');
const {StatusCodes} = require('http-status-codes');

const getAll = async (req, res, next) => {
    const his = await History.find({}).sort({time_In: -1});
    const hisObject = his.map(his => his.toObject());
    for (let i = 0; i < hisObject.length; i++) {
        let employee = await Employee.findOne({mssv: hisObject[i].createdBy});
        hisObject[i].name = employee.name;
        hisObject[i].time_In = hisObject[i].time_In.toUTCString();
        // console.log(hisObject[i].name);
    }
    // console.log(hisEmployee);
    // res.status(StatusCodes.OK).json({hisObject});
    res.status(StatusCodes.OK).render('history/history', {hisObject});
}

const historyOfTimes = async (req, res, next) => {
    const timeIn = req.body.timeIn;
    const timeOut = req.body.timeOut;
    const his = await History.find({time_In: {$gte: timeIn, $lte: timeOut}});
    const hisObject = his.map(his => his.toObject());
    for (let i = 0; i < hisObject.length; i++) {
        let employee = await Employee.findOne({mssv: hisObject[i].createdBy});
        hisObject[i].name = employee.name;
        hisObject[i].time_In = hisObject[i].time_In.toUTCString();
        // console.log(hisObject[i].name);
    }
    res.status(StatusCodes.OK).render('history/history', {hisObject});
}

module.exports = {
    getAll,
    historyOfTimes
}