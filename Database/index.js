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
connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)
})

app.get('/:number/:name', (req, res) => {
    var number = req.params.number
    var name = req.params.name
    connection.query("INSERT INTO `main`.`main` (`name`, `favnum`) VALUES ('" + name + "', '" + number + "')")
    res.send('Hello World!' + number)
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