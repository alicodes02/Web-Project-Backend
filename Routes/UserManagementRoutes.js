const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req,res) => {

    console.log(req.body);

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    const isExistingUser = await User.findOne({email});

    if(isExistingUser) {
        
        res.status(500).send('User Already Exist with this email!');
    }

    else {

        const newUser = new User (

            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                role: role
            }
        );

        await newUser.save();

        const token = jwt.sign({email}, 'shhhh');

        const response = {

            message: 'Sign Up Sucessfull',
            token: token,
            userId: newUser._id,
            userfirstName: newUser.firstName,
            userEmail: newUser.email,

        };

        res.status(200).json(response);
    }
});

router.post('/signin', async (req,res) => {

    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({email,password});

    if(user) {

        const token = jwt.sign({email}, 'shhhh');

        const response = {

            message: 'Sign In Sucessfull',
            userId: user._id,
            userfirstName: user.firstName,
            userEmail: user.email,
            token: token,
        };

        res.status(200).json(response);
    }

    else {

        const response = {

            message: 'Invalid Email or Password',
        };

        res.status(404).json(response);

    }
});

module.exports = router;

