const express = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "atividade_node",
  password: "ds564",
  port: 5432,
});

const app = express();
const PORT = 3000;

app.use(express.json(""));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/users", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json({
      total: rows.length,
      users: rows,
    });
  } catch (error) {
    console.log("error in get users", error);
    res.status(500).json(error);
  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    res.json(rows);
  } catch (error) {
    console.log("error in get users id", error);
    res.status(500).json(error);
  }
});

app.post("/users", async (req, res) => {
  const { name, last_name, email, date_of_birth } = req.body;
  const age = calculateAge(new Date(date_of_birth));
  const zodiac_sign = calculateZodiacSign(new Date(date_of_birth));
  try {
    const { rows } = await pool.query(
      "INSERT INTO users (name, last_name, email, date_of_birth, age, zodiac_sign) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, last_name, email, date_of_birth, age, zodiac_sign]
    );
    res.json(rows);
  } catch (error) {
    console.log("error in post users", error);
    res.status(500).json(error);
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, last_name, email, date_of_birth } = req.body;
  const age = calculateAge(new Date(date_of_birth));
  const zodiac_sign = calculateZodiacSign(new Date(date_of_birth));
  try {
    const { rows } = await pool.query(
      "UPDATE users SET name = $1, last_name = $2, email = $3, date_of_birth = $4, age = $5, zodiac_sign = $6 WHERE id = $7 RETURNING *",
      [name, last_name, email, date_of_birth, age, zodiac_sign, id]
    );
    res.json(rows);
  } catch (error) {
    console.log("error in put users", error);
    res.status(500).json(error);
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(rows);
  } catch (error) {
    console.log("error in delete users", error);
    res.status(500).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const calculateAge = (date_of_birth) => {
  const today = new Date();
  const birthDate = new Date(date_of_birth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const calculateZodiacSign = (date_of_birth) => {
  const month = date_of_birth.getMonth() + 1;
  const day = date_of_birth.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return "Aries";
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return "Taurus";
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return "Gemini";
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return "Cancer";
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return "Leo";
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return "Virgo";
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return "Libra";
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return "Scorpio";
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return "Sagittarius";
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return "Capricorn";
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return "Aquarius";
  } else {
    return "Pisces";
  }
};
