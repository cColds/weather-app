/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
fetch(
	"https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=d92ae7934e5fdcdcd8e453a8b3bbadd7"
)
	.then((response) => response.json())
	.then((data) => console.log(data));

const person = {
	name: "Harmeet Matharoo",
	age: 23,
	followers: [
		{
			name: "Thaddaeus Fam",
			username: "cColds",
		},
	],
};

if (person.followers.some((follower) => follower.username === "cColds")) {
	console.log("New Follower: cColds");
}

const cColds = person.followers[0];

if (cColds.isBase) {
	console.log("base");
} else {
	console.log("!base");
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZmV0Y2goXG5cdFwiaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/bGF0PTQ0LjM0Jmxvbj0xMC45OSZhcHBpZD1kOTJhZTc5MzRlNWZkY2RjZDhlNDUzYThiM2JiYWRkN1wiXG4pXG5cdC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuXHQudGhlbigoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YSkpO1xuXG5jb25zdCBwZXJzb24gPSB7XG5cdG5hbWU6IFwiSGFybWVldCBNYXRoYXJvb1wiLFxuXHRhZ2U6IDIzLFxuXHRmb2xsb3dlcnM6IFtcblx0XHR7XG5cdFx0XHRuYW1lOiBcIlRoYWRkYWV1cyBGYW1cIixcblx0XHRcdHVzZXJuYW1lOiBcImNDb2xkc1wiLFxuXHRcdH0sXG5cdF0sXG59O1xuXG5pZiAocGVyc29uLmZvbGxvd2Vycy5zb21lKChmb2xsb3dlcikgPT4gZm9sbG93ZXIudXNlcm5hbWUgPT09IFwiY0NvbGRzXCIpKSB7XG5cdGNvbnNvbGUubG9nKFwiTmV3IEZvbGxvd2VyOiBjQ29sZHNcIik7XG59XG5cbmNvbnN0IGNDb2xkcyA9IHBlcnNvbi5mb2xsb3dlcnNbMF07XG5cbmlmIChjQ29sZHMuaXNCYXNlKSB7XG5cdGNvbnNvbGUubG9nKFwiYmFzZVwiKTtcbn0gZWxzZSB7XG5cdGNvbnNvbGUubG9nKFwiIWJhc2VcIik7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=