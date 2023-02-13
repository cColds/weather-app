import weather from "./weatherIcons.json";

const searchBar = document.querySelector(".search-bar");

// main weather
const search = document.querySelector(".fa-magnifying-glass");
const clearSearch = document.querySelector(".fa-xmark");
const location = document.querySelector(".location");
const time = document.querySelector(".time");
const mainWeatherIcon = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".weather-description");
const temperature = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feels-like");

// more weather info
// const airQualityIndex = document.querySelector(".air-quality-index-value");
// const precipitation = document.querySelector(".precipitation-value");

const humidity = document.querySelector(".humidity-value");
const wind = document.querySelector(".wind-speed-value");
const hpa = document.querySelector(".hpa-value");

const sunrise = document.querySelector(".sunrise-value");
const sunset = document.querySelector(".sunset-value");
const apiKey = "d92ae7934e5fdcdcd8e453a8b3bbadd7";

// forecast

const weatherForecastDay = document.querySelectorAll(".day-forecast-date");
const weatherForecastDescription = document.querySelectorAll(
	".day-forecast-weather-description"
);

const weatherForecastTemperature = document.querySelectorAll(
	".day-forecast-temperature"
);
const weatherForecastIcon = document.querySelectorAll(".weather-forecast-icon");

function updateWeatherIcon(weatherIcon, weatherValue) {
	if (weatherValue === "Clear") {
		weatherIcon.src = weather.clear.day;
	} else if (weatherValue === "Clouds") {
		weatherIcon.src = weather.cloud.brokenClouds.day;
	} else if (weatherValue === "Rain" || weather === "Drizzle") {
		weatherIcon.src = weather.rain;
	} else if (weatherValue === "Snow") {
		weatherIcon.src = weather.snow;
	} else if (weatherValue === "Thunderstorm") {
		weatherIcon.src = weather.thunder;
	} else {
		weatherIcon.src = weather.mist;
	}
}

const unit = "imperial"; // set metric option later

// weather forecast
async function updateWeatherInfo() {
	try {
		const data = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&units=${unit}&appid=${apiKey}`
		);

		const response = await data.json();
		console.log(response);
		updateWeatherIcon(mainWeatherIcon, response.weather[0].main);
		weatherDescription.textContent = response.weather[0].description;
		temperature.textContent = response.main.temp.toFixed(0);
		feelsLike.textContent = `feels like ${response.main.feels_like.toFixed(
			0
		)}°`;
		wind.textContent = `${response.wind.speed} mph`;
		humidity.textContent = `${response.main.humidity}%`;
		hpa.textContent = response.main.pressure;
		sunrise.textContent = response.sys.sunrise;
		sunset.textContent = response.sys.sunset;
		location.textContent = `${response.name}, ${response.sys.country}`;
	} catch {
		console.error("Failed to resolve weather info");
	}
}

async function updateWeatherForecast() {
	try {
		const weatherForecastData = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${searchBar.value}&units=${unit}&appid=${apiKey}`
		);
		const response = await weatherForecastData.json();
		const dailyForecast = [0, 8, 16, 24, 32, 40]; // daily forecast for 5 days

		// day
		for (let i = 0; i < weatherForecastDay.length; i += 1) {
			weatherForecastDay[i].textContent =
				response.list[dailyForecast[i]].dt_txt;
		}

		// weather description
		for (let i = 0; i < weatherForecastDescription.length; i += 1) {
			weatherForecastDescription[i].textContent =
				response.list[dailyForecast[i]].weather[0].description;
		}

		// temperature
		for (let i = 0; i < weatherForecastTemperature.length; i += 1) {
			weatherForecastTemperature[i].textContent = `${response.list[
				dailyForecast[i]
			].main.temp.toFixed(0)}°`;
		}

		for (let i = 0; i < weatherForecastIcon.length; i += 1) {
			weatherForecastIcon[i].textContent = updateWeatherIcon(
				weatherForecastIcon[i],
				response.list[dailyForecast[i]].weather[0].main
			);
		}

		console.log(response);
	} catch {
		console.error("Failed to resolve weather forecast");
	}
}

function searchWeatherInfo() {
	updateWeatherInfo();
	updateWeatherForecast();
	searchBar.value = "";
}

search.addEventListener("click", searchWeatherInfo);

searchBar.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		searchWeatherInfo();
	}
});

// default weather to singapore
searchBar.value = "Singapore";
searchWeatherInfo();
