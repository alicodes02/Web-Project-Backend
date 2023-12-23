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
        };

        res.status(200).json(response);
    }
});

module.exports = router;

