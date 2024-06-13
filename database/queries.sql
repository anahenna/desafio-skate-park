DROP TABLE IF EXISTS SKATERS;

CREATE TABLE SKATERS(
	id SERIAL PRIMARY KEY,
	email VARCHAR(25) NOT NULL,
	anos_experiencia INT NOT NULL,
	especialidad VARCHAR(50) NOT NULL,
	foto VARCHAR(255) NOT NULL,
	estado BOOLEAN NOT NULL DEFAULT FALSE
);

SELECT * FROM SKATERS;

INSERT INTO SKATERS (email, anos_experiencia, especialidad, foto)
VALUES('test@test.com', 12, 'flip', 'fotoejemplo.jpg');

SELECT * FROM SKATERS;