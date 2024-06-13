DROP TABLE IF EXISTS SKATERS;

CREATE TABLE SKATERS(
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(25) NOT NULL,
	password VARCHAR(60) NOT NULL,
	email VARCHAR(25) NOT NULL,
	anos_experiencia INT NOT NULL,
	especialidad VARCHAR(50) NOT NULL,
	foto VARCHAR(255) ,
	estado BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS ADMINS;

CREATE TABLE ADMINS(
	id SERIAL PRIMARY KEY,
	email VARCHAR(25) NOT NULL,
	password VARCHAR(60),
	isAdmin BOOLEAN NOT NULL DEFAULT TRUE
);

SELECT * FROM ADMINS;

SELECT * FROM SKATERS;

INSERT INTO SKATERS (nombre, password, email, anos_experiencia, especialidad, foto)
VALUES
('Nombre1', '123', 'test1@test.com', 11, 'flip1', 'fotoejemplo1.jpg'),
('Nombre2', '123', 'test2@test.com', 12, 'flip2', 'fotoejemplo2.jpg'),
('Nombre3', '123', 'test3@test.com', 13, 'flip3', 'fotoejemplo3.jpg');

SELECT * FROM SKATERS;