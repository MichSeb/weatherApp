// import './style.css';
const cityInput = document.getElementById('city');
const searchButton = document.getElementById('submit');
const cityName = document.getElementById('city-name');

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
  const url = `http://api.weatherapi.com/v1/forecast.json?key=&q=${city}&days=3`;
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
  cityName.textContent = cityInput.value;
  getWeatherData(city).then((data) => {
    console.log(data);
  });
});
