function searchCity(city) {
  let apiKey = "c9b6f1c11dca5098f50e3c467f7b1552";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "c9b6f1c11dca5098f50e3c467f7b1552";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Antwerp");

let now = new Date();

let date = now.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let year = now.getFullYear();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let newDate = document.querySelector("#date");
newDate.innerHTML = `${date}/${month}/${year}`;
let newTime = document.querySelector("#time");
newTime.innerHTML = `${hours}:${minutes}`;

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <div class="weekday">${day}</div>
      <img
        src="http://openweathermap.org/img/wn/10d@2x.png"
        alt=""
        width="60"
      />
      <div class="temperature-forecast">
        <span class="temperature-max-forecast">20°C</span>
        <span class="temperature-min-forecast">15°C</span>
      </div>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c9b6f1c11dca5098f50e3c467f7b1552";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

displayForecast();
