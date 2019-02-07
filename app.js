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
/*
app.post("/buttonclick", async(req,res) => {
    res.send(
        {   
            id: "1234",
            name: "Doe",
            vorname: "John",
            geburtstag: "66.66.6666"
        });
    console.log("button was pressed.");
});
*/

/*
function myCallback(err, data){
    if(err) throw err;
    //console.log(data);
    return data;
}
*/


// send friend on request
app.get("/friends/:id", (req, res) =>{
    mysqlConnection.query("SELECT * FROM friends WHERE id=?", [req.params.id], (err, rows, fields) =>{
        if (err) throw err;
        res.send(rows);
    });
});

app.delete("/friends/delete/:id", (req, res) =>{
    mysqlConnection.query("DELETE FROM friends WHERE id=?", [req.params.id], (err, rows, fields) =>{
        if (err) throw err;
        res.send(rows);
    });
});

// not finished yet
app.post("/friends/save", (req, res) =>{
    post_body = req.body.name;
    console.log(post_body);
    mysqlConnection.query("UPDATE friends SET vorname = ?, name = ?, geburtstag = ? WHERE id = ?", [req.params.id], (err, rows, fields) =>{
        if (err) throw err;
        res.send(rows);
    });
});

app.get("/friends", (req, res) =>{
    mysqlConnection.query("SELECT * FROM friends", (err, rows, fields) =>{
        if (err) throw err;
        res.send(rows);
    });
});


function select_from(table){
    mysqlConnection.query("SELECT * FROM "+table , function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
}

function select_from(table, id, callback){
    mysqlConnection.query("SELECT * FROM "+table+" WHERE id = "+id, (err, result, fields) => {
        if (err) throw err;
        callback(err, result);
    });
}
