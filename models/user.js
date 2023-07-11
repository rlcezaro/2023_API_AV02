// Importar o módulo mongoose
const mongoose = require("mongoose");

// Criar um esquema de usuário com os campos necessários
const UserSchema = mongoose.Schema({
  githubId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Exportar o modelo de usuário como um módulo
module.exports = mongoose.model("User", UserSchema);
