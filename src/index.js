import "./style.css";

const location = document.getElementById("place");
const tempDiv = document.getElementById("temperature");
const condition = document.getElementById("condition");
const weatherImage = document.createElement("img");
const leftDiv = document.getElementById("left");
leftDiv.appendChild(weatherImage);

// tempDiv.appendChild(temp)
const button = document.getElementById("location-button");

async function getWeather() {
  const place = document.getElementById("location-input").value;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=611c459610fd2350acf5d49c2372124b&units=metric`
  );
  const data = await response.json();
  const imgSrc = data.weather[0].icon;
  location.innerText = place;
  tempDiv.innerText = `${data.main.temp}°C`;
  condition.innerText = data.weather[0].description;
  weatherImage.src = `https://openweathermap.org/img/wn/${imgSrc}@2x.png`;
}

async function getAir(city) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=50&lon=50&appid=611c459610fd2350acf5d49c2372124b`
  );
  const data = await response.json();
  console.log(data);
}

button.addEventListener("click", () => {
  getWeather();
});

// getAir()
