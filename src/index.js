import './style.css';
const cityInput = document.getElementById('city');
const searchButton = document.getElementById('submit');
const cityName = document.getElementById('city-name');

// TODAY
const tempMinToday = document.getElementById('temp-min-today');
const tempMaxToday = document.getElementById('temp-max-today');
const sunriseToday = document.getElementById('sunrise-today');
const sunsetToday = document.getElementById('sunset-today');
const moonriseToday = document.getElementById('moonrise-today');
const moonsetToday = document.getElementById('moonset-today');
const weatherIconToday = document.getElementById('weather-icon-today');
const tempNowToday = document.getElementById('temp-now-today');
const tempFeelsToday = document.getElementById('temp-feels-today');
const weatherOptionToday = document.getElementById('weather-option-today');
const windToday = document.querySelector('.wind-today');
const pressureToday = document.querySelector('.pressure-today');
const humidityToday = document.querySelector('.humidity-today');
const rainToday = document.querySelector('.rain-today');
// TOMMOROW
const tempMinTommorow = document.getElementById('temp-min-tommorow');
const tempMaxTommorow = document.getElementById('temp-max-tommorow');
const sunriseTommorow = document.getElementById('sunrise-tommorow');
const sunsetTommorow = document.getElementById('sunset-tommorow');
const moonriseTommorow = document.getElementById('moonrise-tommorow');
const moonsetTommorow = document.getElementById('moonset-tommorow');
const weatherIconTommorow = document.getElementById('weather-icon-tommorow');
const weatherOptionTommorow = document.getElementById(
  'weather-option-tommorow'
);
const windTommorow = document.querySelector('.wind-tommorow');
const humidityTommorow = document.querySelector('.humidity-tommorow');
const rainTommorow = document.querySelector('.rain-tommorow');
// AFTER TOMMOROW
const tempMinAfter = document.getElementById('temp-min-after');
const tempMaxAfter = document.getElementById('temp-max-after');
const sunriseAfter = document.getElementById('sunrise-after');
const sunsetAfter = document.getElementById('sunset-after');
const moonriseAfter = document.getElementById('moonrise-after');
const moonsetAfter = document.getElementById('moonset-after');
const weatherIconAfter = document.getElementById('weather-icon-after');
const weatherOptionAfter = document.getElementById('weather-option-after');
const windAfter = document.querySelector('.wind-after');
const humidityAfter = document.querySelector('.humidity-after');
const rainAfter = document.querySelector('.rain-after');

let city = '';

//Change pl letters to eng only - needed for API search
function changePlToEng(tekst) {
  const zamiany = {
    ą: 'a',
    ć: 'c',
    ę: 'e',
    ł: 'l',
    ń: 'n',
    ó: 'o',
    ś: 's',
    ż: 'z',
    ź: 'z',
  };

  return tekst.replace(/[ąćęłńóśżź]/g, (match) => zamiany[match] || match);
}

async function getWeatherData(city) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=3`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

searchButton.addEventListener('click', () => {
  city = changePlToEng(cityInput.value);

  getWeatherData(city).then((data) => {
    const cityNameShow = cityInput.value;
    console.log(data);
    cityName.textContent = `${cityNameShow}, ${data.location.localtime}`;
    // TODAT
    tempMinToday.textContent = `Temp. min.: ${data.forecast.forecastday[0].day.mintemp_c}°C`;
    tempMaxToday.textContent = `Temp. max.: ${data.forecast.forecastday[0].day.maxtemp_c}°C`;
    sunriseToday.textContent = `${data.forecast.forecastday[0].astro.sunrise}`;
    sunsetToday.textContent = `${data.forecast.forecastday[0].astro.sunset}`;
    moonriseToday.textContent = `${data.forecast.forecastday[0].astro.moonrise}`;
    moonsetToday.textContent = `${data.forecast.forecastday[0].astro.moonset}`;
    weatherIconToday.src = data.current.condition.icon;
    tempNowToday.textContent = `${data.current.temp_c}°C`;
    tempFeelsToday.textContent = `Feels like ${data.current.feelslike_c}°C`;
    weatherOptionToday.textContent = data.current.condition.text;
    windToday.textContent = `Wind: ${data.current.gust_kph} km/h`;
    pressureToday.textContent = `Pressure: ${data.current.pressure_mb} hPa`;
    humidityToday.textContent = `Humidity: ${data.current.humidity}%`;
    rainToday.textContent = `Rain chance: ${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    // TOMMOROW
    tempMinTommorow.textContent = `Temp. min.: ${data.forecast.forecastday[1].day.mintemp_c}°C`;
    tempMaxTommorow.textContent = `Temp. max.: ${data.forecast.forecastday[1].day.maxtemp_c}°C`;
    sunriseTommorow.textContent = `${data.forecast.forecastday[1].astro.sunrise}`;
    sunsetTommorow.textContent = `${data.forecast.forecastday[1].astro.sunset}`;
    moonriseTommorow.textContent = `${data.forecast.forecastday[1].astro.moonrise}`;
    moonsetTommorow.textContent = `${data.forecast.forecastday[1].astro.moonset}`;
    weatherIconTommorow.src = data.forecast.forecastday[1].day.condition.icon;
    weatherOptionTommorow.textContent =
      data.forecast.forecastday[1].day.condition.text;
    windTommorow.textContent = `Wind: ${data.forecast.forecastday[1].day.avgvis_km} km/h`;
    humidityTommorow.textContent = `Humidity: ${data.forecast.forecastday[1].day.avghumidity}%`;
    rainTommorow.textContent = `Rain chance: ${data.forecast.forecastday[1].day.daily_chance_of_rain}%`;
    // AFTER TOMMOROW
    tempMinAfter.textContent = `Temp. min.: ${data.forecast.forecastday[2].day.mintemp_c}°C`;
    tempMaxAfter.textContent = `Temp. max.: ${data.forecast.forecastday[2].day.maxtemp_c}°C`;
    sunriseAfter.textContent = `${data.forecast.forecastday[2].astro.sunrise}`;
    sunsetAfter.textContent = `${data.forecast.forecastday[2].astro.sunset}`;
    moonriseAfter.textContent = `${data.forecast.forecastday[2].astro.moonrise}`;
    moonsetAfter.textContent = `${data.forecast.forecastday[2].astro.moonset}`;
    weatherIconAfter.src = data.forecast.forecastday[2].day.condition.icon;
    weatherOptionAfter.textContent =
      data.forecast.forecastday[2].day.condition.text;
    windAfter.textContent = `Wind: ${data.forecast.forecastday[2].day.avgvis_km} km/h`;
    humidityAfter.textContent = `Humidity: ${data.forecast.forecastday[2].day.avghumidity}%`;
    rainAfter.textContent = `Rain chance: ${data.forecast.forecastday[2].day.daily_chance_of_rain}%`;
    console.log('All good');
  });
});
