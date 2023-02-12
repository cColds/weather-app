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


console.log(_weatherIcons_json__WEBPACK_IMPORTED_MODULE_0__);
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

function checkWeatherType(weather) {
	console.log(weather, _weatherIcons_json__WEBPACK_IMPORTED_MODULE_0__.snow);
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

// weather forecast
async function updateWeatherInfo() {
	try {
		const searchBarLocation = searchBar.value;
		const unit = "imperial"; // set metric option later

		const data = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${searchBarLocation}&units=${unit}&appid=${apiKey}`
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
		console.log(location.textContent);
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

// default weather to singapore
searchBar.value = "Singapore";
searchWeatherInfo();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1VBQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOK0M7O0FBRS9DLFlBQVksK0NBQVk7QUFDeEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLG9EQUFpQjtBQUN2QztBQUNBLG9CQUFvQix5REFBc0I7QUFDMUMsR0FBRztBQUNILG9CQUFvQixzRUFBbUM7QUFDdkQsR0FBRztBQUNILG9CQUFvQixvREFBaUI7QUFDckMsR0FBRztBQUNILG9CQUFvQixvREFBaUI7QUFDckMsR0FBRztBQUNILG9CQUFvQix1REFBb0I7QUFDeEMsR0FBRztBQUNILG9CQUFvQixvREFBaUI7QUFDckM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjs7QUFFM0I7QUFDQSx3REFBd0Qsa0JBQWtCLFNBQVMsS0FBSyxTQUFTLE9BQU87QUFDeEc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQSxJQUFJO0FBQ0osd0JBQXdCLHFCQUFxQjtBQUM3Qyw0QkFBNEIsdUJBQXVCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixjQUFjLElBQUkscUJBQXFCO0FBQ25FO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgd2VhdGhlckljb25zIGZyb20gXCIuL3dlYXRoZXJJY29ucy5qc29uXCI7XG5cbmNvbnNvbGUubG9nKHdlYXRoZXJJY29ucyk7XG5jb25zdCBzZWFyY2hCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1iYXJcIik7XG5cbi8vIG1haW4gd2VhdGhlclxuY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYS1tYWduaWZ5aW5nLWdsYXNzXCIpO1xuY29uc3QgY2xlYXJTZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhLXhtYXJrXCIpO1xuY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvY2F0aW9uXCIpO1xuY29uc3QgdGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGltZVwiKTtcbmNvbnN0IHdlYXRoZXJJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbG91ZFwiKTtcbmNvbnN0IHdlYXRoZXJEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci1kZXNjcmlwdGlvblwiKTtcbmNvbnN0IHRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wZXJhdHVyZVwiKTtcbmNvbnN0IGZlZWxzTGlrZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmVlbHMtbGlrZVwiKTtcblxuLy8gbW9yZSB3ZWF0aGVyIGluZm9cbi8vIGNvbnN0IGFpclF1YWxpdHlJbmRleCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWlyLXF1YWxpdHktaW5kZXgtdmFsdWVcIik7XG4vLyBjb25zdCBwcmVjaXBpdGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVjaXBpdGF0aW9uLXZhbHVlXCIpO1xuXG5jb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHVtaWRpdHktdmFsdWVcIik7XG5jb25zdCB3aW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5kLXNwZWVkLXZhbHVlXCIpO1xuY29uc3QgaHBhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ocGEtdmFsdWVcIik7XG5cbmNvbnN0IHN1bnJpc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnJpc2UtdmFsdWVcIik7XG5jb25zdCBzdW5zZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnNldC12YWx1ZVwiKTtcbmNvbnN0IGFwaUtleSA9IFwiZDkyYWU3OTM0ZTVmZGNkY2Q4ZTQ1M2E4YjNiYmFkZDdcIjtcblxuZnVuY3Rpb24gY2hlY2tXZWF0aGVyVHlwZSh3ZWF0aGVyKSB7XG5cdGNvbnNvbGUubG9nKHdlYXRoZXIsIHdlYXRoZXJJY29ucy5zbm93KTtcblx0aWYgKHdlYXRoZXIgPT09IFwiQ2xlYXJcIikge1xuXHRcdHdlYXRoZXJJY29uLnNyYyA9IHdlYXRoZXJJY29ucy5jbGVhci5kYXk7XG5cdH0gZWxzZSBpZiAod2VhdGhlciA9PT0gXCJDbG91ZHNcIikge1xuXHRcdHdlYXRoZXJJY29uLnNyYyA9IHdlYXRoZXJJY29ucy5jbG91ZC5icm9rZW5DbG91ZHMuZGF5O1xuXHR9IGVsc2UgaWYgKHdlYXRoZXIgPT09IFwiUmFpblwiIHx8IHdlYXRoZXIgPT09IFwiRHJpenpsZVwiKSB7XG5cdFx0d2VhdGhlckljb24uc3JjID0gd2VhdGhlckljb25zLnJhaW47XG5cdH0gZWxzZSBpZiAod2VhdGhlciA9PT0gXCJTbm93XCIpIHtcblx0XHR3ZWF0aGVySWNvbi5zcmMgPSB3ZWF0aGVySWNvbnMuc25vdztcblx0fSBlbHNlIGlmICh3ZWF0aGVyID09PSBcIlRodW5kZXJzdG9ybVwiKSB7XG5cdFx0d2VhdGhlckljb24uc3JjID0gd2VhdGhlckljb25zLnRodW5kZXI7XG5cdH0gZWxzZSB7XG5cdFx0d2VhdGhlckljb24uc3JjID0gd2VhdGhlckljb25zLm1pc3Q7XG5cdH1cbn1cblxuLy8gd2VhdGhlciBmb3JlY2FzdFxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlV2VhdGhlckluZm8oKSB7XG5cdHRyeSB7XG5cdFx0Y29uc3Qgc2VhcmNoQmFyTG9jYXRpb24gPSBzZWFyY2hCYXIudmFsdWU7XG5cdFx0Y29uc3QgdW5pdCA9IFwiaW1wZXJpYWxcIjsgLy8gc2V0IG1ldHJpYyBvcHRpb24gbGF0ZXJcblxuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaChcblx0XHRcdGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7c2VhcmNoQmFyTG9jYXRpb259JnVuaXRzPSR7dW5pdH0mYXBwaWQ9JHthcGlLZXl9YFxuXHRcdCk7XG5cblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuXHRcdGNoZWNrV2VhdGhlclR5cGUocmVzcG9uc2Uud2VhdGhlclswXS5tYWluKTtcblx0XHR3ZWF0aGVyRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSByZXNwb25zZS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuXHRcdHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gcmVzcG9uc2UubWFpbi50ZW1wLnRvRml4ZWQoMCk7XG5cdFx0ZmVlbHNMaWtlLnRleHRDb250ZW50ID0gYGZlZWxzIGxpa2UgJHtyZXNwb25zZS5tYWluLmZlZWxzX2xpa2UudG9GaXhlZChcblx0XHRcdDBcblx0XHQpfcKwYDtcblx0XHR3aW5kLnRleHRDb250ZW50ID0gYCR7cmVzcG9uc2Uud2luZC5zcGVlZH0gbXBoYDtcblx0XHRodW1pZGl0eS50ZXh0Q29udGVudCA9IGAke3Jlc3BvbnNlLm1haW4uaHVtaWRpdHl9JWA7XG5cdFx0aHBhLnRleHRDb250ZW50ID0gcmVzcG9uc2UubWFpbi5wcmVzc3VyZTtcblx0XHRzdW5yaXNlLnRleHRDb250ZW50ID0gcmVzcG9uc2Uuc3lzLnN1bnJpc2U7XG5cdFx0c3Vuc2V0LnRleHRDb250ZW50ID0gcmVzcG9uc2Uuc3lzLnN1bnNldDtcblx0XHRsb2NhdGlvbi50ZXh0Q29udGVudCA9IGAke3Jlc3BvbnNlLm5hbWV9LCAke3Jlc3BvbnNlLnN5cy5jb3VudHJ5fWA7XG5cdFx0Y29uc29sZS5sb2cobG9jYXRpb24udGV4dENvbnRlbnQpO1xuXHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblx0fSBjYXRjaCB7XG5cdFx0Y29uc29sZS5sb2coXCJubyBsb2xcIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gc2VhcmNoV2VhdGhlckluZm8oKSB7XG5cdHVwZGF0ZVdlYXRoZXJJbmZvKCk7XG5cdHNlYXJjaEJhci52YWx1ZSA9IFwiXCI7XG59XG5cbnNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VhcmNoV2VhdGhlckluZm8pO1xuXG5zZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG5cdGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG5cdFx0c2VhcmNoV2VhdGhlckluZm8oKTtcblx0fVxufSk7XG5cbi8vIGRlZmF1bHQgd2VhdGhlciB0byBzaW5nYXBvcmVcbnNlYXJjaEJhci52YWx1ZSA9IFwiU2luZ2Fwb3JlXCI7XG5zZWFyY2hXZWF0aGVySW5mbygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9