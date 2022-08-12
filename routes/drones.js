const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model');

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
        .then((DroneFromDB) => {
            res.render('drones/list', {title : 'Drones', DroneFromDB });
        })
        .catch((error) => `Error while fetching all drones: ${error}`);
});

router.get('/drones/create', (req, res, next) => {
  res.render('drones/create-form', {title: 'Create new drone'})
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;
  Drone.create({ name, propellers, maxSpeed })
    .then(() => res.redirect("/drones"))
    .catch((error) => `Error while creating drone: ${error}`);
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  Drone.findById(id)
  .then((DroneToEdit) => {
    res.render("drones/update-form", DroneToEdit);
  })
  .catch((error) => `Error while getting a single drone for edit: ${error}`);
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;
  Drone.findByIdAndUpdate(id , { name, propellers, maxSpeed} , { new: true})
    .then(() => res.redirect("/drones"))
    .catch((error) => `Error while updating drone: ${error}`);

});

router.post('/drones/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Drone.findByIdAndDelete(id)
  .then(() => res.redirect("/drones"))
    .catch((error) => `Error while deleting drone: ${error}`);
});

module.exports = router;
