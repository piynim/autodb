var mongoose = require('mongoose')
var Schema = mongoose.Schema;

//employee Schema
var AttendenceDataSchema = new Schema({
    employeeID: { type: String, required: true },
    password: { type: String, required: false },
    checkInTime: { type: Date, required: false },
    checkOutTime: { type: Date, required: false },
    date: { type: Date, required: false },
    totalWorkingHours: {type: String, required: false}
}, { collection: 'AttendenceData' });

module.exports = mongoose.model('attendenceData', AttendenceDataSchema)