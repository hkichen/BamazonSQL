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
    
    connection.query("SELECT * FROM products", function (err, resp) {
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
            name: "ID",
            message: "What Would you like to buy? (Please indicate by ID)",   
        }, {
            name: "Stock",
            message: "How many would you like to purchase?"
        }        
    ]).then(function(answer) {
        var itemID = answer.ID;
        var wantAmount = answer.Stock;
        console.log(answer)
        //run transaction function here//
        transaction(itemID, wantAmount);
    });
};
       
//this function updates the server according to what user purchasses
//1. check for stock match, then proceed with updating server
function transaction(ID, stockNeeded) {
    connection.query("SELECT * FROM products WHERE item_id = " + ID, function(err, resp) {
        if (err) throw err;

        if (stockNeeded <= resp[0].stock_quantity) {
            console.log("It looks like this item is in stock. Your order is being processed.");
            
            var totalPrice = resp[0].price * stockNeeded;
            
            console.log("Your final cost is $" 
            + totalPrice 
            + "\nThanks for stopping by! ^_~*");

            connection.query("UPDATE products SET ? WHERE ? ",[
                {stock_quantity : resp[0].stock_quantity - stockNeeded},
                {item_id: ID}
            ], function(err, resp) {
                if (err) throw err;
            });

            openStore();
        }else {
            console.log("\nSorry, I do not have enough of what you want. Beep Boop. Schzzztttt.... (X_x)")
        }
        openStore();
    })

}

