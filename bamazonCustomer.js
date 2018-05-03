var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
//no more struggling to format the table (yayyyy)

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
        
        //make a display table
        var showTable = new table({
            head: ["Item ID", "Product Name", "Department", "Price", "Stock Quantity"],
            colWidths: [10, 45, 20, 10, 10]
        });

        for (var i = 0; i < resp.length; i++) {

            showTable.push([
                resp[i].item_id, resp[i].product_name, resp[i].department_name, resp[i].price, resp[i].stock_quantity
            ])
        }
        console.log(showTable.toString());
        runPrompt();
    })
}

// function runPrompt() {
//     connection.query("select * from products", function (err, resp) {
//         if (err) throw err;

//         inquirer.prompt({
//             name: "buy",
//             message: "What Would you like to buy? (Please indicate by ID)",
//         }).then(function(answer) {
//             if(answer.buy === resp.item_id) {
//                 inquirer.prompt([
//                     {
//                         name: "howMany",
//                         message: "How many would you like to purchase?",
//                         validate: function(value) {
//                             if (isNaN(value) === false) {
//                                 return true;
//                             }
//                             return false;
//                         }
//                     }
//                 ]).then(function(answer) {
//                     if (answer.howMany === )
//                 })
//             }
//         }
//     });
// }