/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/weatherIcons.json":
/*!*******************************!*\
  !*** ./src/weatherIcons.json ***!
  \*******************************/
/***/ ((module) => {

module.exports = JSON.parse('{"clear":{"day":"https://worldweather.wmo.int/images/24a.png","night":"https://worldweather.wmo.int/images/24b.png"},"cloud":{"fewClouds":{"day":"https://worldweather.wmo.int/images/22a.png","night":"https://worldweather.wmo.int/images/22b.png"},"scatteredClouds":{"day":"https://worldweather.wmo.int/images/21a.png","night":"https://worldweather.wmo.int/images/21b.png"},"brokenClouds":{"day":"https://worldweather.wmo.int/images/23a.png","night":"https://worldweather.wmo.int/images/23b.png"},"overcast":"https://worldweather.wmo.int/images/20.png"},"thunder":"https://worldweather.wmo.int/images/2.png","rain":"https://worldweather.wmo.int/images/14.png","snow":"https://worldweather.wmo.int/images/7.png","mist":"https://worldweather.wmo.int/images/17.png","drizzle":"https://worldweather.wmo.int/images/14.png"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weatherIcons_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weatherIcons.json */ "./src/weatherIcons.json");


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
const weatherCard = document.querySelector(".weather-info");

// more weather info

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
		weatherIcon.src = _weatherIcons_json__WEBPACK_IMPORTED_MODULE_0__.clear.day;
	} else if (weatherValue === "Clouds") {
		weatherIcon.src = _weatherIcons_json__WEBPACK_IMPORTED_MODULE_0__.cloud.brokenClouds.day;
	} else if (weatherValue === "Rain" || _weatherIcons_json__WEBPACK_IMPORTED_MODULE_0__ === "Drizzle") {
		weatherIcon.src = _weatherIcons_json__WEBPACK_IMPORTED_MODULE_0__.rain;
	} else if (weatherValue === "Snow") {
		weatherIcon.src = _weatherIcons_json__WEBPACK_IMPORTED_MODULE_0__.snow;
	} else if (weatherValue === "Thunderstorm") {
		weatherIcon.src = _weatherIcons_json__WEBPACK_IMPORTED_MODULE_0__.thunder;
	} else {
		weatherIcon.src = _weatherIcons_json__WEBPACK_IMPORTED_MODULE_0__.mist;
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
		temperature.textContent = `${response.main.temp.toFixed(0)}°`;
		feelsLike.textContent = `feels like ${response.main.feels_like.toFixed(
			0
		)}°`;
		wind.textContent = `${response.wind.speed} mph`;
		humidity.textContent = `${response.main.humidity}%`;
		hpa.textContent = response.main.pressure;
		sunrise.textContent = response.sys.sunrise;
		sunset.textContent = response.sys.sunset;
		location.textContent = `${response.name}, ${response.sys.country}`;
		weatherCard.className = `weather-info test`;
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

clearSearch.addEventListener("click", () => {
	searchBar.value = "";
});

// default weather to singapore
searchBar.value = "Singapore";
searchWeatherInfo();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1VBQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMEM7O0FBRTFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQix5REFBaUI7QUFDckMsR0FBRztBQUNILG9CQUFvQixzRUFBOEI7QUFDbEQsR0FBRyxvQ0FBb0MsK0NBQU87QUFDOUMsb0JBQW9CLG9EQUFZO0FBQ2hDLEdBQUc7QUFDSCxvQkFBb0Isb0RBQVk7QUFDaEMsR0FBRztBQUNILG9CQUFvQix1REFBZTtBQUNuQyxHQUFHO0FBQ0gsb0JBQW9CLG9EQUFZO0FBQ2hDO0FBQ0E7O0FBRUEseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxnQkFBZ0IsU0FBUyxLQUFLLFNBQVMsT0FBTztBQUN0Rzs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsK0JBQStCLDhCQUE4QjtBQUM3RCx3Q0FBd0M7QUFDeEM7QUFDQSxJQUFJO0FBQ0osd0JBQXdCLHFCQUFxQjtBQUM3Qyw0QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixjQUFjLElBQUkscUJBQXFCO0FBQ25FO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsZ0JBQWdCLFNBQVMsS0FBSyxTQUFTLE9BQU87QUFDdkc7QUFDQTtBQUNBLGdEQUFnRDs7QUFFaEQ7QUFDQSxrQkFBa0IsK0JBQStCO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQix1Q0FBdUM7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLHVDQUF1QztBQUN6RCxrREFBa0Q7QUFDbEQ7QUFDQSwwQkFBMEI7QUFDMUI7O0FBRUEsa0JBQWtCLGdDQUFnQztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgd2VhdGhlciBmcm9tIFwiLi93ZWF0aGVySWNvbnMuanNvblwiO1xuXG5jb25zdCBzZWFyY2hCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1iYXJcIik7XG5cbi8vIG1haW4gd2VhdGhlclxuY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYS1tYWduaWZ5aW5nLWdsYXNzXCIpO1xuY29uc3QgY2xlYXJTZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhLXhtYXJrXCIpO1xuY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvY2F0aW9uXCIpO1xuY29uc3QgdGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGltZVwiKTtcbmNvbnN0IG1haW5XZWF0aGVySWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci1pY29uXCIpO1xuY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLWRlc2NyaXB0aW9uXCIpO1xuY29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBlcmF0dXJlXCIpO1xuY29uc3QgZmVlbHNMaWtlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mZWVscy1saWtlXCIpO1xuY29uc3Qgd2VhdGhlckNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItaW5mb1wiKTtcblxuLy8gbW9yZSB3ZWF0aGVyIGluZm9cblxuY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmh1bWlkaXR5LXZhbHVlXCIpO1xuY29uc3Qgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2luZC1zcGVlZC12YWx1ZVwiKTtcbmNvbnN0IGhwYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHBhLXZhbHVlXCIpO1xuXG5jb25zdCBzdW5yaXNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdW5yaXNlLXZhbHVlXCIpO1xuY29uc3Qgc3Vuc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdW5zZXQtdmFsdWVcIik7XG5jb25zdCBhcGlLZXkgPSBcImQ5MmFlNzkzNGU1ZmRjZGNkOGU0NTNhOGIzYmJhZGQ3XCI7XG5cbi8vIGZvcmVjYXN0XG5cbmNvbnN0IHdlYXRoZXJGb3JlY2FzdERheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGF5LWZvcmVjYXN0LWRhdGVcIik7XG5jb25zdCB3ZWF0aGVyRm9yZWNhc3REZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG5cdFwiLmRheS1mb3JlY2FzdC13ZWF0aGVyLWRlc2NyaXB0aW9uXCJcbik7XG5cbmNvbnN0IHdlYXRoZXJGb3JlY2FzdFRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcblx0XCIuZGF5LWZvcmVjYXN0LXRlbXBlcmF0dXJlXCJcbik7XG5jb25zdCB3ZWF0aGVyRm9yZWNhc3RJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi53ZWF0aGVyLWZvcmVjYXN0LWljb25cIik7XG5cbmZ1bmN0aW9uIHVwZGF0ZVdlYXRoZXJJY29uKHdlYXRoZXJJY29uLCB3ZWF0aGVyVmFsdWUpIHtcblx0aWYgKHdlYXRoZXJWYWx1ZSA9PT0gXCJDbGVhclwiKSB7XG5cdFx0d2VhdGhlckljb24uc3JjID0gd2VhdGhlci5jbGVhci5kYXk7XG5cdH0gZWxzZSBpZiAod2VhdGhlclZhbHVlID09PSBcIkNsb3Vkc1wiKSB7XG5cdFx0d2VhdGhlckljb24uc3JjID0gd2VhdGhlci5jbG91ZC5icm9rZW5DbG91ZHMuZGF5O1xuXHR9IGVsc2UgaWYgKHdlYXRoZXJWYWx1ZSA9PT0gXCJSYWluXCIgfHwgd2VhdGhlciA9PT0gXCJEcml6emxlXCIpIHtcblx0XHR3ZWF0aGVySWNvbi5zcmMgPSB3ZWF0aGVyLnJhaW47XG5cdH0gZWxzZSBpZiAod2VhdGhlclZhbHVlID09PSBcIlNub3dcIikge1xuXHRcdHdlYXRoZXJJY29uLnNyYyA9IHdlYXRoZXIuc25vdztcblx0fSBlbHNlIGlmICh3ZWF0aGVyVmFsdWUgPT09IFwiVGh1bmRlcnN0b3JtXCIpIHtcblx0XHR3ZWF0aGVySWNvbi5zcmMgPSB3ZWF0aGVyLnRodW5kZXI7XG5cdH0gZWxzZSB7XG5cdFx0d2VhdGhlckljb24uc3JjID0gd2VhdGhlci5taXN0O1xuXHR9XG59XG5cbmNvbnN0IHVuaXQgPSBcImltcGVyaWFsXCI7IC8vIHNldCBtZXRyaWMgb3B0aW9uIGxhdGVyXG5cbi8vIHdlYXRoZXIgZm9yZWNhc3RcbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVdlYXRoZXJJbmZvKCkge1xuXHR0cnkge1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChcblx0XHRcdGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7c2VhcmNoQmFyLnZhbHVlfSZ1bml0cz0ke3VuaXR9JmFwcGlkPSR7YXBpS2V5fWBcblx0XHQpO1xuXG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkYXRhLmpzb24oKTtcblxuXHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuXHRcdHVwZGF0ZVdlYXRoZXJJY29uKG1haW5XZWF0aGVySWNvbiwgcmVzcG9uc2Uud2VhdGhlclswXS5tYWluKTtcblx0XHR3ZWF0aGVyRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSByZXNwb25zZS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuXHRcdHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gYCR7cmVzcG9uc2UubWFpbi50ZW1wLnRvRml4ZWQoMCl9wrBgO1xuXHRcdGZlZWxzTGlrZS50ZXh0Q29udGVudCA9IGBmZWVscyBsaWtlICR7cmVzcG9uc2UubWFpbi5mZWVsc19saWtlLnRvRml4ZWQoXG5cdFx0XHQwXG5cdFx0KX3CsGA7XG5cdFx0d2luZC50ZXh0Q29udGVudCA9IGAke3Jlc3BvbnNlLndpbmQuc3BlZWR9IG1waGA7XG5cdFx0aHVtaWRpdHkudGV4dENvbnRlbnQgPSBgJHtyZXNwb25zZS5tYWluLmh1bWlkaXR5fSVgO1xuXHRcdGhwYS50ZXh0Q29udGVudCA9IHJlc3BvbnNlLm1haW4ucHJlc3N1cmU7XG5cdFx0c3VucmlzZS50ZXh0Q29udGVudCA9IHJlc3BvbnNlLnN5cy5zdW5yaXNlO1xuXHRcdHN1bnNldC50ZXh0Q29udGVudCA9IHJlc3BvbnNlLnN5cy5zdW5zZXQ7XG5cdFx0bG9jYXRpb24udGV4dENvbnRlbnQgPSBgJHtyZXNwb25zZS5uYW1lfSwgJHtyZXNwb25zZS5zeXMuY291bnRyeX1gO1xuXHRcdHdlYXRoZXJDYXJkLmNsYXNzTmFtZSA9IGB3ZWF0aGVyLWluZm8gdGVzdGA7XG5cdH0gY2F0Y2gge1xuXHRcdGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcmVzb2x2ZSB3ZWF0aGVyIGluZm9cIik7XG5cdH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlV2VhdGhlckZvcmVjYXN0KCkge1xuXHR0cnkge1xuXHRcdGNvbnN0IHdlYXRoZXJGb3JlY2FzdERhdGEgPSBhd2FpdCBmZXRjaChcblx0XHRcdGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke3NlYXJjaEJhci52YWx1ZX0mdW5pdHM9JHt1bml0fSZhcHBpZD0ke2FwaUtleX1gXG5cdFx0KTtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IHdlYXRoZXJGb3JlY2FzdERhdGEuanNvbigpO1xuXHRcdGNvbnN0IGRhaWx5Rm9yZWNhc3QgPSBbMCwgOCwgMTYsIDI0LCAzMiwgNDBdOyAvLyBkYWlseSBmb3JlY2FzdCBmb3IgNSBkYXlzXG5cblx0XHQvLyBkYXlcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHdlYXRoZXJGb3JlY2FzdERheS5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0d2VhdGhlckZvcmVjYXN0RGF5W2ldLnRleHRDb250ZW50ID1cblx0XHRcdFx0cmVzcG9uc2UubGlzdFtkYWlseUZvcmVjYXN0W2ldXS5kdF90eHQ7XG5cdFx0fVxuXG5cdFx0Ly8gd2VhdGhlciBkZXNjcmlwdGlvblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgd2VhdGhlckZvcmVjYXN0RGVzY3JpcHRpb24ubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdHdlYXRoZXJGb3JlY2FzdERlc2NyaXB0aW9uW2ldLnRleHRDb250ZW50ID1cblx0XHRcdFx0cmVzcG9uc2UubGlzdFtkYWlseUZvcmVjYXN0W2ldXS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuXHRcdH1cblxuXHRcdC8vIHRlbXBlcmF0dXJlXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB3ZWF0aGVyRm9yZWNhc3RUZW1wZXJhdHVyZS5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0d2VhdGhlckZvcmVjYXN0VGVtcGVyYXR1cmVbaV0udGV4dENvbnRlbnQgPSBgJHtyZXNwb25zZS5saXN0W1xuXHRcdFx0XHRkYWlseUZvcmVjYXN0W2ldXG5cdFx0XHRdLm1haW4udGVtcC50b0ZpeGVkKDApfcKwYDtcblx0XHR9XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHdlYXRoZXJGb3JlY2FzdEljb24ubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdHdlYXRoZXJGb3JlY2FzdEljb25baV0udGV4dENvbnRlbnQgPSB1cGRhdGVXZWF0aGVySWNvbihcblx0XHRcdFx0d2VhdGhlckZvcmVjYXN0SWNvbltpXSxcblx0XHRcdFx0cmVzcG9uc2UubGlzdFtkYWlseUZvcmVjYXN0W2ldXS53ZWF0aGVyWzBdLm1haW5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc29sZS5sb2cocmVzcG9uc2UpO1xuXHR9IGNhdGNoIHtcblx0XHRjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHJlc29sdmUgd2VhdGhlciBmb3JlY2FzdFwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiBzZWFyY2hXZWF0aGVySW5mbygpIHtcblx0dXBkYXRlV2VhdGhlckluZm8oKTtcblx0dXBkYXRlV2VhdGhlckZvcmVjYXN0KCk7XG5cdHNlYXJjaEJhci52YWx1ZSA9IFwiXCI7XG59XG5cbnNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VhcmNoV2VhdGhlckluZm8pO1xuXG5zZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG5cdGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG5cdFx0c2VhcmNoV2VhdGhlckluZm8oKTtcblx0fVxufSk7XG5cbmNsZWFyU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdHNlYXJjaEJhci52YWx1ZSA9IFwiXCI7XG59KTtcblxuLy8gZGVmYXVsdCB3ZWF0aGVyIHRvIHNpbmdhcG9yZVxuc2VhcmNoQmFyLnZhbHVlID0gXCJTaW5nYXBvcmVcIjtcbnNlYXJjaFdlYXRoZXJJbmZvKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=