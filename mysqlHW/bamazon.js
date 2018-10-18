var inquirer = require('inquirer');
var mysql = require('mysql');

var amountOwed;
var currentDepartment;
var updateSales;

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazondb'
});

//Establish Connection
connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id: ' + connection.threadId)
});

//FUNCTIONS
//=============================================================================

//Displays all items available in store and then calls the place order function
function showProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log('=================Items in Store==================');
        console.log('=================================================');

        for (i = 0; i < res.length; i++) {
            console.log('Item ID:' + res[i].id + ' Product_name: ' + res[i].Product_name + ' Price: ' + '$' + res[i].Price + '(Stock_quanity: ' + res[i].Stock_quanity + ')')
        }
        console.log('=================================================');
        placeOrder();
    })
}

//Prompts the user to place an order, fulfills the order, and then calls the new order function
function placeOrder() {
    inquirer.prompt([{
        name: 'selectId',
        message: 'Please enter the ID of the product you wish to purchase',
        validate: function (value) {
            var valid = value.match(/^[0-9]+$/)
            if (valid) {
                return true
            }
            return 'Please enter a valid Product ID'
        }
    }, {
        name: 'selectQuantity',
        message: 'How many of this product would you like to order?',
        validate: function (value) {
            var valid = value.match(/^[0-9]+$/)
            if (valid) {
                return true
            }
            return 'Please enter a numerical value'
        }
    }]).then(function (answer) {
        connection.query('SELECT * FROM products WHERE id = ?', [answer.selectId], function (err, res) {
            if (answer.selectQuanity > res[0].Stock_quanity) {
                console.log('Insufficient Quantity');
                console.log('This order cannot be completed');
                console.log('');
                newOrder();
            } else {
                amountOwed = res[0].Price * answer.selectQuanity;
                currentDepartment = res[0].Department_name;
                console.log('Thanks for your order');
                console.log('You owe $' + amountOwed);
                console.log('This order will ship ASAP');
                //update products table
                connection.query('UPDATE products SET ? Where ?', [{
                    Stock_quanity: res[0].Stock_quanity - answer.selectQuanity
                }, {
                    id: answer.selectId
                }], function (err, res) {});
                //update departments table
                logSaleToDepartment();
                newOrder();
            }
        })

    }, function (err, res) {})
};

//Allows the user to place a new order or end the connection
function newOrder() {
    inquirer.prompt([{
        type: 'confirm',
        name: 'choice',
        message: 'Would you like to place another order?'
    }]).then(function (answer) {
        if (response === true) {
            placeOrder();
        } else {
            console.log('Thank you for shopping at Bamazon!');
            connection.end();
        }
    })
};

//functions to push the sales to the executive table
function logSaleToDepartment() {
    connection.query('SELECT * FROM departments WHERE Department_name = ?', [currentDepartment], function (err, res) {
        updateSales = res[0].TotalSales + amountOwed;
        updateDepartmentTable();
    })
};

function updateDepartmentTable() {
    connection.query('UPDATE departments SET ? WHERE ?', [{
        TotalSales: updateSales
    }, {
        Department_name: currentDepartment
    }], function (err, res) {});
};
//Call the original function (all other functions are called within this function)
//======================================================================
showProducts();