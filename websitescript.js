
var http = require('http');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "website",
    password: "websiteuser123$"
});

con.connect()

function test() {
    document.write("ADA")
    var mysql = require('mysql');
    document.write("ACA")
    con.query("INSERT INTO `main`.`main` (`idmain`, `name`, `favnum`) VALUES ('5', 'fred', '10')", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    document.write("B")
}