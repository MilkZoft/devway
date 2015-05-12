DROP PROCEDURE IF EXISTS getUser;

DELIMITER $$

CREATE PROCEDURE getUser(
  IN _network VARCHAR(25),
  IN _username VARCHAR(20),
  IN _password VARCHAR(40),
  IN _networkId INT)
BEGIN
  IF _network = 'website' THEN
    SELECT * FROM users
    WHERE username = _username
      AND password = _password;
  ELSE
    SELECT * FROM users
    WHERE username = _username
      AND networkId = _networkId
      AND network = _network;
  END IF;
END $$
DELIMITER ;
