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
