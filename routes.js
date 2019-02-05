var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
    console.log("called: index.html");
    res.render("index");
});

module.exports = router;