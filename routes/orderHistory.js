const express = require("express");
const router = express.Router();
const { connection } = require("../db/db");
const { orderHistory } = require("../models/orderHistory");
const isAdmin = require("../middlewares/admin");

router.post("/newOrder", async(req, res) => {
  const userId = req.user.id;
  if (!userId) 
    return res.status(400).send({message: 'Process failed: Incomplete data'})
  connection.query(orderHistory(userId, null, null, null).setHistory, function (err, result) {
    if (err) {
      return res.status(401).send({message: 'Process failed'})
    }
    res.status(200).send({message: 'Order created successfully'})
  });
})

router.get("/getAll", isAdmin, async(req, res) => {
  connection.query(orderHistory().getAll, function (err, result) {
    if (err) {
      return res.status(401).send({message: 'Process failed'})
    }
    res.status(200).json({'orders': result})
  });
})

router.get("/getOne/:id", async(req, res) => {
  const id = req.params.id;
  connection.query(orderHistory(null, null, null, id).getOne, function (err, result) {
    if (err) {
      return res.status(401).send({message: 'Process failed'})
    }
    res.status(200).json({'order': result})
  });
})

router.put("/updateOrder/:id", async(req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const {statusId, paymentId} = req.body;
  connection.query(orderHistory(userId, statusId, paymentId, id).updateHistory, function (err, result) {
    if (err) {
      return res.status(401).send({message: 'Process failed'})
    }
    res.status(200).send({message: 'Order updated successfully'})
  });
})

module.exports = router