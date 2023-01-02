const express = require('express')
const app = express()
const port = 3200
const d = new Date();

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

app.get('/:foodName/:amount', (req, res) => {
    var foodName = req.params.foodName
    var amount = req.params.amount
 
    connection.query("UPDATE`food_inventory`.`food types` SET`Amount` = '" + amount + "' WHERE(`foodName` = '" + foodName + "');");
    console.log('Value updated to ' + amount + " for item " + foodName);
    res.send("Value updated to " + amount + " for item " + foodName);
})

app.get('/requestfoodlist', (req, res) => {
    console.log("request for food list recieved at " + d.toTimeString())
    connection.query("SELECT * FROM food_inventory.`food types`;", function (err, result, fields) {
        if (err) throw err;
        res.send(result)
        console.log("request for food list sent at " + d.toTimeString())
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})