const mysql = require('mysql');
// configurando o banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql12',
  database: 'bancomysql',
  port: 3306
});
// exerção de erros do banco
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }

  // Cria a tabela de usuários
  db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Erro ao criar tabela de usuários:', err);
    }
  });

  // Cria a tabela de URLs
  db.query(`
    CREATE TABLE IF NOT EXISTS urls (
      id VARCHAR(255) PRIMARY KEY,
      originalUrl VARCHAR(255) NOT NULL,
      shortUrl VARCHAR(255) NOT NULL,
      visits INT DEFAULT 0,
      title VARCHAR(255)
    )
  `, (err) => {
    if (err) {
      console.error('Erro ao criar tabela de URLs:', err);
    }
  });
});

module.exports = db;

