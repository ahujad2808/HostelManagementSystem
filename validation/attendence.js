const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function AttendenceValidation(data) {
    const errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.room = !isEmpty(data.room) ? data.room : "";

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }
    if (!Validator.isLength(data.room)) {
        errors.room = "Room number is required"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};