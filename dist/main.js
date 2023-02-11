/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const searchBar = document.querySelector(".search-bar");

// main weather
const search = document.querySelector(".fa-magnifying-glass");
const clearSearch = document.querySelector(".fa-xmark");
const location = document.querySelector(".location");
const time = document.querySelector(".time");
const cloud = document.querySelector(".cloud");
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

// weather forecast
async function updateWeatherInfo() {
	try {
		const searchBarLocation = searchBar.value;
		const unit = "imperial"; // set metric option later

		const data = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${searchBarLocation}&units=${unit}&appid=${apiKey}`
		);

		const response = await data.json();

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
		console.log(response);
	} catch {
		console.log("no lol");
	}
}

function searchWeatherInfo() {
	updateWeatherInfo();
	searchBar.value = "";
}

search.addEventListener("click", searchWeatherInfo);

searchBar.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		searchWeatherInfo();
	}
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjs7QUFFM0I7QUFDQSx3REFBd0Qsa0JBQWtCLFNBQVMsS0FBSyxTQUFTLE9BQU87QUFDeEc7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBLElBQUk7QUFDSix3QkFBd0IscUJBQXFCO0FBQzdDLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWJhclwiKTtcblxuLy8gbWFpbiB3ZWF0aGVyXG5jb25zdCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhLW1hZ25pZnlpbmctZ2xhc3NcIik7XG5jb25zdCBjbGVhclNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmEteG1hcmtcIik7XG5jb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9jYXRpb25cIik7XG5jb25zdCB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aW1lXCIpO1xuY29uc3QgY2xvdWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNsb3VkXCIpO1xuY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLWRlc2NyaXB0aW9uXCIpO1xuY29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBlcmF0dXJlXCIpO1xuY29uc3QgZmVlbHNMaWtlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mZWVscy1saWtlXCIpO1xuXG4vLyBtb3JlIHdlYXRoZXIgaW5mb1xuLy8gY29uc3QgYWlyUXVhbGl0eUluZGV4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5haXItcXVhbGl0eS1pbmRleC12YWx1ZVwiKTtcbi8vIGNvbnN0IHByZWNpcGl0YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWNpcGl0YXRpb24tdmFsdWVcIik7XG5cbmNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odW1pZGl0eS12YWx1ZVwiKTtcbmNvbnN0IHdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbmQtc3BlZWQtdmFsdWVcIik7XG5jb25zdCBocGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhwYS12YWx1ZVwiKTtcblxuY29uc3Qgc3VucmlzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VucmlzZS12YWx1ZVwiKTtcbmNvbnN0IHN1bnNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3Vuc2V0LXZhbHVlXCIpO1xuY29uc3QgYXBpS2V5ID0gXCJkOTJhZTc5MzRlNWZkY2RjZDhlNDUzYThiM2JiYWRkN1wiO1xuXG4vLyB3ZWF0aGVyIGZvcmVjYXN0XG5hc3luYyBmdW5jdGlvbiB1cGRhdGVXZWF0aGVySW5mbygpIHtcblx0dHJ5IHtcblx0XHRjb25zdCBzZWFyY2hCYXJMb2NhdGlvbiA9IHNlYXJjaEJhci52YWx1ZTtcblx0XHRjb25zdCB1bml0ID0gXCJpbXBlcmlhbFwiOyAvLyBzZXQgbWV0cmljIG9wdGlvbiBsYXRlclxuXG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKFxuXHRcdFx0YGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtzZWFyY2hCYXJMb2NhdGlvbn0mdW5pdHM9JHt1bml0fSZhcHBpZD0ke2FwaUtleX1gXG5cdFx0KTtcblxuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cblx0XHR3ZWF0aGVyRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSByZXNwb25zZS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuXHRcdHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gcmVzcG9uc2UubWFpbi50ZW1wLnRvRml4ZWQoMCk7XG5cdFx0ZmVlbHNMaWtlLnRleHRDb250ZW50ID0gYGZlZWxzIGxpa2UgJHtyZXNwb25zZS5tYWluLmZlZWxzX2xpa2UudG9GaXhlZChcblx0XHRcdDBcblx0XHQpfcKwYDtcblx0XHR3aW5kLnRleHRDb250ZW50ID0gYCR7cmVzcG9uc2Uud2luZC5zcGVlZH0gbXBoYDtcblx0XHRodW1pZGl0eS50ZXh0Q29udGVudCA9IGAke3Jlc3BvbnNlLm1haW4uaHVtaWRpdHl9JWA7XG5cdFx0aHBhLnRleHRDb250ZW50ID0gcmVzcG9uc2UubWFpbi5wcmVzc3VyZTtcblx0XHRzdW5yaXNlLnRleHRDb250ZW50ID0gcmVzcG9uc2Uuc3lzLnN1bnJpc2U7XG5cdFx0c3Vuc2V0LnRleHRDb250ZW50ID0gcmVzcG9uc2Uuc3lzLnN1bnNldDtcblx0XHRjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cdH0gY2F0Y2gge1xuXHRcdGNvbnNvbGUubG9nKFwibm8gbG9sXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHNlYXJjaFdlYXRoZXJJbmZvKCkge1xuXHR1cGRhdGVXZWF0aGVySW5mbygpO1xuXHRzZWFyY2hCYXIudmFsdWUgPSBcIlwiO1xufVxuXG5zZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlYXJjaFdlYXRoZXJJbmZvKTtcblxuc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZSkgPT4ge1xuXHRpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuXHRcdHNlYXJjaFdlYXRoZXJJbmZvKCk7XG5cdH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9