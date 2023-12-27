const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Project = require('../models/Project');
const authenticateToken = require('../middleware/authentication'); 
const Notification = require('../models/Notifications')

//router.use(authenticateToken);

router.post('/project', async (req, res) => {

    console.log(req.body);
 
  const { projectName, description, projectCategory, dueDate, assignTo, visibility } = req.body;
  const dateCreated = new Date(Date.now());
  try {

    const newProject = new Project({
      projectName: projectName,
      description:description,
      projectCategory: projectCategory,
      dueDate:dueDate,
      dateCreated:dateCreated,
      assignTo:assignTo,
      visibility:visibility,
    
    });
    await newProject.save();

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
      message: 'New project Added Successfully',
  };

  res.status(200).json(response);

  } 
  catch (err) 
  {

         res.status(400).json({ message: err.message });

  }

});

router.get('/projects', async (req, res) => {

  try 
  {
    const projects = await Project.find({ owner: req.userId }); // Fetch projects owned by the logged-in user
    res.json(projects);
  } 
  catch (err) 
  {
    res.status(500).json({ message: err.message });
  }


});




router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, owner: req.userId }); // Fetch project owned by the logged-in user
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.patch('/update-project/:id', async (req, res) =>
 {
    const projectId = req.params.id;
    const updates = req.body; 

    console.log('Received project ID:', projectId);

    
    try 
    {
      const project = await Project.findById(projectId);

      console.log(project);
      if (!project) {
        return res.status(404).json({ message: 'Project not found or unauthorized' });
      }
  
      Object.keys(updates).forEach((key) => {
        project[key] = updates[key];
      });
  
      await project.save();
      res.json(project);
    } catch (err) {

      console.error('Error updating project:', err);
      res.status(500).json({ message: err.message });
    }


  });
  


  
  router.delete('/delete-project/:id', async (req, res) => {


    const projectId = req.params.id;
    console.log('Received project ID:', projectId);
  
    try {
      const project = await Project.findById(projectId);
      console.log(project);
      if (!project) {
        console.log("Not found");
        return res.status(404).json({ message: 'Project not found or unauthorized' });
      }
  
       const isValidObjectId = mongoose.Types.ObjectId.isValid(projectId);
       console.log('Is valid ObjectId:', isValidObjectId);

       const deletedProject = await Project.findByIdAndDelete(projectId);



  
      console.log("Deleted:", deletedProject);
      res.json({ message: 'Project deleted' });
    } catch (err) {
      console.error('Error deleting project:', err);
      res.status(500).json({ message: err.message });
    }
  });
  


module.exports = router;
