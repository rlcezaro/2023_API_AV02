// Importar os módulos necessários
const express = require("express");
const mysql = require("mysql");
const path = require("path");
const passport = require("passport");

// Criar uma conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "furtos_bicicletas",
});

// Conectar ao banco de dados MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Conectado ao banco de dados MySQL");
});


// Criar uma instância do express
const app = express();

// Usar o middleware body-parser para parsear o corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar o middleware express.static para servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Usar o middleware express-session para gerenciar sessões de usuários
app.use(
  require("express-session")({
    secret: "senha secreta",
    resave: false,
    saveUninitialized: false,
  })
);

// Inicializar o passport e usar o middleware passport.session para gerenciar sessões de usuários autenticados
app.use(passport.initialize());
app.use(passport.session());

// Definir como o passport vai serializar e desserializar o usuário na sessão
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    cb(err, user);
  });
});

// Definir a porta do servidor
const PORT = 3000;

app.get("/api/furtos", (req, res) => {
  let sql = "SELECT * FROM furto_bicicleta";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(result);
    }
  });
});

app.get("/api/furtos/:id", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM furto_bicicleta WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({ message: "Furto não encontrado" });
      }
    }
  });
});

app.post("/api/furtos", (req, res) => {
  let data = req.body;
  if (data.marca && data.modelo && data.horario && data.local && data.latitude && data.longitude) {
    let sql = `INSERT INTO furto_bicicleta (marca, modelo, horario, local, latitude, longitude) VALUES ('${data.marca}', '${data.modelo}', '${data.horario}', '${data.local}', ${data.latitude}, ${data.longitude})`;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({
          message: "Furto inserido com sucesso",
          id: result.insertId,
        });
      }
    });
  } else {
    res.status(400).json({ message: "Dados incompletos" });
  }
});

app.put("/api/furtos/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  if (data.marca && data.modelo && data.horario && data.local && data.latitude && data.longitude) {
    let sql = `UPDATE furto_bicicleta SET marca = '${data.marca}', modelo = '${data.modelo}', horario = '${data.horario}', local = '${data.local}', latitude = ${data.latitude}, longitude = ${data.longitude} WHERE id = ${id}`;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({ message: "Furto atualizado com sucesso" });
        } else {
          res.status(404).json({ message: "Furto não encontrado" });
        }
      }
    });
  } else {
    res.status(400).json({ message: "Dados incompletos" });
  }
});

app.delete("/api/furtos/:id", (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM furto_bicicleta WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Furto removido com sucesso" });
      } else {
        res.status(404).json({ message: "Furto não encontrado" });
      }
    }
  });
});

// Iniciar o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
