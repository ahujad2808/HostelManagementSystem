const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AttendenceSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    room: {
        type: Number,
        required: true,
        unique: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
});

module.exports = Attendence = mongoose.model("Attendence", AttendenceSchema);