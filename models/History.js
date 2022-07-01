const mongoose = require('mongoose');

const HistorySchema =  new mongoose.Schema({
    time_In: {
        type: Date,
    },
    time_Out: {
        type: Date,
    },
    createdBy: {
        type: String,
    },
});

module.exports = mongoose.model('History', HistorySchema);

