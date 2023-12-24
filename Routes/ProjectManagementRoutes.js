const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authenticateToken = require('../middleware/authentication'); 


router.use(authenticateToken);



 
router.post('/project', async (req, res) => {

    console.log(req.body);
 
  const { projectName, description, projectCategory, dueDate, assignTo, visibility } = req.body;

  try {

    const newProject = new Project({
      projectName,
      description,
      projectCategory,
      dueDate,
      assignTo,
      visibility,
      owner: req.userId // Assign the user ID from the authenticated request

    });


    const savedProject = await newProject.save();
    res.status(201).json(savedProject);

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




router.get('/projects/:id', authenticateToken, async (req, res) => {
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



router.patch('/projects/:id', async (req, res) =>
 {
    const projectId = req.params.id;
    const updates = req.body; 
  
    try 
    {
      const project = await Project.findOne({ _id: projectId, owner: req.userId });
      if (!project) {
        return res.status(404).json({ message: 'Project not found or unauthorized' });
      }
  
      Object.keys(updates).forEach((key) => {
        project[key] = updates[key];
      });
  
      await project.save();
      res.json(project);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }


  });
  


  
  router.delete('/projects/:id', async (req, res) => 
  {

    const projectId = req.params.id;
  
    try {
      const project = await Project.findOne({ _id: projectId, owner: req.userId });
      if (!project) {
        return res.status(404).json({ message: 'Project not found or unauthorized' });
      }
  
      await project.remove();
      res.json({ message: 'Project deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }


  });
  


module.exports = router;
