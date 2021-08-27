const express = require("express");
const router = express.Router();
const { connection } = require("../db/db");
const { favoriteDish } = require("../models/favoriteDish");

router.post("/newFavorite", async(req, res) => {
    const { dishId } = req.body;
    const userId = req.user.id;
    if (!dishId) 
        return res.status(400).send({message: 'Process failed: Incomplete data'})
    connection.query(favoriteDish(userId, dishId).getOne, function(err, result) {
        if (result != "") {
            return res.status(400).send({message: "Dish already in favorites"})
        } else {
            connection.query(favoriteDish(userId, dishId).setValues, function(err, result) {
                if (err) {
                    return res.status(401).send({message: 'Process failed'})
                  }
                res.status(200).send({message: 'Dish added to favorites'})
            })
        }
    })
})

router.get("/getAll", async(req, res) => {
    const userId = req.user.id;

    connection.query(favoriteDish(userId, null).getAll, function (err, result) {
        if (err) {
            return res.status(401).send({message: 'Process failed'})
          }
        res.status(200).json({'Favorites': result})
      });
})

router.delete("/removeFavorite/:id", async(req, res) => {
    const dishId = req.params.id;
    const userId = req.user.id;

    connection.query(favoriteDish(userId, dishId).getOne, function(err, result) {
        if (result == "") {
            return res.status(400).send({message: "Dish not found in favorites"})
        } else {
            connection.query(favoriteDish(null, dishId).deleteDish, function (err, result) {
                if (err) {
                    return res.status(401).send({message: 'Process failed'})
                  }
                res.status(200).send({message: 'Dish deleted successfully'})
            });
        }
    })
})

module.exports = router