/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weatherIcons_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weatherIcons.json */ "./src/weatherIcons.json");
/* harmony import */ var _weatherData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weatherData */ "./src/weatherData.js");




// Search

const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".fa-magnifying-glass");
const clearSearch = document.querySelector(".fa-xmark");

// Weather

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
const sunrise = document.querySelector(".sunrise-value");
const sunset = document.querySelector(".sunset-value");

// Weather Forecast

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

function convertTimeToCitySearched(response) {
	const localTime = new Date();
	const localTimeInMilliseconds = localTime.getTime();
	const localTimeOffsetInMilliseconds = localTime.getTimezoneOffset() * 60000;
	const utc = localTimeInMilliseconds + localTimeOffsetInMilliseconds;
	return utc + 1000 * response.timezone;
}

async function updateWeatherInfo() {
	try {
		const response = await (0,_weatherData__WEBPACK_IMPORTED_MODULE_1__["default"])(
			searchBar.value,
			"imperial",
			"weather"
		);

		console.log(response);

		time.textContent = new Date(convertTimeToCitySearched(response));

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
	} catch {
		console.error("Failed to resolve weather info");
	}
}

function populateWeatherForecastInfo(response) {
	const fiveDayDailyForecast = [0, 8, 16, 24, 32, 40];

	for (let i = 0; i < weatherForecastDay.length; i += 1) {
		weatherForecastDay[i].textContent =
			response.list[fiveDayDailyForecast[i]].dt_txt;
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

async function updateWeatherForecast() {
	try {
		const response = await (0,_weatherData__WEBPACK_IMPORTED_MODULE_1__["default"])(
			searchBar.value,
			"imperial",
			"forecast"
		);
		console.log(response);
		populateWeatherForecastInfo(response);
	} catch {
		console.error("Failed to resolve weather forecast");
	}
}

function searchWeatherInfo() {
	updateWeatherInfo();
	updateWeatherForecast();
	searchBar.value = "";
}
// default weather to singapore
searchBar.value = "Singapore";
searchWeatherInfo();

searchButton.addEventListener("click", searchWeatherInfo);

searchBar.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		searchWeatherInfo();
	}
});

clearSearch.addEventListener("click", () => {
	searchBar.value = "";
});


/***/ }),

/***/ "./src/weatherData.js":
/*!****************************!*\
  !*** ./src/weatherData.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWeatherInfo)
/* harmony export */ });
async function getWeatherInfo(city, unit, weatherType) {
	try {
		const apiKey = "d92ae7934e5fdcdcd8e453a8b3bbadd7";

		const data = await fetch(
			`https://api.openweathermap.org/data/2.5/${weatherType}?q=${city}&units=${unit}&appid=${apiKey}`
		);

		const response = await data.json();
		return response;
	} catch {
		console.error("Failed to resolve weather info");
		return "Failed to resolve weather info";
	}
}


