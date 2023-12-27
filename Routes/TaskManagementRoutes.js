const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Task = require('../models/Task');
const router = express.Router();
const { parse } = require('date-fns');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Notification = require('../models/Notifications')

const authenticateUser = async (req, res, next) => {

    console.log('In task middleware');

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




router.get('/all-tasks/:projectId', /*authenticateUser, */ async (req, res) => {
    const projectId = req.params.projectId; // Get projectId from the request parameters
  
    try {
      const tasks = await Task.find({ project: projectId }).populate('assignee', 'firstName');
  
      const response = {
        message: 'Fetched tasks for the project successfully!',
        tasks: tasks,
      };
  
      res.status(200).json(response);
    } catch (error) {
      const response = {
        message: 'Error fetching tasks',
      };
  
      console.log(error);
      res.status(500).json(response);
    }
  });

  


router.get('/all-tasks', /*authenticateUser, */async(req, res) => {

    try {

        const tasks = await Task.find().populate('assignee', 'firstName');

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

router.post('/add-task/:projectId',/* authenticateUser,*/ async(req, res) => {

    const projectId = req.params.projectId;
    console.log(req.body);

    const title = req.body.title;
    const description = req.body.description;
    const dueDate = parse(req.body.dueDate, 'yyyy-MM-dd', new Date());
    const dateCreated = new Date(Date.now());
    const priority = req.body.priority;
    const assignee = req.body.assignee;

    try {

        const newTask = new Task (

            {
                title: title,
                description: description,
                dueDate: dueDate,
                dateCreated: dateCreated,
                priority: priority,
                assignee: assignee,
                project:projectId
            }
        );

        await newTask.save();
        
        const IdCount = await Notification.countDocuments();
        const newNotificationId = IdCount + 1;
        const sentence=description.split('.')[0];
        const newNotification = new Notification({
                notificationId:newNotificationId,
                title:title,
                description:sentence,
                createdAt:dateCreated
        });
        await newNotification.save();

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

// edit task progress

router.patch('/edit-progress/:taskId', async (req, res) => {

    const taskId = req.params.taskId;
    const progress = req.body.progress;


    try {

        const task = await Task.findById(taskId);

        if(task) {

            task.progress = progress;
            await task.save();

            const response = {
                message: 'Progress Updated Successfully!',
            }

            res.status(200).json(response);
        }

        else {

            const response = {

                message: 'Task Not Found!',
            }

            res.status(404).json(response);

        }
    }

    catch (error) {

        console.log(error);

        const response = {

            message: 'Internal Server Error, check server logs!',
        }

        res.status(500).json(response);
    }

});

// edit complete status

router.patch('/edit-status/:taskId', async (req, res) => {

    const taskId = req.params.taskId;
    console.log(taskId);

    try {

        const task = await Task.findById(taskId);

        if(task) {

            task.completed = true;
            task.progress = 100;
            
            await task.save();

            const response = {
                message: 'Status Updated Successfully!',
            }

            res.status(200).json(response);
        }

        else {

            const response = {

                message: 'Task Not Found!',
            }

            res.status(404).json(response);

        }
    }

    catch (error) {

        console.log(error);

        const response = {

            message: 'Internal Server Error update status, check server logs!',
        }

        res.status(500).json(response);
    }

});

// add comment route

router.post('/add-comment/:taskId', /*authenticateUser,*/ async (req, res) => {

    const taskId = req.params.taskId;
    const comment = req.body.comment;
    const userId = req.body.userId;

    console.log('User Id in Add Comment = ', userId);
    console.log('Task Id in Add Comment = ', taskId);
    console.log('Comment = ', comment);

    try {

        const task = await Task.findById(taskId);

        if (task) {

            task.comments.push({

                text: comment,
                user: userId,

            });

            await task.save();

            const response = {
                message: 'Comment Added Successfully!',
            }

            res.status(200).json(response);
        }

        else {

            const response = {

                message: 'Task Not Found!',
            }

            res.status(404).json(response);

        }
    }

    catch (error) {

        console.log(error);

        const response = {

            message: 'Internal Server Error while adding comment, check server logs!',
        }

        res.status(500).json(response);
    }

});

// get specific task comments.

router.get('/get-comment/:taskId', /*authenticateUser,*/ async (req, res) => {

    const taskId = req.params.taskId;

    console.log('Task Id in get comment route = ', taskId);

    try {

        const task = await Task.findById(taskId);

        if (task) {

            const response = {

                message: 'Fetched Comments Successfully!',
                comments: task.comments,
            }

            res.status(200).json(response);
        }

        else {

            const response = {

                message: 'Task Not Found!',
            }

            res.status(404).json(response);

        }
    }

    catch (error) {

        console.log(error);

        const response = {

            message: 'Internal Server Error while fetching comment, check server logs!',
        }

        res.status(500).json(response);
    }
});

//get priority tasks
router.get('/prior-tasks', async (req, res) => {
    try {
      const tasks = await Task.find()
        .sort({ priority: -1 })
        .exec();
  
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports = router;