// Criar uma variável global para armazenar o mapa
let map;

// Criar uma função para inicializar o mapa
function initMap() {
  // Definir as opções do mapa
  let mapOptions = {
    // Definir o centro do mapa como a cidade de Porto Alegre
    center: { lat: -30.0346, lng: -51.2177 },
    // Definir o nível de zoom do mapa
    zoom: 12,
  };

  // Criar uma instância do mapa e associá-la ao elemento div com id "map"
  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Fazer uma requisição GET para a sua API REST para obter os dados dos furtos
  fetch("/api/furtos")
    .then((response) => response.json())
    .then((data) => {
      // Criar um array vazio para armazenar os pontos dos furtos
      let points = [];

      // Iterar sobre os dados dos furtos
      for (let furto of data) {
        // Obter a latitude e a longitude do furto
        let lat = furto.latitude;
        let lng = furto.longitude;

        // Criar um objeto LatLng com a latitude e a longitude do furto
        let point = new google.maps.LatLng(lat, lng);

        // Adicionar o ponto ao array de pontos
        points.push(point);

        // Criar um marcador com a posição do furto no mapa
        let marker = new google.maps.Marker({
          position: point,
          map: map,
          title: `Furto de bicicleta ${furto.marca} ${furto.modelo}`,
        });
      }

      // Criar uma camada de zona de calor com os pontos dos furtos
      let heatmap = new google.maps.visualization.HeatmapLayer({
        data: points,
        map: map,
      });
    })
    .catch((error) => {
      // Em caso de erro, mostrar uma mensagem no console
      console.error(error);
    });
}

// Chamar a função initMap quando a janela for carregada
window.onload = initMap;

// Criar uma função para fazer o login e redirecionar para a página admin.html
function login() {
  window.location.href = "/auth/github";
}
