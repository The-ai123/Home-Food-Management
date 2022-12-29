var mysql = require('mysql');

var result;

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "website",
    password: "websiteuser123$"
});

con.connect(function (err) {
    if (err) throw err;
    //Select all customers and return the result object:
    Insert into main(PersonID, UserName, FavNum)
    Values(1, 'Fred', 7)
    con.query("SELECT * FROM main.main", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});

function test() {

    con.connect(function (err) {
        if (err) throw err;
        //Select all customers and return the result object:
        con.query("SELECT * FROM main.main", function (err, result, fields) {
            if (err) throw err;
            console.log(err);
        });
    });
    
    Insert into main(PersonID, UserName, FavNum)
    Values(1, 'Fred', 7)
    
    


}