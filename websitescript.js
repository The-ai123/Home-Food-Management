var mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "website",
    password: "websiteuser123$"
});


con.connect(function(err) {
  if (err) throw err;
  //Select all customers and return the result object:
    con.query("SELECT * FROM main.main", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

function test() {
    document.write("AHHHHHHHHHH");
    
}