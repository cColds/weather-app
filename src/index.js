fetch(
	"https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=d92ae7934e5fdcdcd8e453a8b3bbadd7"
)
	.then((response) => response.json())
	.then((data) => console.log(data));

fetch(
	"https://api.openweathermap.org/data/2.5/forecast?lat=48.8566&lon=2.3522&appid=d92ae7934e5fdcdcd8e453a8b3bbadd7"
)
	.then((response) => response.json())
	.then((data) => console.log(data));
