var mysql = require('mysql');
var http = require('http');

function test() {
    document.write("ABA")
    var con = mysql.createConnection({
        document.write("AB")
        host: "127.0.0.1",
        user: "website",
        password: "websiteuser123$"
    });

    document.write("AAA")
    con.connect(function (err) {
        document.write("AAAA")
        if (err) throw err;
    //Select all customers and return the result object:
        con.query("INSERT INTO `main`.`main` (`idmain`, `name`, `favnum`) VALUES ('3', 'fred', '9')", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
        });
    });
    document.write("B")
}