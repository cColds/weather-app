export default async function getWeatherInfo(city, unit, weatherType) {
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
