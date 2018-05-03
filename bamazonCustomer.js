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
        + "--------------------"
        + "\n\nThis is what we currently have in stock: "
    );
    
    connection.query("select * from products", function (err, resp) {
        if (err) throw err;
        
        //make a display table
        var showTable = new Table({
            head: ["Item ID", "Product Name", "Department", "Price", "Stock"],
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

function runPrompt() {
    inquirer.prompt([
        {
            name: "buy",
            message: "What Would you like to buy? (Please indicate by ID)",   
        }, {
            name: "howMany",
            message: "How many would you like to purchase?"
        }        
    ]).then(function(answer) {
        var buyID = answer.buy;
        var buyAmount = answer.howMany;
        //run transaction function here//
        transaction(buyID, buyAmount);
    });
};
       
//this function updates the server according to what user purchasses
//1. check for stock match, then proceed with updating server
function transaction(buy, howMany) {
    connection.query("select * from products where item_id = " + buy, function(err, resp) {
        if (err) throw err;

        if (howMany <= resp[0].stock_quanitity) {
            console.log("It looks like this item is in stock. Your order is being processed.");
            
            var totalPrice = resp[0].price * howMany;
            
            console.log("Your final cost is $" 
            + totalPrice 
            + "\nThanks for stopping buy! ^_~*");

            connection.query("update products SET stock_quantity = stock_quantity -" + howMany + "where item_id =" + buy);
        }else {
            console.log("\nSorry, I do not have enough of what you want. Beep Boop. Schzzztttt.... (X_x)")
        }
        openStore();
    })

}

