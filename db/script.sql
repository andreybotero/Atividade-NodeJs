CREATEDATABASE atividade_node;

CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  sobrenome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  data_nascimento DATE NOT NULL,
  zodiac VARCHAR(255) NOT NULL,
  idade INT NOT NULL
);
