CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  zodiac_sign VARCHAR(255) NOT NULL,
  age INT NOT NULL
);

CREATE FUNCTION get_zodiac_sign(date_of_birth DATE) RETURNS VARCHAR(255) AS $ $ DECLARE sign VARCHAR(255);

BEGIN IF date_of_birth BETWEEN '2020-03-21'
AND '2020-04-19' THEN sign := 'Aries';

ELSIF date_of_birth BETWEEN '2020-04-20'
AND '2020-05-20' THEN sign := 'Taurus';

ELSIF date_of_birth BETWEEN '2020-05-21'
AND '2020-06-20' THEN sign := 'Gemini';x

ELSIF date_of_birth BETWEEN '2020-06-21'
AND '2020-07-22' THEN sign := 'Cancer';

ELSIF date_of_birth BETWEEN '2020-07-23'
AND '2020-08-22' THEN sign := 'Leo';

ELSIF date_of_birth BETWEEN '2020-08-23'
AND '2020-09-22' THEN sign := 'Virgo';

ELSIF date_of_birth BETWEEN '2020-09-23'
AND '2020-10-22' THEN sign := 'Libra';

ELSIF date_of_birth BETWEEN '2020-10-23'
AND '2020-11-21' THEN sign := 'Scorpio';

ELSIF date_of_birth BETWEEN '2020-11-22'
AND '2020-12-21' THEN sign := 'Sagittarius';

ELSIF date_of_birth BETWEEN '2020-12-22'
AND '2021-01-19' THEN sign := 'Capricorn';

ELSIF date_of_birth BETWEEN '2021-01-20'
AND '2021-02-18' THEN sign := 'Aquarius';

ELSE sign := 'Pisces';

END IF;

RETURN sign;

END;

$ $ LANGUAGE plpgsql;

CREATE
OR REPLACE FUNCTION calculate_age(date_of_birth DATE) RETURNS INT AS $ $ DECLARE age INT;

BEGIN age := EXTRACT(
  YEAR
  FROM
    AGE(date_of_birth)
);

RETURN age;

END;

$ $ LANGUAGE plpgsql;

INSERT INTO
  users (
    name,
    last_name,
    email,
    date_of_birth,
    zodiac_sign,
    age
  )
VALUES
  (
    'Alice',
    'Smith',
    'alice.smith@example.com',
    '1995-08-10',
    get_zodiac_sign('1995-08-10'),
    calculate_age('1995-08-10')
  );