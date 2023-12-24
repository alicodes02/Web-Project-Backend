const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Task = require('../models/Task');
const router = express.Router();
const { parse } = require('date-fns');

const authenticateUser = async (req, res, next) => {

    try {

        const token = req.header('Authorization');

        if (!token) {

            return res.status(401).send({ error: 'Token is not correct' });
        }

        const decoded = jwt.verify(token.replace('Bearer ', ''), 'shhhh');

        const user = await User.findOne({ email: decoded.email });

        if (!user) {

            return res.status(401).send({ error: 'User not authenticated' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error('Error in authentication:', error);
        res.status(401).send({ error: 'Error during authentication. Check the server logs for details.' });
    }

};

router.get('/all-tasks', authenticateUser, async(req, res) => {

    try {

        const tasks = await Task.find();

        const response = {

            message: "fetched all tasks successfully!",
            tasks: tasks
        }

        res.status(200).json(response);
        
    }

    catch(error) {

        const response = {

            message: "Error fetching tasks",
        }

        console.log(error);
        res.status(500).json(response);
    }
});

//add task 

router.post('/add-task', authenticateUser, async(req, res) => {

    console.log(req.body);

    const title = req.body.title;
    const description = req.body.description;
    const dueDate = parse(req.body.dueDate, 'dd/MM/yyyy', new Date());
    const priority = req.body.priority;
    const assignee = req.body.assignee;

    try {

        const newTask = new Task (

            {
                title: title,
                description: description,
                dueDate: dueDate,
                priority: priority,
                assignee: assignee
            }
        );

        await newTask.save();

        const response = {

            message: 'New Task Added Successfully',
        };

        res.status(200).json(response);
    }

    catch (error) {

        console.log(error);

        const response = {

            message: 'Error Adding Task',
        };

        res.status(500).json(response);
    }
});

module.exports = router;