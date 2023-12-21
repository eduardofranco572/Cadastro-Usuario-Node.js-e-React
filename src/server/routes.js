const express = require('express');
const router = express.Router();
const db = require('./db');
const upload = require('./upload');

router.post('/cadastrar-usuario', upload.single('img'), (req, res) => {
    const { nome, email, senha } = req.body;
    const img = req.file.filename;
  
    const sql = `INSERT INTO usuario (nome, email, senha, img) VALUES (?, ?, ?, ?)`;
    db.query(sql, [nome, email, senha, img], (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar usuário: ', err);
        res.status(500).send('Erro ao cadastrar usuário');
        return;
      }
      res.send('Cadastrado com sucesso');
    });
});

router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const sql = `SELECT id, nome, img FROM usuario WHERE email = ? AND senha = ?`;
  db.query(sql, [email, senha], (err, result) => {
    if (err) {
        console.log('Erro ao realizar login: ', err);
        res.status(500).send('Erro ao realizar login');
        return;
    }

    if (result.length > 0) {
      const user = result[0];
      console.log('Usuário logado com sucesso:', user);
      res.send({ message: 'Login bem-sucedido', user });
    } else {
        res.status(401).send('Credenciais inválidas');
    }
    
  });
});


module.exports = router;
