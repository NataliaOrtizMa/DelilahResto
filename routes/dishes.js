const express = require("express");
const router = express.Router();
const { connection } = require("../db/db");
const { dishes } = require("../models/dishes");
const isAdmin = require("../middlewares/admin");

router.post("/newDish", isAdmin, async(req, res) => {
  const {dishName, unitPrice, urlImage} = req.body;
  if (!dishName || !unitPrice ) 
    return res.status(400).send({message: 'Process failed: Incomplete data'})
  connection.query(dishes(dishName, unitPrice, urlImage, null).setDish, function (err, result) {
    if (err) {
      return res.status(401).send({message: 'Process failed'})
    }
    res.status(200).send({message: "Dish created successfully"})
  });
})

router.get("/getAll", async(req, res) => {
  connection.query(dishes().getAll, function (err, result) {
    if (err) {
      return res.status(401).send({message: 'Process failed'})
    }
    res.status(200).json({'dishes': result})
  });
})

router.get("/getOne/:id", async(req, res) => {
  const id = req.params.id
  connection.query(dishes(null, null, null, id).getOne, function (err, result) {
    if (err) {
      return res.status(401).send({message: 'Process failed'})
    }
    res.status(200).json({'dish': result})
  });
})

router.put("/updateDish/:id", isAdmin, async(req, res) => {
  const dishId = req.params.id;
  const {dishName, unitPrice, urlImage} = req.body;
  connection.query(dishes(dishName, unitPrice, urlImage, dishId).updateDish, function (err, result, fields) {
    if (err) {
      return res.status(401).send({message: 'Process failed'})
    }
    res.status(200).send({message: 'Dish updated successfully'})
  });
})

router.delete("/deleteDish/:id", isAdmin, async(req, res) => {
  const dishId = req.params.id;
  connection.query(dishes(null, null, null,dishId).deleteDish, function (err, result, fields) {
    if (err) {
      return res.status(401).send({message: 'Process failed'})
    }
    res.status(200).send({message: 'Dish deleted successfully'})
  });
})

module.exports = router