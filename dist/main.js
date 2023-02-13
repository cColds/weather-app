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
const weatherIcon = document.querySelector(".cloud");
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

function checkWeatherType(weather) {
	if (weather === "Clear") {
		weatherIcon.src = _weatherIcons_json__WEBPACK_IMPORTED_MODULE_0__.clear.day;
	} else if (weather === "Clouds") {
		weatherIcon.src = _weatherIcons_json__WEBPACK_IMPORTED_MODULE_0__.cloud.brokenClouds.day;
	} else if (weather === "Rain" || weather === "Drizzle") {
		weatherIcon.src = _weatherIcons_json__WEBPACK_IMPORTED_MODULE_0__.rain;
	} else if (weather === "Snow") {
		weatherIcon.src = _weatherIcons_json__WEBPACK_IMPORTED_MODULE_0__.snow;
	} else if (weather === "Thunderstorm") {
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

		checkWeatherType(response.weather[0].main);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1VBQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOK0M7O0FBRS9DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQix5REFBc0I7QUFDMUMsR0FBRztBQUNILG9CQUFvQixzRUFBbUM7QUFDdkQsR0FBRztBQUNILG9CQUFvQixvREFBaUI7QUFDckMsR0FBRztBQUNILG9CQUFvQixvREFBaUI7QUFDckMsR0FBRztBQUNILG9CQUFvQix1REFBb0I7QUFDeEMsR0FBRztBQUNILG9CQUFvQixvREFBaUI7QUFDckM7QUFDQTs7QUFFQSx5QkFBeUI7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELGdCQUFnQixTQUFTLEtBQUssU0FBUyxPQUFPO0FBQ3RHOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBLElBQUk7QUFDSix3QkFBd0IscUJBQXFCO0FBQzdDLDRCQUE0Qix1QkFBdUI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGNBQWMsSUFBSSxxQkFBcUI7QUFDbkUsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsZ0JBQWdCLFNBQVMsS0FBSyxTQUFTLE9BQU87QUFDdkc7QUFDQTtBQUNBLGdEQUFnRDs7QUFFaEQ7QUFDQSxrQkFBa0IsK0JBQStCO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQix1Q0FBdUM7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLHVDQUF1QztBQUN6RCxrREFBa0Q7QUFDbEQ7QUFDQSwwQkFBMEI7QUFDMUI7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB3ZWF0aGVySWNvbnMgZnJvbSBcIi4vd2VhdGhlckljb25zLmpzb25cIjtcblxuY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtYmFyXCIpO1xuXG4vLyBtYWluIHdlYXRoZXJcbmNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmEtbWFnbmlmeWluZy1nbGFzc1wiKTtcbmNvbnN0IGNsZWFyU2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYS14bWFya1wiKTtcbmNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2NhdGlvblwiKTtcbmNvbnN0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpbWVcIik7XG5jb25zdCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xvdWRcIik7XG5jb25zdCB3ZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItZGVzY3JpcHRpb25cIik7XG5jb25zdCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcGVyYXR1cmVcIik7XG5jb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZlZWxzLWxpa2VcIik7XG5cbi8vIG1vcmUgd2VhdGhlciBpbmZvXG4vLyBjb25zdCBhaXJRdWFsaXR5SW5kZXggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpci1xdWFsaXR5LWluZGV4LXZhbHVlXCIpO1xuLy8gY29uc3QgcHJlY2lwaXRhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlY2lwaXRhdGlvbi12YWx1ZVwiKTtcblxuY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmh1bWlkaXR5LXZhbHVlXCIpO1xuY29uc3Qgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2luZC1zcGVlZC12YWx1ZVwiKTtcbmNvbnN0IGhwYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHBhLXZhbHVlXCIpO1xuXG5jb25zdCBzdW5yaXNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdW5yaXNlLXZhbHVlXCIpO1xuY29uc3Qgc3Vuc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdW5zZXQtdmFsdWVcIik7XG5jb25zdCBhcGlLZXkgPSBcImQ5MmFlNzkzNGU1ZmRjZGNkOGU0NTNhOGIzYmJhZGQ3XCI7XG5cbi8vIGZvcmVjYXN0XG5cbmNvbnN0IHdlYXRoZXJGb3JlY2FzdERheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGF5LWZvcmVjYXN0LWRhdGVcIik7XG5jb25zdCB3ZWF0aGVyRm9yZWNhc3REZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG5cdFwiLmRheS1mb3JlY2FzdC13ZWF0aGVyLWRlc2NyaXB0aW9uXCJcbik7XG5cbmNvbnN0IHdlYXRoZXJGb3JlY2FzdFRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcblx0XCIuZGF5LWZvcmVjYXN0LXRlbXBlcmF0dXJlXCJcbik7XG5cbmZ1bmN0aW9uIGNoZWNrV2VhdGhlclR5cGUod2VhdGhlcikge1xuXHRpZiAod2VhdGhlciA9PT0gXCJDbGVhclwiKSB7XG5cdFx0d2VhdGhlckljb24uc3JjID0gd2VhdGhlckljb25zLmNsZWFyLmRheTtcblx0fSBlbHNlIGlmICh3ZWF0aGVyID09PSBcIkNsb3Vkc1wiKSB7XG5cdFx0d2VhdGhlckljb24uc3JjID0gd2VhdGhlckljb25zLmNsb3VkLmJyb2tlbkNsb3Vkcy5kYXk7XG5cdH0gZWxzZSBpZiAod2VhdGhlciA9PT0gXCJSYWluXCIgfHwgd2VhdGhlciA9PT0gXCJEcml6emxlXCIpIHtcblx0XHR3ZWF0aGVySWNvbi5zcmMgPSB3ZWF0aGVySWNvbnMucmFpbjtcblx0fSBlbHNlIGlmICh3ZWF0aGVyID09PSBcIlNub3dcIikge1xuXHRcdHdlYXRoZXJJY29uLnNyYyA9IHdlYXRoZXJJY29ucy5zbm93O1xuXHR9IGVsc2UgaWYgKHdlYXRoZXIgPT09IFwiVGh1bmRlcnN0b3JtXCIpIHtcblx0XHR3ZWF0aGVySWNvbi5zcmMgPSB3ZWF0aGVySWNvbnMudGh1bmRlcjtcblx0fSBlbHNlIHtcblx0XHR3ZWF0aGVySWNvbi5zcmMgPSB3ZWF0aGVySWNvbnMubWlzdDtcblx0fVxufVxuXG5jb25zdCB1bml0ID0gXCJpbXBlcmlhbFwiOyAvLyBzZXQgbWV0cmljIG9wdGlvbiBsYXRlclxuXG4vLyB3ZWF0aGVyIGZvcmVjYXN0XG5hc3luYyBmdW5jdGlvbiB1cGRhdGVXZWF0aGVySW5mbygpIHtcblx0dHJ5IHtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goXG5cdFx0XHRgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke3NlYXJjaEJhci52YWx1ZX0mdW5pdHM9JHt1bml0fSZhcHBpZD0ke2FwaUtleX1gXG5cdFx0KTtcblxuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG5cblx0XHRjaGVja1dlYXRoZXJUeXBlKHJlc3BvbnNlLndlYXRoZXJbMF0ubWFpbik7XG5cdFx0d2VhdGhlckRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gcmVzcG9uc2Uud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcblx0XHR0ZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IHJlc3BvbnNlLm1haW4udGVtcC50b0ZpeGVkKDApO1xuXHRcdGZlZWxzTGlrZS50ZXh0Q29udGVudCA9IGBmZWVscyBsaWtlICR7cmVzcG9uc2UubWFpbi5mZWVsc19saWtlLnRvRml4ZWQoXG5cdFx0XHQwXG5cdFx0KX3CsGA7XG5cdFx0d2luZC50ZXh0Q29udGVudCA9IGAke3Jlc3BvbnNlLndpbmQuc3BlZWR9IG1waGA7XG5cdFx0aHVtaWRpdHkudGV4dENvbnRlbnQgPSBgJHtyZXNwb25zZS5tYWluLmh1bWlkaXR5fSVgO1xuXHRcdGhwYS50ZXh0Q29udGVudCA9IHJlc3BvbnNlLm1haW4ucHJlc3N1cmU7XG5cdFx0c3VucmlzZS50ZXh0Q29udGVudCA9IHJlc3BvbnNlLnN5cy5zdW5yaXNlO1xuXHRcdHN1bnNldC50ZXh0Q29udGVudCA9IHJlc3BvbnNlLnN5cy5zdW5zZXQ7XG5cdFx0bG9jYXRpb24udGV4dENvbnRlbnQgPSBgJHtyZXNwb25zZS5uYW1lfSwgJHtyZXNwb25zZS5zeXMuY291bnRyeX1gO1xuXHR9IGNhdGNoIHtcblx0XHRjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHJlc29sdmUgd2VhdGhlciBpbmZvXCIpO1xuXHR9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVdlYXRoZXJGb3JlY2FzdCgpIHtcblx0dHJ5IHtcblx0XHRjb25zdCB3ZWF0aGVyRm9yZWNhc3REYXRhID0gYXdhaXQgZmV0Y2goXG5cdFx0XHRgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtzZWFyY2hCYXIudmFsdWV9JnVuaXRzPSR7dW5pdH0mYXBwaWQ9JHthcGlLZXl9YFxuXHRcdCk7XG5cdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCB3ZWF0aGVyRm9yZWNhc3REYXRhLmpzb24oKTtcblx0XHRjb25zdCBkYWlseUZvcmVjYXN0ID0gWzAsIDgsIDE2LCAyNCwgMzIsIDQwXTsgLy8gZGFpbHkgZm9yZWNhc3QgZm9yIDUgZGF5c1xuXG5cdFx0Ly8gZGF5XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB3ZWF0aGVyRm9yZWNhc3REYXkubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdHdlYXRoZXJGb3JlY2FzdERheVtpXS50ZXh0Q29udGVudCA9XG5cdFx0XHRcdHJlc3BvbnNlLmxpc3RbZGFpbHlGb3JlY2FzdFtpXV0uZHRfdHh0O1xuXHRcdH1cblxuXHRcdC8vIHdlYXRoZXIgZGVzY3JpcHRpb25cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHdlYXRoZXJGb3JlY2FzdERlc2NyaXB0aW9uLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHR3ZWF0aGVyRm9yZWNhc3REZXNjcmlwdGlvbltpXS50ZXh0Q29udGVudCA9XG5cdFx0XHRcdHJlc3BvbnNlLmxpc3RbZGFpbHlGb3JlY2FzdFtpXV0ud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcblx0XHR9XG5cblx0XHQvLyB0ZW1wZXJhdHVyZVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgd2VhdGhlckZvcmVjYXN0VGVtcGVyYXR1cmUubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdHdlYXRoZXJGb3JlY2FzdFRlbXBlcmF0dXJlW2ldLnRleHRDb250ZW50ID0gYCR7cmVzcG9uc2UubGlzdFtcblx0XHRcdFx0ZGFpbHlGb3JlY2FzdFtpXVxuXHRcdFx0XS5tYWluLnRlbXAudG9GaXhlZCgwKX3CsGA7XG5cdFx0fVxuXG5cdFx0Y29uc29sZS5sb2cocmVzcG9uc2UpO1xuXHR9IGNhdGNoIHtcblx0XHRjb25zb2xlLmVycm9yKFwiRmFpbGVkIHRvIHJlc29sdmUgd2VhdGhlciBmb3JlY2FzdFwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiBzZWFyY2hXZWF0aGVySW5mbygpIHtcblx0dXBkYXRlV2VhdGhlckluZm8oKTtcblx0dXBkYXRlV2VhdGhlckZvcmVjYXN0KCk7XG5cdHNlYXJjaEJhci52YWx1ZSA9IFwiXCI7XG59XG5cbnNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VhcmNoV2VhdGhlckluZm8pO1xuXG5zZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG5cdGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG5cdFx0c2VhcmNoV2VhdGhlckluZm8oKTtcblx0fVxufSk7XG5cbi8vIGRlZmF1bHQgd2VhdGhlciB0byBzaW5nYXBvcmVcbnNlYXJjaEJhci52YWx1ZSA9IFwiU2luZ2Fwb3JlXCI7XG5zZWFyY2hXZWF0aGVySW5mbygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9