CREATE DATABASE skatepark;

DROP TABLE IF EXISTS skaters;
DROP TABLE IF EXISTS admins;

CREATE TABLE skaters(
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(25) NOT NULL,
	password VARCHAR(65) NOT NULL,
	email VARCHAR(25) NOT NULL,
	anos_experiencia INT NOT NULL,
	especialidad VARCHAR(50) NOT NULL,
	foto VARCHAR(255) ,
	estado BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE admins(
	id SERIAL PRIMARY KEY,
	email VARCHAR(25) NOT NULL,
	password VARCHAR(60),
	isAdmin BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO skaters (nombre, password, email, anos_experiencia, especialidad, foto) 
VALUES
    ('Tomas Hawk', '$2a$10$3QAr/IkaCEaAo6RM2YK5T.4YorrfIqd1Npr3Sq7z3cQZqvvv373fK', 'email1@email.com', 15, 'Kickflip', '/public/images/tony.jpg'),
    ('Eve Gonzalez', '$2a$10$WJPCXPsUNxnBhOiCr55NT.qFEyebhCqgPjzZzxF3ioco41XdS1u9i', 'email2@email.com', 12, 'Heelflip', '/public/images/Evelien.jpg'),
    ('Daniel Perez', '$2a$10$cTrTP.zBWSOHnPJZtRlauueH9KWI2Ldd7CqEWZM1sMQ/nFbs0bSp6', 'email3@email.com', 9, 'Ollie', '/public/images/Danny.jpg');
-- Todas las pass de ingreso usuario para el login son: 112233abc (se usan las imagenes contenidas en la carpeta public/images)

INSERT INTO admins (email, password)
VALUES
    ('admin@test.com', '$2a$10$vNYLJsVIoBzJzn1cowyL0uFOcFv/jDVc7fjnGP7oumV43Ft0VzeZq');
-- La pass de ingreso admin es: 112233abc

SELECT * FROM admins;

SELECT * FROM skaters;
