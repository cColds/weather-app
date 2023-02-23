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
const weatherForecastCards = document.querySelectorAll(".day-forecast-date");
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

// Change Weather Format

const daily = document.querySelector(".daily-weather-forecast");
const hourly = document.querySelector(".hourly-weather-forecast");
const pages = document.querySelectorAll(".page");
const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
const weatherType = document.querySelector("[data-weather-type]");

function changePageDirection(direction) {
	const currentPage = document.querySelector("[data-page].selected");
	const pageIndex = +currentPage.dataset.page;
	if (
		(pageIndex === 0 && direction === 1) ||
		(pageIndex === 2 && direction === -1)
	)
		return;

	currentPage.classList.remove("selected");
	const newPageToSelect = document.querySelector(
		`[data-page='${pageIndex - direction}']`
	);
	newPageToSelect.classList.add("selected");
}

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

function getSystemOfMeasurement() {
	return measurementUnitCheckbox.checked ? "metric" : "imperial";
}

function getMeasurementSystem() {
	return measurementUnitCheckbox.checked;
}

function getTemperatureSystem() {
	return measurementUnitCheckbox.checked ? "C" : "F";
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

function formatClockWeatherType() {
	const isDailySelected = document
		.querySelector(".daily-weather-forecast")
		.className.includes("selected");
	if (isDailySelected) {
		return "EEEE";
	}
	if (clockFormatCheckbox.checked) {
		return "H:mm";
	}

	return "h:mm a";
}

function getWeatherForecastPageByHour(page) {
	if (page === 0) return [0, 1, 2, 3, 4, 5];
	if (page === 1) return [6, 7, 8, 9, 10];

	return [11, 12, 13, 14, 15];
}

function populateWeatherInfo(response) {
	const systemOfMeasurement = getMeasurementSystem();
	const unitPerHour = systemOfMeasurement ? "km/h" : "mph";
	const unit = systemOfMeasurement ? "km" : "mi";

	time.textContent = formatTime(response);

	updateWeatherIcon(mainWeatherIcon, response.weather[0].main);
	weatherDescription.textContent = response.weather[0].description;
	temperature.textContent = `${response.main.temp.toFixed(
		0
	)} ${getTemperatureSystem()}°`;
	feelsLike.textContent = `feels like ${response.main.feels_like.toFixed(
		0
	)} ${getTemperatureSystem()}°`;
	wind.textContent = `${response.wind.speed} ${unitPerHour}`;
	humidity.textContent = `${response.main.humidity}%`;
	hpa.textContent = response.main.pressure;
	visibility.textContent = `${(response.visibility / 1609).toFixed(
		2
	)} ${unit}`;
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

function populateWeatherForecastInfo(response, weatherForecastList) {
	for (let i = 0; i < weatherForecastCards.length; i += 1) {
		weatherForecastCards[i].textContent = format(
			new Date(response.list[weatherForecastList[i]].dt_txt),
			formatClockWeatherType()
		);
	}

	for (let i = 0; i < weatherForecastDescription.length; i += 1) {
		weatherForecastDescription[i].textContent =
			response.list[weatherForecastList[i]].weather[0].description;
	}

	for (let i = 0; i < weatherForecastTemperature.length; i += 1) {
		weatherForecastTemperature[i].textContent = `${response.list[
			weatherForecastList[i]
		].main.temp.toFixed(0)} ${getTemperatureSystem()}°`;
	}

	for (let i = 0; i < weatherForecastIcon.length; i += 1) {
		weatherForecastIcon[i].textContent = updateWeatherIcon(
			weatherForecastIcon[i],
			response.list[weatherForecastList[i]].weather[0].main
		);
	}
}

async function updateWeatherInfo(locationName, weatherForecastType) {
	try {
		const response = await getWeatherInfo(
			locationName,
			getSystemOfMeasurement(),
			"weather"
		);

		searchErrorText.style.visibility = "hidden";
		populateWeatherInfo(response, weatherForecastType);

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
			getSystemOfMeasurement(),
			"forecast"
		);
		console.log(response);
		const dailyForecastDays = [0, 8, 16, 24, 32, 40];
		const currentPage = document.querySelector("[data-page].selected");
		const pageIndex = +currentPage.dataset.page;

		let weatherForecastList;
		console.log(daily.className.includes("selected"));
		if (daily.className.includes("selected")) {
			weatherForecastList = dailyForecastDays;
		} else {
			weatherForecastList = getWeatherForecastPageByHour(pageIndex);
		}

		populateWeatherForecastInfo(response, weatherForecastList);

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

searchButton.addEventListener("click", () =>
	searchWeatherInfo(searchBar.value)
);

searchBar.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		searchWeatherInfo(searchBar.value);
	}
});

clearSearch.addEventListener("click", () => {
	searchBar.value = "";
});

pages.forEach((page) => {
	page.addEventListener("click", () => {
		document.querySelector(".page.selected").classList.remove("selected");
		page.classList.add("selected");
		updateWeatherForecast(location.textContent);
	});
});

daily.addEventListener("click", () => {
	if (daily.className.includes("selected")) {
		return;
	}
	hourly.classList.remove("selected");
	daily.classList.add("selected");
	weatherType.dataset.weatherType = "daily";
	updateWeatherForecast(location.textContent);
});

hourly.addEventListener("click", () => {
	if (hourly.className.includes("selected")) {
		return;
	}
	daily.classList.remove("selected");
	hourly.classList.add("selected");
	weatherType.dataset.weatherType = "hourly";

	updateWeatherForecast(location.textContent);
});

leftArrow.addEventListener("click", () => {
	changePageDirection(1);

	updateWeatherForecast(location.textContent);
});

rightArrow.addEventListener("click", () => {
	changePageDirection(-1);

	updateWeatherForecast(location.textContent);
});
