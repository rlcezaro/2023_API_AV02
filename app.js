// Importar os módulos necessários
const express = require("express");
const mysql = require("mysql");
const path = require("path");
const passport = require("passport");

// Importar o modelo de usuário
//const User = require("./models/user");

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

// Criar uma rota GET para listar todos os furtos de bicicleta
app.get("/api/furtos", (req, res) => {
  // Criar uma query SQL para selecionar todos os registros da tabela furto_bicicleta
  let sql = "SELECT * FROM furto_bicicleta";
  // Executar a query e enviar a resposta
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(result);
    }
  });
});

// Criar uma rota GET para buscar um furto de bicicleta pelo id
app.get("/api/furtos/:id", (req, res) => {
  // Obter o id do parâmetro da rota
  let id = req.params.id;
  // Criar uma query SQL para selecionar o registro da tabela furto_bicicleta com o id informado
  let sql = `SELECT * FROM furto_bicicleta WHERE id = ${id}`;
  // Executar a query e enviar a resposta
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

// Criar uma rota POST para inserir um novo furto de bicicleta
app.post("/api/furtos", (req, res) => {
  // Obter os dados do corpo da requisição
  let data = req.body;
  // Validar se os dados estão completos
  if (data.marca && data.modelo && data.horario && data.local && data.latitude && data.longitude) {
    // Criar uma query SQL para inserir um novo registro na tabela furto_bicicleta com os dados informados
    let sql = `INSERT INTO furto_bicicleta (marca, modelo, horario, local, latitude, longitude) VALUES ('${data.marca}', '${data.modelo}', '${data.horario}', '${data.local}', ${data.latitude}, ${data.longitude})`;
    // Executar a query e enviar a resposta
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

// Criar uma rota PUT para atualizar um furto de bicicleta pelo id
app.put("/api/furtos/:id", (req, res) => {
  // Obter o id do parâmetro da rota
  let id = req.params.id;
  // Obter os dados do corpo da requisição
  let data = req.body;
  // Validar se os dados estão completos
  if (data.marca && data.modelo && data.horario && data.local && data.latitude && data.longitude) {
    // Criar uma query SQL para atualizar o registro da tabela furto_bicicleta com o id informado e os dados informados
    let sql = `UPDATE furto_bicicleta SET marca = '${data.marca}', modelo = '${data.modelo}', horario = '${data.horario}', local = '${data.local}', latitude = ${data.latitude}, longitude = ${data.longitude} WHERE id = ${id}`;
    // Executar a query e enviar a resposta
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

// Criar uma rota DELETE para remover um furto de bicicleta pelo id
app.delete("/api/furtos/:id", (req, res) => {
  // Obter o id do parâmetro da rota
  let id = req.params.id;
  // Criar uma query SQL para deletar o registro da tabela furto_bicicleta com o id informado
  let sql = `DELETE FROM furto_bicicleta WHERE id = ${id}`;
  // Executar a query e enviar a resposta
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

// Criar uma rota GET para autenticar o usuário com o GitHub
app.get("/auth/github", passport.authenticate("github"));

// Criar uma rota GET para receber o callback do GitHub após a autenticação
app.get("/github/callback", passport.authenticate("github", { failureRedirect: "/login" }), function (req, res) {
  // Autenticação bem-sucedida, redirecionar para a página admin.html
  res.redirect("/admin.html");
});

// Criar um middleware para verificar se o usuário está autenticado
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // Se o usuário está autenticado, prosseguir com a próxima função
    return next();
  }
  // Se o usuário não está autenticado, redirecionar para a página index.html
  res.redirect("/index.html");
}

// Usar o middleware para proteger a rota que envia o arquivo admin.html
app.get("/admin.html", ensureAuthenticated, (req, res) => {
  // Enviar o arquivo admin.html como resposta
  res.sendFile(path.join(__dirname, "admin.html"));
});

// Iniciar o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
