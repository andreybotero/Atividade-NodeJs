const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Configuração do Pool de conexão com o PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "atividade_node",
  password: "ds564",
  port: 5432,
});

