const router = require('express').Router();
const passport = require('passport')

// Attendence model
const Attendence = require("../../models/Attendence")

// Add validations
const AttendenceValidation = require('../../validation/attendence.js')

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Attendence.find()
        .then(data => res.json(data))
        .catch(err => res.json({...err, message: 'Failed to fetch Attendence details' }))
})

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = AttendenceValidation(req.body)
    if (!isValid) return res.status(400).json(errors)

    const newAttendence = new Attendence(req.body)

    newAttendence.save()
        .then(data => res.json({ success: true, message: 'Attendence has been saved.' }))
        .catch(err => res.json({...err, message: 'Failed to save Attendence' }))
})

router.delete('/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id } = req.params

    Attendence.findByIdAndDelete({ _id })
        .then(status => res.json({ success: true, message: 'Attendence has been deleted.' }))
        .catch(err => res.json({...err, message: 'Failed to delete Attendence' }))

})

router.put('/availability/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.params;
    const { isAvailable } = req.body;
    Attendence.findByIdAndUpdate(id, { $set: { isAvailable } })
        .then(data => res.status(200).json({ message: 'Attendence availability has been updated.', success: true }))
        .catch(err => res.json({...err, message: 'Failed to update Attendence availability.' }))
})

module.exports = router;