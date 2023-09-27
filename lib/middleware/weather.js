const { get } = require("http");

const Cities_Weather = [
  {
  location: {
    name: "City Name Here",
    state: "State name Here"
  },
  api_url: 'https://api.weather.gov/points/45.5152,-122.6784',
  forecastUrl: "https://api.weather.gov/gridpoints/PQR/113,104/forecast/hourly",
  iconUrl: "some link",
  weather: "weather info here",
  temp: "temperature here",
},
{
  location: {
    name: "City Name Here",
    state: "State name Here"
  },
  api_url: 'https://api.weather.gov/points/44.0582,-121.3153',
  forecastUrl: "https://api.weather.gov/gridpoints/PDT/35,41/forecast/hourly",
  iconUrl: "some link",
  weather: "weather info here",
  temp: "temperature here",
},
{
  location: {
    name: "City Name Here",
    state: "State name here"
  },
  api_url: 'https://api.weather.gov/points/45.5095,-122.7116', // Correção aqui
  forecastUrl: "https://api.weather.gov/gridpoints/PQR/112,104/forecast/hourly",
  iconUrl: "some link",
  weather: "weather info here",
  temp: "temperature here",
},
{
  location: {
    name: "City Name Here",
    state: "State name Here"
  },
  api_url: 'https://api.weather.gov/points/44.042,-121.3706',
  forecastUrl: "https://api.weather.gov/gridpoints/PDT/34,41/forecast/hourly",
  iconUrl: "some linkd",
  weather: "weather info here",
  temp: "temperature here",
},
];

const getInfoAboutCity = async (elemento) => {
  return fetch(elemento.api_url)
  .then((response) => response.json())
  .then( (data) => {
    elemento.location.name = data.properties.relativeLocation.properties.city;
    elemento.location.state = data.properties.relativeLocation.properties.state;
    return
  })
  .catch((error) => {
    console.error("Erro ao buscar dados da API:", error);
    return elemento; // Retorna elemento sem alterações em caso de erro
  });
};

const getCitiesForecast = async (elemento) => {
  return fetch(elemento.forecastUrl)
  .then((response) => response.json())
  .then((data) => {
    elemento.weather = data.properties.periods[0].shortForecast;
    elemento.temp = data.properties.periods[0].temperature;
    elemento.iconUrl = data.properties.periods[0].icon;
    return
  })
  .catch((error) => {
    console.log("Erro ao buscar dados da API", error);
    return elemento
  })
}
const updatedList = Cities_Weather.map((elemento) =>
  getInfoAboutCity(elemento).then(() => getCitiesForecast(elemento))
);

// Quando todas as promessas forem resolvidas, a lista estará atualizada
Promise.all(updatedList)
  .then((result) => {
    console.log(result); // Exibe a lista atualizada
  })
  .catch((error) => {
    console.error("Erro ao atualizar elementos:", error);
  });

  const weatherMiddleware = (req, res, next) => {
    if(!res.locals.partials) res.locals.partials = {}
    res.locals.partials.weatherContext = Cities_Weather;
    next()
  }

module.exports = weatherMiddleware;

