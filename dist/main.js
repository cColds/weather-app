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

		const localTime = new Date();
		const localTimeInMilliseconds = localTime.getTime();
		const localTimeOffsetInMilliseconds =
			localTime.getTimezoneOffset() * 60000;
		const utc = localTimeInMilliseconds + localTimeOffsetInMilliseconds;
		const locationTime = utc + 1000 * response.timezone;

		time.textContent = new Date(locationTime);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1VBQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMEM7O0FBRTFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQix5REFBaUI7QUFDckMsR0FBRztBQUNILG9CQUFvQixzRUFBOEI7QUFDbEQsR0FBRyxvQ0FBb0MsK0NBQU87QUFDOUMsb0JBQW9CLG9EQUFZO0FBQ2hDLEdBQUc7QUFDSCxvQkFBb0Isb0RBQVk7QUFDaEMsR0FBRztBQUNILG9CQUFvQix1REFBZTtBQUNuQyxHQUFHO0FBQ0gsb0JBQW9CLG9EQUFZO0FBQ2hDO0FBQ0E7O0FBRUEseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxnQkFBZ0IsU0FBUyxLQUFLLFNBQVMsT0FBTztBQUN0Rzs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLCtCQUErQiw4QkFBOEI7QUFDN0Qsd0NBQXdDO0FBQ3hDO0FBQ0EsSUFBSTtBQUNKLHdCQUF3QixxQkFBcUI7QUFDN0MsNEJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsY0FBYyxJQUFJLHFCQUFxQjtBQUNuRTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseURBQXlELGdCQUFnQixTQUFTLEtBQUssU0FBUyxPQUFPO0FBQ3ZHO0FBQ0E7QUFDQSxnREFBZ0Q7O0FBRWhEO0FBQ0Esa0JBQWtCLCtCQUErQjtBQUNqRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsdUNBQXVDO0FBQ3pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQix1Q0FBdUM7QUFDekQsa0RBQWtEO0FBQ2xEO0FBQ0EsMEJBQTBCO0FBQzFCOztBQUVBLGtCQUFrQixnQ0FBZ0M7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHdlYXRoZXIgZnJvbSBcIi4vd2VhdGhlckljb25zLmpzb25cIjtcblxuY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtYmFyXCIpO1xuXG4vLyBtYWluIHdlYXRoZXJcbmNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmEtbWFnbmlmeWluZy1nbGFzc1wiKTtcbmNvbnN0IGNsZWFyU2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYS14bWFya1wiKTtcbmNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2NhdGlvblwiKTtcbmNvbnN0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpbWVcIik7XG5jb25zdCBtYWluV2VhdGhlckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItaWNvblwiKTtcbmNvbnN0IHdlYXRoZXJEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci1kZXNjcmlwdGlvblwiKTtcbmNvbnN0IHRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wZXJhdHVyZVwiKTtcbmNvbnN0IGZlZWxzTGlrZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmVlbHMtbGlrZVwiKTtcbmNvbnN0IHdlYXRoZXJDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLWluZm9cIik7XG5cbi8vIG1vcmUgd2VhdGhlciBpbmZvXG5cbmNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odW1pZGl0eS12YWx1ZVwiKTtcbmNvbnN0IHdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbmQtc3BlZWQtdmFsdWVcIik7XG5jb25zdCBocGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhwYS12YWx1ZVwiKTtcblxuY29uc3Qgc3VucmlzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VucmlzZS12YWx1ZVwiKTtcbmNvbnN0IHN1bnNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3Vuc2V0LXZhbHVlXCIpO1xuY29uc3QgYXBpS2V5ID0gXCJkOTJhZTc5MzRlNWZkY2RjZDhlNDUzYThiM2JiYWRkN1wiO1xuXG4vLyBmb3JlY2FzdFxuXG5jb25zdCB3ZWF0aGVyRm9yZWNhc3REYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRheS1mb3JlY2FzdC1kYXRlXCIpO1xuY29uc3Qgd2VhdGhlckZvcmVjYXN0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuXHRcIi5kYXktZm9yZWNhc3Qtd2VhdGhlci1kZXNjcmlwdGlvblwiXG4pO1xuXG5jb25zdCB3ZWF0aGVyRm9yZWNhc3RUZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG5cdFwiLmRheS1mb3JlY2FzdC10ZW1wZXJhdHVyZVwiXG4pO1xuY29uc3Qgd2VhdGhlckZvcmVjYXN0SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIud2VhdGhlci1mb3JlY2FzdC1pY29uXCIpO1xuXG5mdW5jdGlvbiB1cGRhdGVXZWF0aGVySWNvbih3ZWF0aGVySWNvbiwgd2VhdGhlclZhbHVlKSB7XG5cdGlmICh3ZWF0aGVyVmFsdWUgPT09IFwiQ2xlYXJcIikge1xuXHRcdHdlYXRoZXJJY29uLnNyYyA9IHdlYXRoZXIuY2xlYXIuZGF5O1xuXHR9IGVsc2UgaWYgKHdlYXRoZXJWYWx1ZSA9PT0gXCJDbG91ZHNcIikge1xuXHRcdHdlYXRoZXJJY29uLnNyYyA9IHdlYXRoZXIuY2xvdWQuYnJva2VuQ2xvdWRzLmRheTtcblx0fSBlbHNlIGlmICh3ZWF0aGVyVmFsdWUgPT09IFwiUmFpblwiIHx8IHdlYXRoZXIgPT09IFwiRHJpenpsZVwiKSB7XG5cdFx0d2VhdGhlckljb24uc3JjID0gd2VhdGhlci5yYWluO1xuXHR9IGVsc2UgaWYgKHdlYXRoZXJWYWx1ZSA9PT0gXCJTbm93XCIpIHtcblx0XHR3ZWF0aGVySWNvbi5zcmMgPSB3ZWF0aGVyLnNub3c7XG5cdH0gZWxzZSBpZiAod2VhdGhlclZhbHVlID09PSBcIlRodW5kZXJzdG9ybVwiKSB7XG5cdFx0d2VhdGhlckljb24uc3JjID0gd2VhdGhlci50aHVuZGVyO1xuXHR9IGVsc2Uge1xuXHRcdHdlYXRoZXJJY29uLnNyYyA9IHdlYXRoZXIubWlzdDtcblx0fVxufVxuXG5jb25zdCB1bml0ID0gXCJpbXBlcmlhbFwiOyAvLyBzZXQgbWV0cmljIG9wdGlvbiBsYXRlclxuXG4vLyB3ZWF0aGVyIGZvcmVjYXN0XG5hc3luYyBmdW5jdGlvbiB1cGRhdGVXZWF0aGVySW5mbygpIHtcblx0dHJ5IHtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goXG5cdFx0XHRgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke3NlYXJjaEJhci52YWx1ZX0mdW5pdHM9JHt1bml0fSZhcHBpZD0ke2FwaUtleX1gXG5cdFx0KTtcblxuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cblx0XHRjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cblx0XHRjb25zdCBsb2NhbFRpbWUgPSBuZXcgRGF0ZSgpO1xuXHRcdGNvbnN0IGxvY2FsVGltZUluTWlsbGlzZWNvbmRzID0gbG9jYWxUaW1lLmdldFRpbWUoKTtcblx0XHRjb25zdCBsb2NhbFRpbWVPZmZzZXRJbk1pbGxpc2Vjb25kcyA9XG5cdFx0XHRsb2NhbFRpbWUuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwO1xuXHRcdGNvbnN0IHV0YyA9IGxvY2FsVGltZUluTWlsbGlzZWNvbmRzICsgbG9jYWxUaW1lT2Zmc2V0SW5NaWxsaXNlY29uZHM7XG5cdFx0Y29uc3QgbG9jYXRpb25UaW1lID0gdXRjICsgMTAwMCAqIHJlc3BvbnNlLnRpbWV6b25lO1xuXG5cdFx0dGltZS50ZXh0Q29udGVudCA9IG5ldyBEYXRlKGxvY2F0aW9uVGltZSk7XG5cblx0XHR1cGRhdGVXZWF0aGVySWNvbihtYWluV2VhdGhlckljb24sIHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbik7XG5cdFx0d2VhdGhlckRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gcmVzcG9uc2Uud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcblx0XHR0ZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IGAke3Jlc3BvbnNlLm1haW4udGVtcC50b0ZpeGVkKDApfcKwYDtcblx0XHRmZWVsc0xpa2UudGV4dENvbnRlbnQgPSBgZmVlbHMgbGlrZSAke3Jlc3BvbnNlLm1haW4uZmVlbHNfbGlrZS50b0ZpeGVkKFxuXHRcdFx0MFxuXHRcdCl9wrBgO1xuXHRcdHdpbmQudGV4dENvbnRlbnQgPSBgJHtyZXNwb25zZS53aW5kLnNwZWVkfSBtcGhgO1xuXHRcdGh1bWlkaXR5LnRleHRDb250ZW50ID0gYCR7cmVzcG9uc2UubWFpbi5odW1pZGl0eX0lYDtcblx0XHRocGEudGV4dENvbnRlbnQgPSByZXNwb25zZS5tYWluLnByZXNzdXJlO1xuXHRcdHN1bnJpc2UudGV4dENvbnRlbnQgPSByZXNwb25zZS5zeXMuc3VucmlzZTtcblx0XHRzdW5zZXQudGV4dENvbnRlbnQgPSByZXNwb25zZS5zeXMuc3Vuc2V0O1xuXHRcdGxvY2F0aW9uLnRleHRDb250ZW50ID0gYCR7cmVzcG9uc2UubmFtZX0sICR7cmVzcG9uc2Uuc3lzLmNvdW50cnl9YDtcblx0XHR3ZWF0aGVyQ2FyZC5jbGFzc05hbWUgPSBgd2VhdGhlci1pbmZvIHRlc3RgO1xuXHR9IGNhdGNoIHtcblx0XHRjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHJlc29sdmUgd2VhdGhlciBpbmZvXCIpO1xuXHR9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVdlYXRoZXJGb3JlY2FzdCgpIHtcblx0dHJ5IHtcblx0XHRjb25zdCB3ZWF0aGVyRm9yZWNhc3REYXRhID0gYXdhaXQgZmV0Y2goXG5cdFx0XHRgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtzZWFyY2hCYXIudmFsdWV9JnVuaXRzPSR7dW5pdH0mYXBwaWQ9JHthcGlLZXl9YFxuXHRcdCk7XG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCB3ZWF0aGVyRm9yZWNhc3REYXRhLmpzb24oKTtcblx0XHRjb25zdCBkYWlseUZvcmVjYXN0ID0gWzAsIDgsIDE2LCAyNCwgMzIsIDQwXTsgLy8gZGFpbHkgZm9yZWNhc3QgZm9yIDUgZGF5c1xuXG5cdFx0Ly8gZGF5XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB3ZWF0aGVyRm9yZWNhc3REYXkubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdHdlYXRoZXJGb3JlY2FzdERheVtpXS50ZXh0Q29udGVudCA9XG5cdFx0XHRcdHJlc3BvbnNlLmxpc3RbZGFpbHlGb3JlY2FzdFtpXV0uZHRfdHh0O1xuXHRcdH1cblxuXHRcdC8vIHdlYXRoZXIgZGVzY3JpcHRpb25cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHdlYXRoZXJGb3JlY2FzdERlc2NyaXB0aW9uLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHR3ZWF0aGVyRm9yZWNhc3REZXNjcmlwdGlvbltpXS50ZXh0Q29udGVudCA9XG5cdFx0XHRcdHJlc3BvbnNlLmxpc3RbZGFpbHlGb3JlY2FzdFtpXV0ud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcblx0XHR9XG5cblx0XHQvLyB0ZW1wZXJhdHVyZVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgd2VhdGhlckZvcmVjYXN0VGVtcGVyYXR1cmUubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdHdlYXRoZXJGb3JlY2FzdFRlbXBlcmF0dXJlW2ldLnRleHRDb250ZW50ID0gYCR7cmVzcG9uc2UubGlzdFtcblx0XHRcdFx0ZGFpbHlGb3JlY2FzdFtpXVxuXHRcdFx0XS5tYWluLnRlbXAudG9GaXhlZCgwKX3CsGA7XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB3ZWF0aGVyRm9yZWNhc3RJY29uLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHR3ZWF0aGVyRm9yZWNhc3RJY29uW2ldLnRleHRDb250ZW50ID0gdXBkYXRlV2VhdGhlckljb24oXG5cdFx0XHRcdHdlYXRoZXJGb3JlY2FzdEljb25baV0sXG5cdFx0XHRcdHJlc3BvbnNlLmxpc3RbZGFpbHlGb3JlY2FzdFtpXV0ud2VhdGhlclswXS5tYWluXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblx0fSBjYXRjaCB7XG5cdFx0Y29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZXNvbHZlIHdlYXRoZXIgZm9yZWNhc3RcIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gc2VhcmNoV2VhdGhlckluZm8oKSB7XG5cdHVwZGF0ZVdlYXRoZXJJbmZvKCk7XG5cdHVwZGF0ZVdlYXRoZXJGb3JlY2FzdCgpO1xuXHRzZWFyY2hCYXIudmFsdWUgPSBcIlwiO1xufVxuXG5zZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlYXJjaFdlYXRoZXJJbmZvKTtcblxuc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZSkgPT4ge1xuXHRpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuXHRcdHNlYXJjaFdlYXRoZXJJbmZvKCk7XG5cdH1cbn0pO1xuXG5jbGVhclNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRzZWFyY2hCYXIudmFsdWUgPSBcIlwiO1xufSk7XG5cbi8vIGRlZmF1bHQgd2VhdGhlciB0byBzaW5nYXBvcmVcbnNlYXJjaEJhci52YWx1ZSA9IFwiU2luZ2Fwb3JlXCI7XG5zZWFyY2hXZWF0aGVySW5mbygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9