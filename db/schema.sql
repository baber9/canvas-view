CREATE DATABASE canvasview_db;
USE canvasview_db;

CREATE TABLE admin
(
	id int NOT NULL AUTO_INCREMENT,
	username VARCHAR(25) NOT NULL,
    password VARCHAR(20) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE art
(
	id int NOT NULL AUTO_INCREMENT,
	art_title VARCHAR(150) NOT NULL,
   artist_name VARCHAR(150) NOT NULL,
    image_url VARCHAR(500),    
    address VARCHAR(150) NOT NULL,
    museum_name VARCHAR(150),
    state VARCHAR(25),
    zipcode VARCHAR(7),
    city VARCHAR (50),
    phone VARCHAR(50),
    website VARCHAR(155),
	PRIMARY KEY (id)
);

