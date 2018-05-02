var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pass",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Database!")
    openStore();
})

function openStore(){
    console.log(
        "\n--------------------"
        + "Welcome to Bamazon, where some things can be found~!"
        + "\n--------------------"
        + "\n\nThis is what we currently have in stock: "
    );

    connection.query("select * from products", function (err, resp) {
        if (err) throw err;
        for (var i = 0; i < resp.length; i++) {
            console.log(
                "ID: " + resp[i].item_id 
                + " || Item Name: " + resp[i].product_name + "  "
                + " || Price: " + resp[i].price + " "
            )
        }
        //runPrompt();
    })
}

// function runPrompt() {
//     inquirer.prompt({
//         name: "buy",
//         message: "What Would you like to buy? (Please indicate by ID)"
//     }).then(function(answer) {

//     }
// }