const express = require('express');
const router = require('express').Router();
const auth = require('../middleware/auth');
const Profile = require('../models/profile');
const User = require('../models/user.model');
const { check, validationResult } = require('express-validator');

//Get current user profile 

router.route('/me').get(auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['username', 'avatar', 'phonenumber', 'Firstname', 'Lastname'
            , 'email', 'borndate']);
        if (!profile) {
            return res.status(400).json({ msg: 'there is no profile for this user ' });
        }
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error')
    }
});
//create and update profile
// @route POST api/profile
// @desc  create or update a user profile 
// @acess Private
router.route('/').post([auth, [
    check('status', 'status  is required')
        .not()
        .isEmpty(),
    check('institution', 'institution  is required')
        .not()
        .isEmpty(),

]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { status, education, location, institution } = req.body;
    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id

    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (institution) profileFields.institution = institution;

    profileFields.education = {};
    /*if (school) profileFields.education.school = school;
    if (degree) profileFields.education.degree = degree;
    if (fieldofstudy) profileFields.education.fieldofstudy = fieldofstudy;
    if (from) profileFields.education.from = from;
    if (to) profileFields.education.to = to;
    if (current) profileFields.education.current = current;
    if (description) profileFields.education.description = description;*/

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, {
                $set:
                    profileFields
            },
                { new: true });
            return res.json(profile);
        }
        // create profile
        profile = new Profile(profileFields);
        await profile.save();
        return res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
    }
})
//get all profile 
router.route('/').get(async (req, res) => {
    try {
        const profile = await Profile.find().populate('user', ['username', 'avatar', 'phonenumber', 'Firstname', 'Lastname'
            , 'email', 'borndate'])
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
    }
})
//get profile by user id 
router.route('/user/:user_id').get(async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['username', 'avatar', 'phonenumber', 'Firstname', 'Lastname'
            , 'email', 'borndate']);
        if (!profile) {
            return res.status(400).json({ msg: 'profile not found ' });
        }
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'profile not found ' });
        }
        res.status(500).send('Server error')
    }
})
//delete profile 

router.route('/').delete(auth, async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User deleted' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
    }
})
//add education
router.route('/education').put([auth, [
    check('school', 'school  is required')
        .not()
        .isEmpty(),
    check('degree', 'degree  is required')
        .not()
        .isEmpty(),
    check('fieldofstudy', 'fieldofstudy  is required')
        .not()
        .isEmpty(),
    check('from', 'from  is required')
        .not()
        .isEmpty(),]

]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const { school, degree, fieldofstudy, from, to, current, description } = req.body;
        const newEduc = {
            school, degree, fieldofstudy, from, to, current, description
        }
        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.education.unshift(newEduc);
            await profile.save();
            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('server eroor')
        }
    }
)
//delete education
router.route('/education/:edu_id').delete(auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});



module.exports = router;