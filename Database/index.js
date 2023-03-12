const express = require('express')
const app = express()
const port = 3300


const cors = require("cors");

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "website",
    password: "websiteuser123$"
});

connection.connect()

app.get('/updateamount/:foodName/:amount', (req, res) => {
    var foodName = req.params.foodName
    var amount = req.params.amount
 
    connection.query("UPDATE`food_inventory`.`food types` SET`Amount` = '" + amount + "' WHERE(`foodName` = '" + foodName + "');");
    console.log('Amount updated to ' + amount + " for item " + foodName + " at " + stringTime());
    res.send("Value updated to " + amount + " for item " + foodName);
})

app.get('/updatetarget/:foodName/:amount', (req, res) => {
    var foodName = req.params.foodName
    var amount = req.params.amount

    connection.query("UPDATE`food_inventory`.`food types` SET`Target` = '" + amount + "' WHERE(`foodName` = '" + foodName + "');");
    console.log('Target value updated to ' + amount + " for item " + foodName + " at " + stringTime());
    res.send("Target value  updated to " + amount + " for item " + foodName);
})

app.get('/requestfoodlist', (req, res) => {
    console.log("Request for food list recieved at " + stringTime())
    connection.query("SELECT * FROM food_inventory.`food types`;", function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    })
})

app.get('/remove/:foodName', (req, res) => {
    var foodName = req.params.foodName;
    connection.query("SELECT count(1) FROM food_inventory.`food types` Where foodName = '" + foodName + "'", function (err, result, fields){
        if (result[0]["count(1)"] == 1) {
            connection.query("DELETE FROM `food_inventory`.`food types` WHERE (`foodName` = '" + foodName + "')");
            res.send(true);
            console.log("Removed " + foodName + " from storage at " + stringTime());
        } else {
            res.send(false);
            console.log("Can not remove what was not already there");
        }
    });
})

app.get('/add/:foodName', (req, res) => {
    var foodName = req.params.foodName;
    connection.query("SELECT count(1) FROM food_inventory.`food types` Where foodName = '" + foodName + "'", function (err, result, fields) {
        if (result[0]["count(1)"] == 0) {
            connection.query("INSERT INTO `food_inventory`.`food types` (`foodName`, `Amount`) VALUES ('" + foodName + "', '0');");
            res.send(true);
            console.log("Added " + foodName + " to storage at " + stringTime());
        } else {
            res.send(false);
            console.log("Tried to add already existing food");
        }
    });
})

app.get('/check', (req, res) => {

});


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

function stringTime() {
    let d = new Date();
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}