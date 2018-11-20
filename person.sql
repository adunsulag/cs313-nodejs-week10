DROP TABLE IF EXISTS person;
CREATE TABLE person(
	id serial primary key
	,first_name varchar(100) NOT NULL
	,last_name varchar(100) NOT NULL
	,dob date NOT NULL
);

DROP TABLE IF EXISTS relationship;
CREATE TABLE relationship(
	parent serial NOT NULL
	,child serial NOT NULL
	,primary key(parent, child)
);

INSERT INTO person(first_name, last_name, dob) VALUES ('Child 1', 'Nielson', '2009-01-01'), ('Child 2', 'Nielson', '2010-05-01'), ('Parent 1', 'Nielson', '1980-01-01')
, ('Parent 2', 'Nielson', '1975-01-01');
INSERT INTO relationship(child, parent) VALUES ((select id FROM person WHERE first_name = 'Child 1'), (select id FROM person WHERE first_name = 'Parent 1'));
INSERT INTO relationship(child, parent) VALUES ((select id FROM person WHERE first_name = 'Child 2'), (select id FROM person WHERE first_name = 'Parent 2'));

SELECT * FROM person;
SELECT * FROM relationship;
