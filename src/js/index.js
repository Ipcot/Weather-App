import axios from 'axios';

const refs = {
  weatherBlock: document.querySelector('#weather'),
  form: document.querySelector('.form'),
};
let city = '';
refs.form.addEventListener('submit', onSubmitHandler);

function onSubmitHandler(e) {
  e.preventDefault();
  city = e.currentTarget.elements.search.value;
  loadWeather(city);
}

async function loadWeather(city) {
  // refs.weatherBlock.innerHTML = `
  //   <div class="weather__loading">
  //     <img src="./img/loading.gif" width="60px" alt="loading..." />
  //   </div>`;

  const server = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=41557fa4b8274a974a05a8a942e16556`;
  const response = await axios(server);
  console.log(response.data);

  getWeather(response.data);
}

if (refs.weatherBlock) {
  loadWeather('Haaltert');
}

function getWeather(data) {
  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  const template = `
    <div class="weather__header">
          <div class="weather__main">
            <div class="weather__city">${location}</div>
            <div class="weather__status">${weatherStatus}</div>
          </div>
          <div class="weather__icon">
            <img
              src="https://openweathermap.org/img/w/${weatherIcon}.png"
              alt="${weatherStatus}"
            />
          </div>
        </div>
         <div class="weather__temp">${temp}</div>
        <div class="weather__feels-like">Feels like: ${feelsLike}</div>
        <div class="weather__loading">
      <img src="./img/loading.gif" width="60px" alt="loading..." />
    </div>`;
  refs.weatherBlock.innerHTML = template;
}
