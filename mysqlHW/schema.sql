DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;


CREATE TABLE products
(
    id INT NOT NULL
    AUTO_INCREMENT,
  Product_name VARCHAR
    (100) NOT NULL,
  Department_name VARCHAR
    (100) NOT NULL,
  Price DECIMAL
    (9,4) NOT NULL,
  Stock_quanity INTEGER
    (10),
  PRIMARY KEY
    (id)
);

    INSERT INTO products
        (Product_name, Department_name, Price, Stock_quanity)
    VALUES
        ('Pool Toy', 'Outdoors', 29.99, 12);

    INSERT INTO products
        (Product_name, Department_name, Price, Stock_quanity)
    VALUES
        ('Television', 'Electronics', 529.99, 6);

    INSERT INTO products
        (Product_name, Department_name, Price, Stock_quanity)
    VALUES
        ('Couch', 'Home', 1129.99, 3);

    INSERT INTO products
        (Product_name, Department_name, Price, Stock_quanity)
    VALUES
        ('Tire', 'Vehicle', 129.99, 32);

    INSERT INTO products
        (Product_name, Department_name, Price, Stock_quanity)
    VALUES
        ('T-shirt', 'Fashion', 19.99, 4);

    INSERT INTO products
        (Product_name, Department_name, Price, Stock_quanity)
    VALUES
        ('Pants', 'Fasion', 39.99, 14);

    INSERT INTO products
        (Product_name, Department_name, Price, Stock_quanity)
    VALUES
        ('Game console', 'Electronics', 329.99, 7);

    INSERT INTO products
        (Product_name, Department_name, Price, Stock_quanity)
    VALUES
        ('Car battery', 'Vehicle', 119.99, 1);

    INSERT INTO products
        (Product_name, Department_name, Price, Stock_quanity)
    VALUES
        ('Astro turf', 'Outdoors', 699.99, 3);

    INSERT INTO products
        (Product_name, Department_name, Price, Stock_quanity)
    VALUES
        ('Desk chair', 'Home', 89.99, 5);

    CREATE TABLE departments
    (
        DepartmentId INT NOT NULL
        AUTO_INCREMENT,
	DepartmentName VARCHAR
        (100) NOT NULL,
	OverheadCost DECIMAL
        (10,2) NOT NULL,
	TotalSales DECIMAL
        (10,2),
	PRIMARY KEY
        (DepartmentId)
);
        SELECT *
        From products;

        SELECT *
        FROM departments;



