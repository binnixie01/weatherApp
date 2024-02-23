import "./style.css";
import Clouds from "./assets/Clouds.jpg";
import Snow from "./assets/Snow.jpg";
import Rain from "./assets/Rain.jpg";
import Clear from "./assets/Clear.jpg";
import Thunderstorm from "./assets/Thunderstorm.jpg";
import Default from "./assets/default.jpg";

const location = document.getElementById("place");
const tempDiv = document.getElementById("temperature");
const condition = document.getElementById("condition");
const weatherImage = document.createElement("img");
const weatherCondition = document.getElementById("weatherCondition");
weatherCondition.prepend(weatherImage);
const { body } = document;
const content = document.getElementById("content");

const button = document.getElementById("location-button");
let place;

const bgImage = (data) => {
  let imageUrl;
  if (data) {
    const weather = data.weather[0].main;
    switch (weather) {
      case "Clouds":
        imageUrl = `url(${Clouds})`;
        break;
      case "Snow":
        imageUrl = `url(${Snow})`;
        break;
      case "Rain":
        imageUrl = `url(${Rain})`;
        break;
      case "Drizzle":
        imageUrl = `url(${Rain})`;
        break;
      case "Clear":
        imageUrl = `url(${Clear})`;
        break;
      case "Thunderstorm":
        imageUrl = `url(${Thunderstorm})`;
        break;
      default:
        imageUrl = `url(${Default})`; // Default to empty string if weather condition doesn't match
    }
  } else {
    imageUrl = `url(${Default})`;
  }
  body.style.backgroundImage = imageUrl;
};

function toTitleCase(str) {
  return str
    .toLowerCase()
    .replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
}

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=611c459610fd2350acf5d49c2372124b&units=metric`
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // console.log(error);
    return null;
  }
}

const displayWeather = async () => {
  place = document.getElementById("location-input").value;
  const data = await getWeather(place);
  if (data) {
    const imgSrc = data.weather[0].icon;
    location.innerText = toTitleCase(place);
    tempDiv.innerText = `${data.main.temp}°C`;
    condition.innerText = toTitleCase(data.weather[0].description);
    weatherImage.src = `https://openweathermap.org/img/wn/${imgSrc}@2x.png`;
    bgImage(data);
    content.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
  } else {
    location.innerText =
      "error 404!!The place doesn't exist or is not in the database!!";
  }
};

// async function getAir() {
//   const response = await fetch(
//     `http://api.openweathermap.org/data/2.5/air_pollution?lat=50&lon=50&appid=611c459610fd2350acf5d49c2372124b`
//   );
//   const data = await response.json();
//   console.log(data);
// }

button.addEventListener("click", displayWeather);
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") displayWeather();
  console.log(event.key);
});
bgImage();
