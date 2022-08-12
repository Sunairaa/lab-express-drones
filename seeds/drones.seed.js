// Iteration #1
// drones array with data
const drones = [
    { 
        name: "Creeper XL 500", 
        propellers: 3, 
        maxSpeed: 12 
    },
    { 
        name: "Racer 57", 
        propellers: 4, 
        maxSpeed: 20 
    },
    { 
        name: "Courier 3000i",
        propellers: 6, 
        maxSpeed: 18 
    }
  ];

const Drone = require('../models/Drone.model');
// db connection
const mongoose = require('mongoose')

mongoose
    .connect('mongodb://0.0.0.0/drone-app', {useNewUrlParser: true})
    .then(x => {
      console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
      return Drone.deleteMany();
    })
    .then(() => {
        return Drone.create(drones)
        .then(drones => {
            console.log(`Drones created successfully: ${drones}`)
        })
        .catch((err) =>
            console.log(`An error occurred while creating data into DB: ${err}`)
        );
    })
    .then(() => {
        mongoose.connection.close(() => {
              console.log(`Mongo connection disconnected`);
              process.exit(0);
          });
    })
    .catch(err => {
      console.error('Error connecting to mongo', err)
    });



  
    
    
  