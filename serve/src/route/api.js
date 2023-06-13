const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const mysql = require('mysql');


// Conectar ao banco de dados mysql
const bd = require('./database');

const app = express();
app.use(cors());
app.use(bodyParser.json());



/// Rota de cadastro de usuário
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  bd.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    res.json({ message: 'Usuário cadastrado com sucesso' });
  });
});

// Rota de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, rows) => {
    if (err) {
      console.error('Erro ao fazer login:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    res.json({ message: 'Login bem-sucedido' });
  });
});

// Rota de encurtamento de URL
app.post('/shorten', (req, res) => {
  const { url } = req.body;
  const shortUrl = shortid.generate();

  bd.query('INSERT INTO urls (id, originalUrl, shortUrl) VALUES (?, ?, ?)', [shortUrl, url, shortUrl], (err) => {
    if (err) {
      console.error('Erro ao encurtar URL:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    res.json({ shortUrl });
  });
});

// Rota de redirecionamento de URL
app.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;

  connection.query('SELECT * FROM urls WHERE shortUrl = ?', [shortUrl], (err, rows) => {
    if (err) {
      console.error('Erro ao redirecionar URL:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: 'URL não encontrada' });
    }

    const row = rows[0];

    bd.query('UPDATE urls SET visits = visits + 1 WHERE id = ?', [row.id], (err) => {
      if (err) {
        console.error('Erro ao incrementar número de visitas:', err);

      }

      res.redirect(row.originalUrl);
    });
  });
});

// Rota de exclusão de URL
app.delete('/urls/:id', (req, res) => {
  const { id } = req.params;

  bd.query('DELETE FROM urls WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Erro ao excluir URL:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    res.json({ message: 'URL excluída com sucesso' });
  });
});

// Rota do top 100 de URLs mais visitadas
app.get('/top100', (req, res) => {
  bd.query('SELECT shortUrl, visits FROM urls ORDER BY visits DESC LIMIT 100', (err, rows) => {
    if (err) {
      console.error('Erro ao obter top 100 de URLs:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    const topURLs = rows.map(row => {
      return {
        shortUrl: url.shortUrl,
        visits: url.visits,
        title: url.title

      };
    });

    res.json({ topURLs });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});