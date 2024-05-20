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
require('dotenv').config();


app.use(cors());
app.use(express.json());

// connecting to remote mongodb cluster

const PORT = process.env.PORT || 3001;
const mongodb_url = process.env.MONGODB_URL;

mongoose.connect(mongodb_url).
then(()=> {

    console.log('Connected Sucessfully to MongoDB Cluster');

    app.listen(PORT, ()=> {
        console.log(`Server is running on port ${PORT}`);
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




