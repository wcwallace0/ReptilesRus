-- Make sure this data is in MySQL

--helpful stuff:

--/usr/local/mysql/bin/mysql -u root -p

-- const mysql = require('mysql2');
-- require('dotenv').config();

-- const connection = mysql.createConnection({
-- 	host : 'localhost',
-- 	user : 'root',
-- 	password : '@Chi3v3r$',
-- 	database : 'pets'
-- })

-- connection.connect((err => {
--     if(err) throw err;
--     console.log(`MySQL Connected`);
-- }));

-- exports.db_connection = connection

--actual code:

create table customer (
    CustomerID varchar(150) primary key, # username
    CustName varchar(150),
    CustPhone char(12),
    CustEmail varchar(100),
    passwd varchar(200) not null,
    custAddress varchar(50),
    custApt varchar(25),
    custCity varchar(50),
    PaymentInfo int not null,
    CustState char(2),
    CustZip char(5)
);

insert into customer (CustomerID, passwd, PaymentInfo) values('ddokupil@trinity.edu', 'pass', 0);


create table product (
    ProductID serial primary key,
    PictureID int,
    ProdPrice float not null,
    ProdDesc varchar(255),
    ProdLoc int,
    ProdName varchar(100) not null,
    ProdQuantity int not null,
    ProdCategory varchar(10)
);

insert into product (ProdPrice, ProdDesc, ProdName, ProdQuantity, ProdCategory) values (
    199.99, 
    "A terrarium is a see through glass container that is a must for anyone seeking to keep a reptile as a pet. Preparing one to serve as a home for your reptilian pet is crucial. These come in a variety of sizes as well. Plants and soil sold separately!",
    "Terrarium", 5, "General"
);

insert into product (ProdPrice, ProdDesc, ProdName, ProdQuantity, ProdCategory) values (
    19.99,
    "Similar to objects one would use to decorate a fish aquarium. Toys and such for your pet to interact with or otherwise to simply spruce up the place.",
    "Terrarium Decoration Pieces",
    20, 
    "General"
);


create table cart (
    CustomerID varchar(150) not null,
    ProductID bigint unsigned not null,
    quantity int not null,
    primary key (CustomerID, ProductID),
    foreign key (CustomerID) REFERENCES customer(CustomerID),
    foreign key (ProductID) REFERENCES product(ProductID)
);

insert into cart values ('ddokupil@trinity.edu', 1, 1);
insert into cart values ('ddokupil@trinity.edu', 2, 3);

create table admin (
    adminID serial primary key,
    adminPhone char(12) not null,
    adminEmail varchar(100) not null,
    adminPassword varchar(200) not null
);

insert into admin (adminPhone, adminEmail, adminPassword) values ('123-456-7890', 'admin', 'test');

