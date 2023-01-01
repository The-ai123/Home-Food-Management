const express = require('express')
const app = express()
const port = 3200



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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})