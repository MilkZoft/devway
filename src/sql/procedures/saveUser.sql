DROP PROCEDURE IF EXISTS saveUser;

DELIMITER $$

CREATE PROCEDURE saveUser(
  IN _network VARCHAR(25),
  IN _networkId VARCHAR(25),
  IN _username VARCHAR(20),
  IN _password VARCHAR(40),
  IN _email VARCHAR(150),
  IN _avatar VARCHAR(255),
  IN _suscribed TINYINT(1))
BEGIN
  DECLARE error VARCHAR(255);
  DECLARE success VARCHAR(255);

  IF _network = 'website' THEN
    IF (_username <> 'undefined' AND _username <> '') THEN
      IF (_password <> 'undefined' AND _password <> '') THEN
        IF (_email <> 'undefined' AND _email <> '') THEN
          IF (_suscribed >= 0) THEN
            IF (SELECT EXISTS (SELECT 1 FROM users WHERE username = _username)) THEN
              SET error = 'exists:username';
              SELECT error;
            ELSE
              IF (SELECT EXISTS (SELECT 1 FROM users WHERE email = _email)) THEN
                SET error = 'exists:email';
                SELECT error;
              ELSE
                IF (SELECT EXISTS (SELECT 1 FROM users WHERE (networkId = _networkId) AND (network = _network))) THEN
                  SET error = 'exists:social:networkId';
                  SELECT error;
                ELSE
                  INSERT INTO users (
                    network,
                    username,
                    password,
                    email,
                    avatar,
                    subscribed
                  ) VALUES (
                    _network,
                    _username,
                    _password,
                    _email,
                    '/images/users/default.png',
                    _suscribed
                  );

                  SET success = 'success:inserted:website:user';
                  SELECT success;
                END IF;
              END IF;
            END IF;
          ELSE
            SET error = 'invalid:number:suscribed';
            SELECT error;
          END IF;
        ELSE
          SET error = 'invalid:email';
          SELECT error;
        END IF;
      ELSE
        SET error = 'undefined:password';
        SELECT error;
      END IF;
    ELSE
      SET error = 'undefined:username';
      SELECT error;
    END IF;
  ELSE
    IF(_username <> 'undefined' AND _username <> '') THEN
      IF (_networkId <> 'undefined' AND _networkId <> '') THEN
        IF (_email <> 'undefined' AND _email <> '') THEN
          IF (_avatar <> 'undefined' AND _avatar <> '') THEN
            IF (_suscribed >= 0) THEN
              IF (SELECT EXISTS (SELECT 1 FROM users WHERE username = _username)) THEN
                SET error = 'exists:username';
                SELECT error;
              ELSE
                IF (SELECT EXISTS (SELECT 1 FROM users WHERE email = _email)) THEN
                  SET error = 'exists:email';
                SELECT error;
                ELSE
                  IF (SELECT EXISTS (SELECT 1 FROM users WHERE (networkId = _networkId) AND (network = _network))) THEN
                    SET error = 'exists:social:networkId';
                    SELECT error;
                  ELSE
                    INSERT INTO users (
                      networkId,
                      network,
                      username,
                      email,
                      avatar,
                      subscribed
                    ) VALUES (
                      _networkId,
                      _network,
                      _username,
                      _email,
                      _avatar,
                      _suscribed
                    );

                    SET success = 'success:inserted:social:username';
                    SELECT success;
                  END IF;
                END IF;
              END IF;
            ELSE
              SET error = 'invalid:number:subscribed';
              SELECT error;
            END IF;
          ELSE
            SET error = 'undefined:avatar';
            SELECT error;
          END IF;
        ELSE
          SET error = 'invalid:email';
          SELECT error;
        END IF;
      ELSE
        SET error = 'undefined:networkId';
        SELECT error;
      END IF;
    ELSE
      SET error = 'undefined:username';
      SELECT error;
    END IF;
  END IF;
END $$
DELIMITER ;
