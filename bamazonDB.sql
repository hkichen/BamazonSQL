drop database if exists bamazondb;
create database bamazondb;

use bamazondb;
drop table if exists products;

create table products (
	item_id int auto_increment not null,
  product_name varchar(240),
  department_name varchar(240),
  price decimal not null,
  stock_quantity int not null,
  PRIMARY KEY (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ("earbuds", "electronics", 14.98, 20);

insert into products (product_name, department_name, price, stock_quantity)
values ("mug", "kitchen", 10.50, 20);

insert into products (product_name, department_name, price, stock_quantity)
values ("Hooded Sweatshirt", "Clothes", 21.34, 20);

insert into products (product_name, department_name, price, stock_quantity)
values ("Azalea Ahrub - 3g", "Garden", 24.30, 15);

insert into products (product_name, department_name, price, stock_quantity)
values ("organic Honey - 16oz", "Food", 44.50, 10);

insert into products (product_name, department_name, price, stock_quantity)
values ("Stone Ground Crackers", "Food", 6.50, 20);

insert into products (product_name, department_name, price, stock_quantity)
values ("Lace Curtains", "Home", 14.98, 20);

insert into products (product_name, department_name, price, stock_quantity)
values ("Slinky", "Toys", 14.98, 20);