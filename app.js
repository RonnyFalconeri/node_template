var express = require("express");
var path = require("path");
var mysql = require("mysql");
var bodyparser = require("body-parser");
var routes = require("./routes");
var app = express();

app.use(bodyparser.json());
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(routes);

// astablish connection variables of database
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_db"
});

// connect to database
mysqlConnection.connect((err) => {
    if(!err)
        console.log("DB connection successfull!");
    else
        console.log("DB connection failed. Error: "+ JSON.stringify(err, undefined, 2));
});

// start webserver --------------------
app.listen(app.get("port"), function(){
    console.log("Server started on port "+ app.get("port"));
});


// ajax event of button
app.post("/buttonclick", async(req,res) => {
    res.send({name:'Silan'});
    console.log('buttonclick');
});



//select_from("friends", "1");
count_rows("friends");

// astablish query to database
function select_from(table){
    mysqlConnection.query("SELECT * FROM "+table , function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
}

function select_from(table, id){
    mysqlConnection.query("SELECT * FROM "+table+" WHERE id = "+id, (err, result, fields) => {
        if(!err)
            console.log(result);
        else    
            console.log(err);
    });
}



function count_rows(table){
    mysqlConnection.query("SELECT * FROM "+table , function (err, result, fields) {
        if (err) throw err;
        var row_count = result.length;
        console.log(row_count);
    });
}