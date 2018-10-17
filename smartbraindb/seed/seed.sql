BEGIN TRANSACTION;

INSERT INTO users (name, email, age, pet, entries, joined) VALUES ('Tony', 'tony@gmail.com', 25, 'Jasmine', 5, '2018-01-01');
INSERT INTO login (hash, email) VALUES ('$2a$10$QoUKzub8YUi2qAaaPcMZD.oUxfZ0ulxyYbIs0gHC9No6Qg.xHmeUa','tony@gmail.com');

COMMIT;
