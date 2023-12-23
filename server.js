const express = require('express');
const app = express();
const mongoose = require('mongoose');

// connecting to remote mongodb cluster

mongoose.connect('mongodb+srv://muhammadali:ali12345@cluster0.fom5vyh.mongodb.net/').

then(()=> {

    console.log('Connected Sucessfully to MongoDB Cluster');

    app.listen(3001, ()=> {
        console.log('Server is running on port 3001');
    });
}).

catch ( (error) => {

    console.log('Error Connecting to MongoDB Cluster', error);
});



