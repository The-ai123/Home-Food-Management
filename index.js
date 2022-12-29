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

app.get('/', (req, res) => {
    connection.query("INSERT INTO `main`.`main` (`idmain`, `name`, `favnum`) VALUES ('6', 'fred', '17')")
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})