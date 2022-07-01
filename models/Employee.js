const mongoose = require('mongoose');

const EmployeeSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',   
            ],
    },
    image: { type: String, default: '' },
    description: { type: String, default: '', maxLength: 600 },
    mssv: {
        type: String,
        default: null},
    time_In: { type: Date, default: null },
    time_Out: { type: Date, default: null },
    birthday: { type: Date, default: Date.now() },
    phoneNumber: { type: String, default: '', maxlength: 10 },
},
);

module.exports = mongoose.model('Employee', EmployeeSchema);