/***/ }),

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _weatherData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weatherData */ "./src/weatherData.js");



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQTBDO0FBQ0w7QUFDTTs7QUFFM0M7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IseURBQWlCO0FBQ3JDLEdBQUc7QUFDSCxvQkFBb0Isc0VBQThCO0FBQ2xELEdBQUcsb0NBQW9DLCtDQUFPO0FBQzlDLG9CQUFvQixvREFBWTtBQUNoQyxHQUFHO0FBQ0gsb0JBQW9CLG9EQUFZO0FBQ2hDLEdBQUc7QUFDSCxvQkFBb0IsdURBQWU7QUFDbkMsR0FBRztBQUNILG9CQUFvQixvREFBWTtBQUNoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUIsd0RBQWM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLCtCQUErQiw4QkFBOEI7QUFDN0Qsd0NBQXdDO0FBQ3hDO0FBQ0EsSUFBSTtBQUNKLHdCQUF3QixxQkFBcUI7QUFDN0MsNEJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsY0FBYyxJQUFJLHFCQUFxQjtBQUNuRSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLCtCQUErQjtBQUNoRDtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHVDQUF1QztBQUN4RDtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHVDQUF1QztBQUN4RCxpREFBaUQ7QUFDakQ7QUFDQSx5QkFBeUI7QUFDekI7O0FBRUEsaUJBQWlCLGdDQUFnQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5Qix3REFBYztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUN4SmM7QUFDZjtBQUNBOztBQUVBO0FBQ0EsOENBQThDLFlBQVksS0FBSyxLQUFLLFNBQVMsS0FBSyxTQUFTLE9BQU87QUFDbEc7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNkQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05lO0FBQ1EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2VhdGhlckRhdGEuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VhdGhlciBmcm9tIFwiLi93ZWF0aGVySWNvbnMuanNvblwiO1xuaW1wb3J0IGZvcm1hdCBmcm9tIFwiZGF0ZS1mbnMvZm9ybWF0XCI7XG5pbXBvcnQgZ2V0V2VhdGhlckluZm8gZnJvbSBcIi4vd2VhdGhlckRhdGFcIjtcblxuLy8gU2VhcmNoXG5cbmNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWJhclwiKTtcbmNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmEtbWFnbmlmeWluZy1nbGFzc1wiKTtcbmNvbnN0IGNsZWFyU2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYS14bWFya1wiKTtcblxuLy8gV2VhdGhlclxuXG5jb25zdCBsb2NhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9jYXRpb25cIik7XG5jb25zdCB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aW1lXCIpO1xuY29uc3QgbWFpbldlYXRoZXJJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLWljb25cIik7XG5jb25zdCB3ZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItZGVzY3JpcHRpb25cIik7XG5jb25zdCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcGVyYXR1cmVcIik7XG5jb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWxzLWxpa2VcIik7XG5cbi8vIE1vcmUgV2VhdGhlciBJbmZvXG5cbmNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odW1pZGl0eS12YWx1ZVwiKTtcbmNvbnN0IHdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbmQtc3BlZWQtdmFsdWVcIik7XG5jb25zdCBocGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhwYS12YWx1ZVwiKTtcbmNvbnN0IHN1bnJpc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnJpc2UtdmFsdWVcIik7XG5jb25zdCBzdW5zZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnNldC12YWx1ZVwiKTtcblxuLy8gV2VhdGhlciBGb3JlY2FzdFxuXG5jb25zdCB3ZWF0aGVyRm9yZWNhc3REYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRheS1mb3JlY2FzdC1kYXRlXCIpO1xuY29uc3Qgd2VhdGhlckZvcmVjYXN0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuXHRcIi5kYXktZm9yZWNhc3Qtd2VhdGhlci1kZXNjcmlwdGlvblwiXG4pO1xuXG5jb25zdCB3ZWF0aGVyRm9yZWNhc3RUZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG5cdFwiLmRheS1mb3JlY2FzdC10ZW1wZXJhdHVyZVwiXG4pO1xuY29uc3Qgd2VhdGhlckZvcmVjYXN0SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIud2VhdGhlci1mb3JlY2FzdC1pY29uXCIpO1xuXG5mdW5jdGlvbiB1cGRhdGVXZWF0aGVySWNvbih3ZWF0aGVySWNvbiwgd2VhdGhlclZhbHVlKSB7XG5cdGlmICh3ZWF0aGVyVmFsdWUgPT09IFwiQ2xlYXJcIikge1xuXHRcdHdlYXRoZXJJY29uLnNyYyA9IHdlYXRoZXIuY2xlYXIuZGF5O1xuXHR9IGVsc2UgaWYgKHdlYXRoZXJWYWx1ZSA9PT0gXCJDbG91ZHNcIikge1xuXHRcdHdlYXRoZXJJY29uLnNyYyA9IHdlYXRoZXIuY2xvdWQuYnJva2VuQ2xvdWRzLmRheTtcblx0fSBlbHNlIGlmICh3ZWF0aGVyVmFsdWUgPT09IFwiUmFpblwiIHx8IHdlYXRoZXIgPT09IFwiRHJpenpsZVwiKSB7XG5cdFx0d2VhdGhlckljb24uc3JjID0gd2VhdGhlci5yYWluO1xuXHR9IGVsc2UgaWYgKHdlYXRoZXJWYWx1ZSA9PT0gXCJTbm93XCIpIHtcblx0XHR3ZWF0aGVySWNvbi5zcmMgPSB3ZWF0aGVyLnNub3c7XG5cdH0gZWxzZSBpZiAod2VhdGhlclZhbHVlID09PSBcIlRodW5kZXJzdG9ybVwiKSB7XG5cdFx0d2VhdGhlckljb24uc3JjID0gd2VhdGhlci50aHVuZGVyO1xuXHR9IGVsc2Uge1xuXHRcdHdlYXRoZXJJY29uLnNyYyA9IHdlYXRoZXIubWlzdDtcblx0fVxufVxuXG5mdW5jdGlvbiBjb252ZXJ0VGltZVRvQ2l0eVNlYXJjaGVkKHJlc3BvbnNlKSB7XG5cdGNvbnN0IGxvY2FsVGltZSA9IG5ldyBEYXRlKCk7XG5cdGNvbnN0IGxvY2FsVGltZUluTWlsbGlzZWNvbmRzID0gbG9jYWxUaW1lLmdldFRpbWUoKTtcblx0Y29uc3QgbG9jYWxUaW1lT2Zmc2V0SW5NaWxsaXNlY29uZHMgPSBsb2NhbFRpbWUuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwMDAwO1xuXHRjb25zdCB1dGMgPSBsb2NhbFRpbWVJbk1pbGxpc2Vjb25kcyArIGxvY2FsVGltZU9mZnNldEluTWlsbGlzZWNvbmRzO1xuXHRyZXR1cm4gdXRjICsgMTAwMCAqIHJlc3BvbnNlLnRpbWV6b25lO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVXZWF0aGVySW5mbygpIHtcblx0dHJ5IHtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldFdlYXRoZXJJbmZvKFxuXHRcdFx0c2VhcmNoQmFyLnZhbHVlLFxuXHRcdFx0XCJpbXBlcmlhbFwiLFxuXHRcdFx0XCJ3ZWF0aGVyXCJcblx0XHQpO1xuXG5cdFx0Y29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG5cdFx0dGltZS50ZXh0Q29udGVudCA9IG5ldyBEYXRlKGNvbnZlcnRUaW1lVG9DaXR5U2VhcmNoZWQocmVzcG9uc2UpKTtcblxuXHRcdHVwZGF0ZVdlYXRoZXJJY29uKG1haW5XZWF0aGVySWNvbiwgcmVzcG9uc2Uud2VhdGhlclswXS5tYWluKTtcblx0XHR3ZWF0aGVyRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSByZXNwb25zZS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuXHRcdHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gYCR7cmVzcG9uc2UubWFpbi50ZW1wLnRvRml4ZWQoMCl9wrBgO1xuXHRcdGZlZWxzTGlrZS50ZXh0Q29udGVudCA9IGBmZWVscyBsaWtlICR7cmVzcG9uc2UubWFpbi5mZWVsc19saWtlLnRvRml4ZWQoXG5cdFx0XHQwXG5cdFx0KX3CsGA7XG5cdFx0d2luZC50ZXh0Q29udGVudCA9IGAke3Jlc3BvbnNlLndpbmQuc3BlZWR9IG1waGA7XG5cdFx0aHVtaWRpdHkudGV4dENvbnRlbnQgPSBgJHtyZXNwb25zZS5tYWluLmh1bWlkaXR5fSVgO1xuXHRcdGhwYS50ZXh0Q29udGVudCA9IHJlc3BvbnNlLm1haW4ucHJlc3N1cmU7XG5cdFx0c3VucmlzZS50ZXh0Q29udGVudCA9IHJlc3BvbnNlLnN5cy5zdW5yaXNlO1xuXHRcdHN1bnNldC50ZXh0Q29udGVudCA9IHJlc3BvbnNlLnN5cy5zdW5zZXQ7XG5cdFx0bG9jYXRpb24udGV4dENvbnRlbnQgPSBgJHtyZXNwb25zZS5uYW1lfSwgJHtyZXNwb25zZS5zeXMuY291bnRyeX1gO1xuXHR9IGNhdGNoIHtcblx0XHRjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHJlc29sdmUgd2VhdGhlciBpbmZvXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlV2VhdGhlckZvcmVjYXN0SW5mbyhyZXNwb25zZSkge1xuXHRjb25zdCBmaXZlRGF5RGFpbHlGb3JlY2FzdCA9IFswLCA4LCAxNiwgMjQsIDMyLCA0MF07XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCB3ZWF0aGVyRm9yZWNhc3REYXkubGVuZ3RoOyBpICs9IDEpIHtcblx0XHR3ZWF0aGVyRm9yZWNhc3REYXlbaV0udGV4dENvbnRlbnQgPVxuXHRcdFx0cmVzcG9uc2UubGlzdFtmaXZlRGF5RGFpbHlGb3JlY2FzdFtpXV0uZHRfdHh0O1xuXHR9XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCB3ZWF0aGVyRm9yZWNhc3REZXNjcmlwdGlvbi5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdHdlYXRoZXJGb3JlY2FzdERlc2NyaXB0aW9uW2ldLnRleHRDb250ZW50ID1cblx0XHRcdHJlc3BvbnNlLmxpc3RbZml2ZURheURhaWx5Rm9yZWNhc3RbaV1dLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG5cdH1cblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHdlYXRoZXJGb3JlY2FzdFRlbXBlcmF0dXJlLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0d2VhdGhlckZvcmVjYXN0VGVtcGVyYXR1cmVbaV0udGV4dENvbnRlbnQgPSBgJHtyZXNwb25zZS5saXN0W1xuXHRcdFx0Zml2ZURheURhaWx5Rm9yZWNhc3RbaV1cblx0XHRdLm1haW4udGVtcC50b0ZpeGVkKDApfcKwYDtcblx0fVxuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgd2VhdGhlckZvcmVjYXN0SWNvbi5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdHdlYXRoZXJGb3JlY2FzdEljb25baV0udGV4dENvbnRlbnQgPSB1cGRhdGVXZWF0aGVySWNvbihcblx0XHRcdHdlYXRoZXJGb3JlY2FzdEljb25baV0sXG5cdFx0XHRyZXNwb25zZS5saXN0W2ZpdmVEYXlEYWlseUZvcmVjYXN0W2ldXS53ZWF0aGVyWzBdLm1haW5cblx0XHQpO1xuXHR9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVdlYXRoZXJGb3JlY2FzdCgpIHtcblx0dHJ5IHtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldFdlYXRoZXJJbmZvKFxuXHRcdFx0c2VhcmNoQmFyLnZhbHVlLFxuXHRcdFx0XCJpbXBlcmlhbFwiLFxuXHRcdFx0XCJmb3JlY2FzdFwiXG5cdFx0KTtcblx0XHRjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cdFx0cG9wdWxhdGVXZWF0aGVyRm9yZWNhc3RJbmZvKHJlc3BvbnNlKTtcblx0fSBjYXRjaCB7XG5cdFx0Y29uc29sZS5lcnJvcihcIkZhaWxlZCB0byByZXNvbHZlIHdlYXRoZXIgZm9yZWNhc3RcIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gc2VhcmNoV2VhdGhlckluZm8oKSB7XG5cdHVwZGF0ZVdlYXRoZXJJbmZvKCk7XG5cdHVwZGF0ZVdlYXRoZXJGb3JlY2FzdCgpO1xuXHRzZWFyY2hCYXIudmFsdWUgPSBcIlwiO1xufVxuLy8gZGVmYXVsdCB3ZWF0aGVyIHRvIHNpbmdhcG9yZVxuc2VhcmNoQmFyLnZhbHVlID0gXCJTaW5nYXBvcmVcIjtcbnNlYXJjaFdlYXRoZXJJbmZvKCk7XG5cbnNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VhcmNoV2VhdGhlckluZm8pO1xuXG5zZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG5cdGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG5cdFx0c2VhcmNoV2VhdGhlckluZm8oKTtcblx0fVxufSk7XG5cbmNsZWFyU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdHNlYXJjaEJhci52YWx1ZSA9IFwiXCI7XG59KTtcbiIsImV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJJbmZvKGNpdHksIHVuaXQsIHdlYXRoZXJUeXBlKSB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgYXBpS2V5ID0gXCJkOTJhZTc5MzRlNWZkY2RjZDhlNDUzYThiM2JiYWRkN1wiO1xuXG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKFxuXHRcdFx0YGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS8ke3dlYXRoZXJUeXBlfT9xPSR7Y2l0eX0mdW5pdHM9JHt1bml0fSZhcHBpZD0ke2FwaUtleX1gXG5cdFx0KTtcblxuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cdFx0cmV0dXJuIHJlc3BvbnNlO1xuXHR9IGNhdGNoIHtcblx0XHRjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHJlc29sdmUgd2VhdGhlciBpbmZvXCIpO1xuXHRcdHJldHVybiBcIkZhaWxlZCB0byByZXNvbHZlIHdlYXRoZXIgaW5mb1wiO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vRE9NXCI7XG5pbXBvcnQgXCIuL3dlYXRoZXJEYXRhXCI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=