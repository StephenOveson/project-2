INSERT INTO services(NAME, cost)
VALUES ("Men's Cut", 15.00), ("Women's Cut", 40.00), ("All Over Color", 70.00), ("Partial highlight", 95.00), ("Full Highlight", 115.00), ("Partial Balayage", 125.00), ("Full Balayage", 140.00), ("Manicure Normal Polish", 20.00), ("Manicure Gel Polish", 25.00), ("Pedicure Normal Polish", 30.00), ("Pedicure Gel Polish", 35.00), ("Facial", 30.00);

INSERT INTO Cosmetologists(NAME, email, phone, address, city, state, zip, PASSWORD)
VALUES ("Savannah Schmidt", "savannahschmidt1@yahoo.com", "5555555555", "test", "test", "test", "test", "password"), ("Regina Spektor", "haircutting4you@yahoo.com", "5555555555", "test", "test", "test", "test", "password");

INSERT INTO CosmetologistService(CosmetologistId, ServiceId)
VALUES (1, 1), (1, 2), (2, 1), (2, 4);

INSERT INTO CosmetologistService(CosmetologistId, ServiceId)
VALUES (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12);

INSERT INTO Availabilities(dayOfWeek, CosmetologistId)
VALUES ("Monday", 1), ("Tuesday", 1), ("Wednesday", 1), ("Thursday", 1), ("Friday", 1), ("Saturday", 1), ("Sunday", 1), ("Tuesday", 2), ("Wednesday", 2), ("Thursday", 2), ("Friday", 2);