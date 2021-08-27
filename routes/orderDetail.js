const express = require("express");
const router = express.Router();
const { connection } = require("../db/db");
const { orderDetail } = require("../models/orderDetail");

router.post("/newDetail", async(req, res) => {
    const {orderId, dishId} = req.body;
    if (!orderId || !dishId) 
      return res.status(400).send({message: 'Process failed: Incomplete data'})
    connection.query(orderDetail(orderId, dishId, null).setDetail, function (err, result) {
        if (err) {
            return res.status(401).send({message: 'Process failed'})
        }
      res.status(200).send({message: 'Dish added to order successfully'})
    });
})

router.get("/getAll/:id", async(req, res) => {
    const orderId = req.params.id
    connection.query(orderDetail(orderId, null, null).getAll, function (err, result) {
        console.log(result);
      if (err) throw err
      res.status(200).json({'orders': result})
    });
})

router.delete("/removeDetail/:id", async(req, res) => {
    const detailId = req.params.id;

    connection.query(orderDetail(null, null, detailId).getOne, function(err, result) {
        if (result == "") {
            return res.status(400).send({message: "Order not found"})
        } else {
            connection.query(orderDetail(null, null, detailId).deleteDetail, function (err, result) {
                if (err) {
                    return res.status(401).send({message: 'Process failed'})
                  }
                res.status(200).send({message: 'Dish removed from order successfully'})
            });
        }
    })
})

module.exports = router