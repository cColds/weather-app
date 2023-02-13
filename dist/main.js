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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1VBQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMEM7O0FBRTFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLHlEQUFpQjtBQUNyQyxHQUFHO0FBQ0gsb0JBQW9CLHNFQUE4QjtBQUNsRCxHQUFHLG9DQUFvQywrQ0FBTztBQUM5QyxvQkFBb0Isb0RBQVk7QUFDaEMsR0FBRztBQUNILG9CQUFvQixvREFBWTtBQUNoQyxHQUFHO0FBQ0gsb0JBQW9CLHVEQUFlO0FBQ25DLEdBQUc7QUFDSCxvQkFBb0Isb0RBQVk7QUFDaEM7QUFDQTs7QUFFQSx5QkFBeUI7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELGdCQUFnQixTQUFTLEtBQUssU0FBUyxPQUFPO0FBQ3RHOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQSxJQUFJO0FBQ0osd0JBQXdCLHFCQUFxQjtBQUM3Qyw0QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixjQUFjLElBQUkscUJBQXFCO0FBQ25FLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseURBQXlELGdCQUFnQixTQUFTLEtBQUssU0FBUyxPQUFPO0FBQ3ZHO0FBQ0E7QUFDQSxnREFBZ0Q7O0FBRWhEO0FBQ0Esa0JBQWtCLCtCQUErQjtBQUNqRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsdUNBQXVDO0FBQ3pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQix1Q0FBdUM7QUFDekQsa0RBQWtEO0FBQ2xEO0FBQ0EsMEJBQTBCO0FBQzFCOztBQUVBLGtCQUFrQixnQ0FBZ0M7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHdlYXRoZXIgZnJvbSBcIi4vd2VhdGhlckljb25zLmpzb25cIjtcblxuY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtYmFyXCIpO1xuXG4vLyBtYWluIHdlYXRoZXJcbmNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmEtbWFnbmlmeWluZy1nbGFzc1wiKTtcbmNvbnN0IGNsZWFyU2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYS14bWFya1wiKTtcbmNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2NhdGlvblwiKTtcbmNvbnN0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpbWVcIik7XG5jb25zdCBtYWluV2VhdGhlckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItaWNvblwiKTtcbmNvbnN0IHdlYXRoZXJEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci1kZXNjcmlwdGlvblwiKTtcbmNvbnN0IHRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wZXJhdHVyZVwiKTtcbmNvbnN0IGZlZWxzTGlrZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmVlbHMtbGlrZVwiKTtcblxuLy8gbW9yZSB3ZWF0aGVyIGluZm9cbi8vIGNvbnN0IGFpclF1YWxpdHlJbmRleCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyLXF1YWxpdHktaW5kZXgtdmFsdWVcIik7XG4vLyBjb25zdCBwcmVjaXBpdGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVjaXBpdGF0aW9uLXZhbHVlXCIpO1xuXG5jb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHVtaWRpdHktdmFsdWVcIik7XG5jb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5kLXNwZWVkLXZhbHVlXCIpO1xuY29uc3QgaHBhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ocGEtdmFsdWVcIik7XG5cbmNvbnN0IHN1bnJpc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnJpc2UtdmFsdWVcIik7XG5jb25zdCBzdW5zZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnNldC12YWx1ZVwiKTtcbmNvbnN0IGFwaUtleSA9IFwiZDkyYWU3OTM0ZTVmZGNkY2Q4ZTQ1M2E4YjNiYmFkZDdcIjtcblxuLy8gZm9yZWNhc3RcblxuY29uc3Qgd2VhdGhlckZvcmVjYXN0RGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kYXktZm9yZWNhc3QtZGF0ZVwiKTtcbmNvbnN0IHdlYXRoZXJGb3JlY2FzdERlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcblx0XCIuZGF5LWZvcmVjYXN0LXdlYXRoZXItZGVzY3JpcHRpb25cIlxuKTtcblxuY29uc3Qgd2VhdGhlckZvcmVjYXN0VGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuXHRcIi5kYXktZm9yZWNhc3QtdGVtcGVyYXR1cmVcIlxuKTtcbmNvbnN0IHdlYXRoZXJGb3JlY2FzdEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLndlYXRoZXItZm9yZWNhc3QtaWNvblwiKTtcblxuZnVuY3Rpb24gdXBkYXRlV2VhdGhlckljb24od2VhdGhlckljb24sIHdlYXRoZXJWYWx1ZSkge1xuXHRpZiAod2VhdGhlclZhbHVlID09PSBcIkNsZWFyXCIpIHtcblx0XHR3ZWF0aGVySWNvbi5zcmMgPSB3ZWF0aGVyLmNsZWFyLmRheTtcblx0fSBlbHNlIGlmICh3ZWF0aGVyVmFsdWUgPT09IFwiQ2xvdWRzXCIpIHtcblx0XHR3ZWF0aGVySWNvbi5zcmMgPSB3ZWF0aGVyLmNsb3VkLmJyb2tlbkNsb3Vkcy5kYXk7XG5cdH0gZWxzZSBpZiAod2VhdGhlclZhbHVlID09PSBcIlJhaW5cIiB8fCB3ZWF0aGVyID09PSBcIkRyaXp6bGVcIikge1xuXHRcdHdlYXRoZXJJY29uLnNyYyA9IHdlYXRoZXIucmFpbjtcblx0fSBlbHNlIGlmICh3ZWF0aGVyVmFsdWUgPT09IFwiU25vd1wiKSB7XG5cdFx0d2VhdGhlckljb24uc3JjID0gd2VhdGhlci5zbm93O1xuXHR9IGVsc2UgaWYgKHdlYXRoZXJWYWx1ZSA9PT0gXCJUaHVuZGVyc3Rvcm1cIikge1xuXHRcdHdlYXRoZXJJY29uLnNyYyA9IHdlYXRoZXIudGh1bmRlcjtcblx0fSBlbHNlIHtcblx0XHR3ZWF0aGVySWNvbi5zcmMgPSB3ZWF0aGVyLm1pc3Q7XG5cdH1cbn1cblxuY29uc3QgdW5pdCA9IFwiaW1wZXJpYWxcIjsgLy8gc2V0IG1ldHJpYyBvcHRpb24gbGF0ZXJcblxuLy8gd2VhdGhlciBmb3JlY2FzdFxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlV2VhdGhlckluZm8oKSB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKFxuXHRcdFx0YGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtzZWFyY2hCYXIudmFsdWV9JnVuaXRzPSR7dW5pdH0mYXBwaWQ9JHthcGlLZXl9YFxuXHRcdCk7XG5cblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblx0XHR1cGRhdGVXZWF0aGVySWNvbihtYWluV2VhdGhlckljb24sIHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbik7XG5cdFx0d2VhdGhlckRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gcmVzcG9uc2Uud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcblx0XHR0ZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IHJlc3BvbnNlLm1haW4udGVtcC50b0ZpeGVkKDApO1xuXHRcdGZlZWxzTGlrZS50ZXh0Q29udGVudCA9IGBmZWVscyBsaWtlICR7cmVzcG9uc2UubWFpbi5mZWVsc19saWtlLnRvRml4ZWQoXG5cdFx0XHQwXG5cdFx0KX3CsGA7XG5cdFx0d2luZC50ZXh0Q29udGVudCA9IGAke3Jlc3BvbnNlLndpbmQuc3BlZWR9IG1waGA7XG5cdFx0aHVtaWRpdHkudGV4dENvbnRlbnQgPSBgJHtyZXNwb25zZS5tYWluLmh1bWlkaXR5fSVgO1xuXHRcdGhwYS50ZXh0Q29udGVudCA9IHJlc3BvbnNlLm1haW4ucHJlc3N1cmU7XG5cdFx0c3VucmlzZS50ZXh0Q29udGVudCA9IHJlc3BvbnNlLnN5cy5zdW5yaXNlO1xuXHRcdHN1bnNldC50ZXh0Q29udGVudCA9IHJlc3BvbnNlLnN5cy5zdW5zZXQ7XG5cdFx0bG9jYXRpb24udGV4dENvbnRlbnQgPSBgJHtyZXNwb25zZS5uYW1lfSwgJHtyZXNwb25zZS5zeXMuY291bnRyeX1gO1xuXHR9IGNhdGNoIHtcblx0XHRjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHJlc29sdmUgd2VhdGhlciBpbmZvXCIpO1xuXHR9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVdlYXRoZXJGb3JlY2FzdCgpIHtcblx0dHJ5IHtcblx0XHRjb25zdCB3ZWF0aGVyRm9yZWNhc3REYXRhID0gYXdhaXQgZmV0Y2goXG5cdFx0XHRgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtzZWFyY2hCYXIudmFsdWV9JnVuaXRzPSR7dW5pdH0mYXBwaWQ9JHthcGlLZXl9YFxuXHRcdCk7XG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCB3ZWF0aGVyRm9yZWNhc3REYXRhLmpzb24oKTtcblx0XHRjb25zdCBkYWlseUZvcmVjYXN0ID0gWzAsIDgsIDE2LCAyNCwgMzIsIDQwXTsgLy8gZGFpbHkgZm9yZWNhc3QgZm9yIDUgZGF5c1xuXG5cdFx0Ly8gZGF5XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB3ZWF0aGVyRm9yZWNhc3REYXkubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdHdlYXRoZXJGb3JlY2FzdERheVtpXS50ZXh0Q29udGVudCA9XG5cdFx0XHRcdHJlc3BvbnNlLmxpc3RbZGFpbHlGb3JlY2FzdFtpXV0uZHRfdHh0O1xuXHRcdH1cblxuXHRcdC8vIHdlYXRoZXIgZGVzY3JpcHRpb25cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHdlYXRoZXJGb3JlY2FzdERlc2NyaXB0aW9uLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHR3ZWF0aGVyRm9yZWNhc3REZXNjcmlwdGlvbltpXS50ZXh0Q29udGVudCA9XG5cdFx0XHRcdHJlc3BvbnNlLmxpc3RbZGFpbHlGb3JlY2FzdFtpXV0ud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcblx0XHR9XG5cblx0XHQvLyB0ZW1wZXJhdHVyZVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgd2VhdGhlckZvcmVjYXN0VGVtcGVyYXR1cmUubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdHdlYXRoZXJGb3JlY2FzdFRlbXBlcmF0dXJlW2ldLnRleHRDb250ZW50ID0gYCR7cmVzcG9uc2UubGlzdFtcblx0XHRcdFx0ZGFpbHlGb3JlY2FzdFtpXVxuXHRcdFx0XS5tYWluLnRlbXAudG9GaXhlZCgwKX3CsGA7XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB3ZWF0aGVyRm9yZWNhc3RJY29uLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHR3ZWF0aGVyRm9yZWNhc3RJY29uW2ldLnRleHRDb250ZW50ID0gdXBkYXRlV2VhdGhlckljb24oXG5cdFx0XHRcdHdlYXRoZXJGb3JlY2FzdEljb25baV0sXG5cdFx0XHRcdHJlc3BvbnNlLmxpc3RbZGFpbHlGb3JlY2FzdFtpXV0ud2VhdGhlclswXS5tYWluXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblx0fSBjYXRjaCB7XG5cdFx0Y29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZXNvbHZlIHdlYXRoZXIgZm9yZWNhc3RcIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gc2VhcmNoV2VhdGhlckluZm8oKSB7XG5cdHVwZGF0ZVdlYXRoZXJJbmZvKCk7XG5cdHVwZGF0ZVdlYXRoZXJGb3JlY2FzdCgpO1xuXHRzZWFyY2hCYXIudmFsdWUgPSBcIlwiO1xufVxuXG5zZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlYXJjaFdlYXRoZXJJbmZvKTtcblxuc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZSkgPT4ge1xuXHRpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuXHRcdHNlYXJjaFdlYXRoZXJJbmZvKCk7XG5cdH1cbn0pO1xuXG4vLyBkZWZhdWx0IHdlYXRoZXIgdG8gc2luZ2Fwb3JlXG5zZWFyY2hCYXIudmFsdWUgPSBcIlNpbmdhcG9yZVwiO1xuc2VhcmNoV2VhdGhlckluZm8oKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==