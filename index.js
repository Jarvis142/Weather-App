let now = new Date();
console.log(now);
console.log(now.getDay());
console.log(now.getHours());
console.log(now.getMinutes());

let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day} ${hour}: ${minutes}`;

function formatDate() {
  return `${day} ${hour}: ${minutes}`;
}
formatDate();

function search(city) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=
  ${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}
function showWeather(response) {
  console.log(response.data.name);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}/mph`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels-like").innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°F`;
}
function performSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  search(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", performSearch);

function searchLocation(position) {
  let apiKey = "50c2acd53349fabd54f52b93c8650d37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let myLocationButton = document.querySelector("#my-location");
myLocationButton.addEventListener("click", getCurrentLocation);
search("New York");
