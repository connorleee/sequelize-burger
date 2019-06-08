const express = require("express");
const burger = require("../models/burger");
router = express.Router();

// controller will res.render to template engine
// controller handlest the API calls and talks to model to retrieve stuff from DB

router.get("/", function (req, res) {
    burger.all(function (data) {
        // console.log(data)

        let hbsObject = {
            burgers: data,
            style: "index"
        }

        res.render("index", hbsObject)
    })
});

router.post("/api/burgers", function (req, res) {
    // console.log(req.body)

    burger.create(
        "burger_name", req.body.burgerName, function (result) {
            res.json({ id: result.insertId });
        }
    );
});

router.put("/api/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    burger.update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
});

router.delete("/api/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    burger.destroy(condition, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
})

module.exports = router;