const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const UserRoutes = require('./Routes/UserManagementRoutes');
const taskRoutes = require('./Routes/TaskManagementRoutes');
const projectRoutes = require('./Routes/ProjectManagementRoutes')
const NotificationRoutes = require('./Routes/NotificationRoutes')
const EventRoutes = require('./Routes/EventRoutes')
const OAuth= require('./Routes/GoogleCalendarAPI')
const meetingRoutes = require('./Routes/MeetingManagementRoutes')


app.use(cors());
app.use(express.json());

// connecting to remote mongodb cluster

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://muhammadali:ali12345@cluster0.fom5vyh.mongodb.net/Web-Project').
then(()=> {

    console.log('Connected Sucessfully to MongoDB Cluster');

    app.listen(3001, ()=> {
        console.log('Server is running on port 3001');
    });
}).

catch ( (error) => {

    console.log('Error Connecting to MongoDB Cluster', error);
});

// route to check if API is working fine

app.get('/test', (req, res) => {

    res.status(200).send('API is active!');
});

app.use('/', UserRoutes);
app.use('/', taskRoutes);
app.use('/' , projectRoutes)
app.use('/', NotificationRoutes)
app.use('/', EventRoutes)
app.use('/',OAuth);
app.use('/' , meetingRoutes)




