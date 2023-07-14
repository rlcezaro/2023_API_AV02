const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client("980205035441-gmvj389h1q3tg6rg1b74bpi7fbr4686i.apps.googleusercontent.com");
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "980205035441-gmvj389h1q3tg6rg1b74bpi7fbr4686i.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
}
verify().catch(console.error);

// Criar uma função para adicionar um novo furto
function addFurto(event) {
  // Prevenir o comportamento padrão do formulário
  event.preventDefault();

  // Obter os dados do formulário com id "add-form"
  let form = document.getElementById("add-form");

  // Criar um objeto com os dados do formulário
  let data = {
    marca: form.marca.value,
    modelo: form.modelo.value,
    horario: form.horario.value,
    local: form.local.value,
    latitude: form.latitude.value,
    longitude: form.longitude.value,
  };

  // Fazer uma requisição POST para a sua API REST para inserir um novo furto
  fetch("/api/furtos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Em caso de sucesso, mostrar uma mensagem no console
      console.log(data.message);
    })
    .catch((error) => {
      // Em caso de erro, mostrar uma mensagem no console
      console.error(error);
    });
}

// Criar uma função para atualizar um furto existente
function updateFurto(event) {
  // Prevenir o comportamento padrão do formulário
  event.preventDefault();

  // Obter os dados do formulário com id "update-form"
  let form = document.getElementById("update-form");

  // Criar um objeto com os dados do formulário
  let data = {
    marca: form["marca-update"].value,
    modelo: form["modelo-update"].value,
    horario: form["horario-update"].value,
    local: form["local-update"].value,
    latitude: form["latitude-update"].value,
    longitude: form["longitude-update"].value,
  };

  // Obter o id do furto a ser atualizado
  let id = form["id-update"].value;

  // Fazer uma requisição PUT para a sua API REST para atualizar o furto com o id informado
  fetch(`/api/furtos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Em caso de sucesso, mostrar uma mensagem no console
      console.log(data.message);
    })
    .catch((error) => {
      // Em caso de erro, mostrar uma mensagem no console
      console.error(error);
    });
}

// Criar uma função para consultar um furto pelo id
function searchFurto(event) {
  // Prevenir o comportamento padrão do formulário
  event.preventDefault();

  // Obter os dados do formulário com id "search-form"
  let form = document.getElementById("search-form");

  // Obter o id do furto a ser consultado
  let id = form["id-search"].value;

  // Fazer uma requisição GET para a sua API REST para obter o furto com o id informado
  fetch(`/api/furtos/${id}`)
    .then((response) => response.json())
    .then((data) => {
      // Em caso de sucesso, mostrar os dados do furto no elemento div com id "search-result"
      let result = document.getElementById("search-result");
      result.innerHTML = `
        <p>Marca: ${data.marca}</p>
        <p>Modelo: ${data.modelo}</p>
        <p>Horário: ${data.horario}</p>
        <p>Local: ${data.local}</p>
        <p>Latitude: ${data.latitude}</p>
        <p>Longitude: ${data.longitude}</p>
      `;
    })
    .catch((error) => {
      // Em caso de erro, mostrar uma mensagem no console
      console.error(error);
    });
}

// Criar uma função para deletar um furto pelo id
function deleteFurto(event) {
  // Prevenir o comportamento padrão do formulário
  event.preventDefault();

  // Obter os dados do formulário com id "delete-form"
  let form = document.getElementById("delete-form");

  // Obter o id do furto a ser deletado
  let id = form["id-delete"].value;

  // Fazer uma requisição DELETE para a sua API REST para deletar o furto com o id informado
  fetch(`/api/furtos/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      // Em caso de sucesso, mostrar uma mensagem no console
      console.log(data.message);
    })
    .catch((error) => {
      // Em caso de erro, mostrar uma mensagem no console
      console.error(error);
    });
}

// Criar uma função para fazer o logout e redirecionar para a página index.html
/*function logout() {
  window.location.href = "/index.html";
}*/
