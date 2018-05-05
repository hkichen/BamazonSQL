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
