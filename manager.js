var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
    database:  "bamazonDB"
});

var updateInventory = [];
var addItem = [];

//est. a connection to the database
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Database!")
    managerOptions();
})

//function for actions
function managerOptions() {
    console.log("Welcome to the Manage Portal.\n")

    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low-Stock Inventory", "Add to Inventory", "Add New Item"]
        }
    ]).then(function(answer) {
        if (answer === "View Products for Sale") {
            viewProducts();
            newAction();
        }

        if (answer === "View Low-Stock Inventory") {
            lowStock();
            newAction();
        }

        if (answer === "Add to Inventory") {
            addToStock();
            newAction();
        }

        if (answer === "Add New Item") {
            newItem();
            newAction();
        }
    })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, respp){
        if (err) throw err;
        console.log(
            "\n--------------------\n" +
            "-----Items Available for Purchase-----\n"
        );

        var productsTable = new Table({
            head: ["Item ID", "Product Name", "Department", "Price", "Stock"]
        });

        for (var i = 0; i < resp.length; i++) {
            productsTable.push([
                resp[i].item_id, resp[i].product_name, resp[i].department_name, resp[i].price,resp[i].stock_quantity
            ])
        }
        console.log(productsTable.toString());
    })
}

function newAction() {
    inquirer.prompt([{
		type: "confirm",
		name: "action",
		message: "Would you like to perform another action?"
	}]).then(function(answer){
		if(answer.action){
			managerOptions();
		}
		else{
			console.log("Alrighty! Until next time.");
			connection.end();
		}
	})
}

function lowStock() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 4', function(err, res){
        if (err) throw err;

        console.log(
            "\n--------------------\n" +
            "-----Low Stock Items-----\n"
        );

        var lowStockTable = new Table({
            head: ["Item ID", "Product Name", "Department", "Price", "Stock"]
        });

        for (var i = 0; i < resp.length; i++) {
            lowStockTable.push([
                resp[i].item_id, resp[i].product_name, resp[i].department_name, resp[i].price,resp[i].stock_quantity
            ])
        }
        console.log(lowStockTable.toString());
    })
}

function addToStock(){
    inquirer.prompt([
        {
            name: "item",
            message: "Enter the ID of the item you wish to add stock to."
        },

        {
            name: "amount",
            message: "How many?"
        }
    ]).then(function(answer){
        connection.query('SELECT * FROM products WHERE id = ?', [answer.item], function(err, resp){
            connection.query('UPDATE products SET ? Where ?', [{
                stock_quantity: resp[0].stock_quantity + parseInt(answer.amount)
            },{
                id: answer.item
            }], function(err, resp){});
        })
    console.log('Inventory updated');
    })
}

function newItem() {
    inquirer.prompt([{
        name: "product",
        message: 'Enter product name: '
    },
    
    {
        name: "department",
        message: 'Enter department name: '
    },
    
    {
        name: "price",
        message: "price (00.00 format): ",
    },
    
    {
        name: "stock",
        message: "Stock amount: ",
    }]).then(function(answer){
        connection.query('INSERT into products SET ?', {
            product_name: answer.product,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.stock
        }, function(err, resp){});
        console.log("New Item Added :-)");
    })
}