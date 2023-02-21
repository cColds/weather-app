// eslint-disable-next-line import/no-extraneous-dependencies
import format from "date-fns/format";
import weather from "./weatherIcons.json";
import getWeatherInfo from "./weatherData";

// Search

const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search-bar-magnifying-glass");
const clearSearch = document.querySelector(".search-bar-delete");
const searchErrorText = document.querySelector(".search-error-text");

// Weather
const loadingAnimation = document.querySelector(".loading-animation");
const location = document.querySelector(".location");
const time = document.querySelector(".time");
const mainWeatherIcon = document.querySelector(".weather-icon");
const weatherDescription = document.querySelector(".weather-description");
const temperature = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feels-like");

// More Weather Info

const humidity = document.querySelector(".humidity-value");
const wind = document.querySelector(".wind-speed-value");
const hpa = document.querySelector(".hpa-value");
const visibility = document.querySelector(".visibility-value");
const sunrise = document.querySelector(".sunrise-value");
const sunset = document.querySelector(".sunset-value");

// Daily Weather Forecast
const weatherForecast = document.querySelector(".weather-forecast");
const weatherForecastDay = document.querySelectorAll(".day-forecast-date");
const weatherForecastDescription = document.querySelectorAll(
	".day-forecast-weather-description"
);

const weatherForecastTemperature = document.querySelectorAll(
	".day-forecast-temperature"
);
const weatherForecastIcon = document.querySelectorAll(".weather-forecast-icon");

// Settings

const settings = document.querySelector(".settings-container");
const settingsOverlay = document.querySelector(".settings.overlay");
const openSettings = document.querySelector(".open-settings");
const closeSettings = document.querySelector(".close-modal.settings");
const measurementUnitCheckbox = document.querySelector(
	"#measurement-unit-checkbox"
);
const clockFormatCheckbox = document.querySelector("#clock-format-checkbox");
const measurementUnit = document.querySelector(".measurement-unit");
const clockFormat = document.querySelector(".clock-format");

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

function convertTimeToCitySearched(response, date) {
	const localTimeInMilliseconds = date.getTime();
	const localTimeOffsetInMilliseconds = date.getTimezoneOffset() * 60000;
	const utc = localTimeInMilliseconds + localTimeOffsetInMilliseconds;
	return utc + 1000 * response.timezone;
}

function getMeasurementUnit() {
	return measurementUnitCheckbox.checked ? "metric" : "imperial";
}

function getClockFormat() {
	return clockFormatCheckbox.checked
		? "MMMM do, EEEE, H:mm"
		: "MMMM do, EEEE, h:mm a";
}
function formatTime(response) {
	return format(
		new Date(convertTimeToCitySearched(response, new Date())),
		getClockFormat()
	);
}

function populateWeatherInfo(response) {
	time.textContent = formatTime(response);

	updateWeatherIcon(mainWeatherIcon, response.weather[0].main);
	weatherDescription.textContent = response.weather[0].description;
	temperature.textContent = `${response.main.temp.toFixed(0)}°`;
	feelsLike.textContent = `feels like ${response.main.feels_like.toFixed(
		0
	)}°`;
	wind.textContent = `${response.wind.speed} mph`;
	humidity.textContent = `${response.main.humidity}%`;
	hpa.textContent = response.main.pressure;
	visibility.textContent = `${(response.visibility / 1609).toFixed(2)} miles`;
	sunrise.textContent = format(
		convertTimeToCitySearched(
			response,
			new Date(response.sys.sunrise * 1000)
		),
		"h:mm a"
	);
	sunset.textContent = format(
		convertTimeToCitySearched(
			response,
			new Date(response.sys.sunset * 1000)
		),
		"h:mm a"
	);
	location.textContent = `${response.name}, ${response.sys.country}`;
}

function populateWeatherForecastInfo(response) {
	const fiveDayDailyForecast = [0, 8, 16, 24, 32, 40];

	for (let i = 0; i < weatherForecastDay.length; i += 1) {
		weatherForecastDay[i].textContent = format(
			new Date(response.list[fiveDayDailyForecast[i]].dt_txt),
			"EEEE"
		);
	}

	for (let i = 0; i < weatherForecastDescription.length; i += 1) {
		weatherForecastDescription[i].textContent =
			response.list[fiveDayDailyForecast[i]].weather[0].description;
	}

	for (let i = 0; i < weatherForecastTemperature.length; i += 1) {
		weatherForecastTemperature[i].textContent = `${response.list[
			fiveDayDailyForecast[i]
		].main.temp.toFixed(0)}°`;
	}

	for (let i = 0; i < weatherForecastIcon.length; i += 1) {
		weatherForecastIcon[i].textContent = updateWeatherIcon(
			weatherForecastIcon[i],
			response.list[fiveDayDailyForecast[i]].weather[0].main
		);
	}
}

async function updateWeatherInfo(locationName) {
	try {
		const response = await getWeatherInfo(
			locationName,
			getMeasurementUnit(),
			"weather"
		);

		searchErrorText.style.visibility = "hidden";
		populateWeatherInfo(response);

		console.log(response);
	} catch (response) {
		searchErrorText.style.visibility = "visible";
		loadingAnimation.classList.remove("loading");

		console.error("Failed to resolve weather info");
	}
}

async function updateWeatherForecast(locationName) {
	try {
		const response = await getWeatherInfo(
			locationName,
			getMeasurementUnit(),
			"forecast"
		);
		console.log(response);

		populateWeatherForecastInfo(response);

		loadingAnimation.classList.remove("loading");
		weatherForecast.style.visibility = "visible";
	} catch {
		console.error("Failed to resolve weather forecast");
	}
}

function searchWeatherInfo(locationName) {
	loadingAnimation.classList.add("loading");

	updateWeatherInfo(locationName);
	updateWeatherForecast(locationName);
	searchBar.value = "";
}

searchWeatherInfo("Singapore, SG");

measurementUnit.addEventListener("click", () => {
	measurementUnitCheckbox.checked = !measurementUnitCheckbox.checked;
});

clockFormat.addEventListener("click", () => {
	clockFormatCheckbox.checked = !clockFormatCheckbox.checked;
});

openSettings.addEventListener("click", () => {
	settings.classList.add("active");
});

settingsOverlay.addEventListener("click", () => {
	settings.classList.remove("active");
	searchWeatherInfo(location.textContent);
});

closeSettings.addEventListener("click", () => {
	settings.classList.remove("active");
	searchWeatherInfo(location.textContent);
});

searchButton.addEventListener("click", searchWeatherInfo);

searchBar.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		searchWeatherInfo();
	}
});

clearSearch.addEventListener("click", () => {
	searchBar.value = "";
});
