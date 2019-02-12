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




// return data of friend
app.get("/friends/:id", (req, res) =>{
    mysqlConnection.query("SELECT * FROM friends WHERE id=?", [req.params.id], (err, rows, fields) =>{
        if (err) throw err;
        res.send(rows);
    });
});

// delete friend
app.post("/friends/delete/:id", (req, res) =>{
    mysqlConnection.query("DELETE FROM friends WHERE id = ?", [req.params.id], (err, rows, fields) =>{
        if (err) throw err;
        res.send(rows);
    });
});

// update friend
app.post("/friends/save", (req, res) =>{
    mysqlConnection.query("UPDATE friends SET vorname = ?, name = ?, geburtstag = ? WHERE id = ?", [req.body.Stuff.name, req.body.Stuff.surname, req.body.Stuff.birthday, req.body.Stuff.id], (err, rows, fields) =>{
        if (err) throw err;
    });
});

// return all friends
app.get("/friends", (req, res) =>{
    mysqlConnection.query("SELECT * FROM friends", (err, rows, fields) =>{
        if (err) throw err;
        res.send(rows);
    });
});
