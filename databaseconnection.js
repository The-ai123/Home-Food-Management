// Requiring modules
const express = require('express');
const app = express();
const mssql = require("mysql");

// Get request
app.get('/', function (req, res) {

    // Config your database credential
    const config = {
        user: 'website',
        password: 'websiteuser123$',
        server: 'localhost',
        database: 'geek'
    };

    // Connect to your database
    mssql.connect(config, function (err) {

        // Create Request object to perform
        // query operation
        var request = new mssql.Request();

        // Query to the database and get the records
        request.query('select * from student',
            function (err, records) {

                if (err) console.log(err)

                // Send records as a response
                // to browser
                res.send(records);

            });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});


con.connect(function (err) {
    document.write("AAAA")
    if (err) throw err;
    //Select all customers and return the result object:
    con.query("INSERT INTO `main`.`main` (`idmain`, `name`, `favnum`) VALUES ('3', 'fred', '9')", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});