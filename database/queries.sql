CREATE DATABASE SKATEPARK;

DROP TABLE IF EXISTS SKATERS;
DROP TABLE IF EXISTS ADMINS;

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
    ('Tomas Hawk', '$2a$10$9XiJSMjTQUbmZ8WkZFrHU.0OTW4z6ShxQHl053dAfvh.WfwU0fUki', 'email1@email.com', 15, 'Kickflip', '/public/images/tony.jpg'),
    ('Eve Gonzalez', '$2a$10$9XiJSMjTQUbmZ8WkZFrHU.0OTW4z6ShxQHl053dAfvh.WfwU0fUki', 'email2@email.com', 12, 'Heelflip', '/public/images/Evelien.jpg'),
    ('Daniel Perez', '$2a$10$U/96kyPPFmGAwd88FIfD6uY7t.M3Y9vk/MELgNHpkqzfa69Kx2YGa', 'email3@email.com', 9, 'Ollie', '/public/images/Danny.jpg');
-- Todas las pass de ingreso usuario son: 112233abc

SELECT * FROM SKATERS;

INSERT INTO ADMINS (email, password)
VALUES
    ('admin@test.com', '$2a$10$vNYLJsVIoBzJzn1cowyL0uFOcFv/jDVc7fjnGP7oumV43Ft0VzeZq');
-- La pass de ingreso admin es: 112233abc

SELECT * FROM ADMINS;