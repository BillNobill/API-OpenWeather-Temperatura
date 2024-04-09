let apiKey = "ef481c7b4f97d64488f89435bcd1aeb0";
let lat = 0;
let lon = 0;

function chamarServicoGeoconding() {
  const cidadeDigitada = document.getElementById("nome_cidade").value;
  const estadoDigitado = document.getElementById("nome_estado").value;
  const paisDigitado = document.getElementById("nome_pais").value;

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cidadeDigitada},${estadoDigitado},${paisDigitado}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      lat = data[0].lat;
      lon = data[0].lon;
      console.log(`Latitude: ${lat}, Longitude: ${lon}`);
    })
    .catch((error) => console.error(error))
    .then(chamarServicoOpenWeather(lat, lon));
}

function chamarServicoOpenWeather(lat, lon) {
  const urlReceitaWS =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey;

  fetch(urlReceitaWS)
    .then((response) => {
      if (response.ok) {
        console.log("Resposta do servidor OK<br>");
        return response.json();
      } else {
        mensagemDiv.innerHTML +=
          novaMensagem +
          "Algo falhou durante o processo de envio ao servidor!<br>";
      }
    })
    .then((data) => {
      const temperatura = (data.main.temp - 273.15).toFixed(0); //Conversão da Temperatura para Celsius

      const descricao = data.weather[0].description;
      fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${descricao}`
      )
        .then((response) => response.json())
        .then((translation) => {
          document.getElementById(
            "temperatura"
          ).innerHTML = `${temperatura}°`;
          document.getElementById(
            "nuvens"
          ).innerHTML = `${translation[0][0][0]}`;
        });

    })
    .catch((error) => {
      mensagemDiv.innerHTML +=
        novaMensagem + "Algo falhou durante o processo!<br>";
      console.error("Erro ao requisitar serviço em nuvem!");
    });
}
