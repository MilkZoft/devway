DROP PROCEDURE IF EXISTS getUser;

DELIMITER $$

CREATE PROCEDURE getUser(
  IN _network VARCHAR(25),
  IN _networkId VARCHAR(25),
  IN _username VARCHAR(20),
  IN _password VARCHAR(40))
BEGIN
  IF _network = 'website' THEN
    SELECT id, username, email, avatar FROM users
    WHERE username = _username
      AND password = _password
      AND situation = 'active';
  ELSE
    SELECT id, networkId, network, username, email, avatar FROM users
    WHERE username = _username
      AND networkId = _networkId
      AND network = _network
      AND situation = 'active';
  END IF;
END $$
DELIMITER ;
