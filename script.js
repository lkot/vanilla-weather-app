const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const currentTemp = document.querySelector('.current-temp');
const currentDay = document.querySelector('.current-day');
const warning = document.querySelector('.warning');
const weatherIcon = document.querySelector('.weather-icon');

// What is that weather ??
// const weather = document.querySelector('.weather');

// Detailed temperature for current day
let feelsLike = document.querySelector('.feels-like');
let windSpeed = document.querySelector('.wind-speed');
let pressure = document.querySelector('.pressure');
let humidity = document.querySelector('.humidity');
let sunrise = document.querySelector('.sunrise');
let sunset = document.querySelector('.sunset');

// Forecast for the next 6 days
const dayOne = document.querySelector('.day-one');
const dayTwo = document.querySelector('.day-two');
const dayThree = document.querySelector('.day-three');
const dayFour = document.querySelector('.day-four');
const dayFive = document.querySelector('.day-five');
const daySix = document.querySelector('.day-six');

const tempMaxOne = document.querySelector('.temp-max-one');
const tempMaxTwo = document.querySelector('.temp-max-two');
const tempMaxThree = document.querySelector('.temp-max-three');
const tempMaxFour = document.querySelector('.temp-max-four');
const tempMaxFive = document.querySelector('.temp-max-five');
const tempMaxSix = document.querySelector('.temp-max-six');

const tempMinOne = document.querySelector('.temp-min-one');
const tempMinTwo = document.querySelector('.temp-min-two');
const tempMinThree = document.querySelector('.temp-min-three');
const tempMinFour = document.querySelector('.temp-min-four');
const tempMinFive = document.querySelector('.temp-min-five');
const tempMinSix = document.querySelector('.temp-min-six');

// const pressureOne = document.querySelector('.pressure-one');
// const pressureTwo = document.querySelector('.pressure-two');
// const pressureThree = document.querySelector('.pressure-three');

// const weekDays = document.querySelectorAll('.day');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
// const apiLink = 'https://api.openweathermap.org/data/2.5/forecast?q=';

// const cntDays = '&cnt=7';
const apiLinkSecond = 'https://api.openweathermap.org/data/2.5/onecall?lat=';

const apiKey = '&appid=6cc72973c9f90178352e90a3a6db7316';

const units = '&units=metric';

// const apiAll = api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=7&APPID=21c8476132db640e501aa706460e3b1a;

let city;
let url;
let urlNew;
// let wind;

const getWeather = () => {
	city = !input.value ? 'Warsaw' : input.value;

	// url = apiLink + city + apiKey + units;
	url = apiLink + city + apiKey + units;

	// przy pomocy axios'a pobieramy url, który u góry stworzyliśmy

	axios
		.get(url)
		.then((res) => {
			// res.data.list.forEach(day => console.log(day.main.temp))
			console.log(res);

			const temp = res.data.main.temp;
			const wind = res.data.wind.speed;
			const feels = res.data.main.feels_like;
			// console.log(wind);

			const hum = res.data.main.humidity;
			// console.log(res.data.main.humidity);
			// console.log(res.data);

			// const test = res.data.list[5].main.humidity;
			// czyli do status przypiszemy zwykły pojedynczy obiekt - przy użyciu assign'a "rozsmarujemy" całą tablicę, która znajduje się w res.data.weather
			const status = Object.assign({}, ...res.data.weather);
			// console.log(status);
			// console.log(status.id);
			// console.log(wind);

			cityName.textContent = res.data.name;
			currentTemp.textContent = Math.floor(temp) + '°C';
			// console.log(wind);
			// windSpeed.textContent = wind + 'km/h';
			// feelsLike.textContent = Math.floor(feels) + '°C';
			// humidity.textContent = hum + '%';
			// weather.textContent = status.main;
			console.log(status.id);

			warning.textContent = '';
			input.value = '';

			console.log(status.main);

			// console.log(status.description);

			whatWeather(status.id);

			// if (status.id >= 200 && status.id < 300) {
			// 	weatherIcon.setAttribute('src', './img/thunderstorm.svg');
			// } else if (status.id >= 300 && status.id < 400) {
			// 	weatherIcon.setAttribute('src', './img/drizzle.svg');
			// } else if (status.id >= 500 && status.id < 600) {
			// 	weatherIcon.setAttribute('src', './img/rain.svg');
			// } else if (status.id >= 600 && status.id < 700) {
			// 	weatherIcon.setAttribute('src', './img/snow.svg');
			// } else if (status.id === 701) {
			// 	weatherIcon.setAttribute('src', './img/fog.svg');
			// } else if (status.id === 800) {
			// 	weatherIcon.setAttribute('src', './img/sun.svg');
			// } else if (status.id >= 801 && status.id <= 804) {
			// 	weatherIcon.setAttribute('src', './img/cloud.svg');
			// } else {
			// 	weatherIcon.setAttribute('src', './img/unknown.svg');
			// }
			// Poniżej dzięki temu w konsoli można zobaczyć jaki obiekt nam się pobrał
			// console.log(res);

			// Link to the city by coordinates from the inserted location.
			urlNew =
				apiLinkSecond +
				res.data.coord.lat +
				'&lon=' +
				res.data.coord.lon +
				'&exclude=minutely,hourly' +
				apiKey +
				units;
			// console.log(urlNew);

			getForecast(urlNew);

			// console.log(urlSecond);
		})
		.catch(() => {
			warning.textContent = 'Enter the correct city name.';
		});
};

const enterCheck = () => {
	if (event.keyCode === 13) {
		getWeather();
	}
};

// Test function to assign a weather icon.
const whatWeather = (dayID) => {
	if (dayID >= 200 && dayID < 300) {
		weatherIcon.setAttribute('src', './img/thunderstorm.svg');
	} else if (dayID >= 300 && dayID < 400) {
		weatherIcon.setAttribute('src', './img/drizzle.svg');
	} else if (dayID >= 500 && dayID < 600) {
		weatherIcon.setAttribute('src', './img/rain.svg');
	} else if (dayID >= 600 && dayID < 700) {
		weatherIcon.setAttribute('src', './img/snow.svg');
	} else if (dayID === 701) {
		weatherIcon.setAttribute('src', './img/fog.svg');
	} else if (dayID === 800) {
		weatherIcon.setAttribute('src', './img/sun.svg');
	} else if (dayID >= 801 && dayID <= 804) {
		weatherIcon.setAttribute('src', './img/cloud.svg');
	} else {
		weatherIcon.setAttribute('src', './img/unknown.svg');
	}
};

// Function uploading weather forecast for the next 6 days.
const getForecast = (urlSecond) => {
	fetch(urlSecond)
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		// status = Object.assign({}, ...res.data.daily);
		// console.log(data.daily[6].temp.day);
		// console.log(data);

		// data.daily.forEach(console.log(data.temp))

		// for (const day of data.daily){
		// 	console.log(day.temp);
		// }
		// console.log(data.daily[2].temp);

		// tempOne.textContent = data.daily[1].temp.day;
		// tempTwo.textContent = data.daily[2].temp.day;
		// tempThree.textContent = data.daily[3].temp.day;
		const days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];

		let dayIndex = 1;
		let d;
		let dayName;

		// Current day
		d = new Date(data.daily[0].dt * 1000);
		dayName = days[d.getDay()];
		currentDay.textContent = dayName;

		// First day
		d = new Date(data.daily[dayIndex].dt * 1000);
		dayName = days[d.getDay()];
		dayOne.textContent = dayName;
		dayIndex++;

		tempMaxOne.textContent =
			Math.floor(data.daily[dayIndex].temp.max) + '°C';
		tempMinOne.textContent =
			Math.floor(data.daily[dayIndex].temp.min) + '°C';

		// Second day
		d = new Date(data.daily[dayIndex].dt * 1000);
		dayName = days[d.getDay()];
		dayTwo.textContent = dayName;
		dayIndex++;

		tempMaxTwo.textContent =
			Math.floor(data.daily[dayIndex].temp.max) + '°C';
		tempMinTwo.textContent =
			Math.floor(data.daily[dayIndex].temp.min) + '°C';

		// Third day
		d = new Date(data.daily[dayIndex].dt * 1000);
		dayName = days[d.getDay()];
		// dayThree.textContent = dayName;
		dayIndex++;

		tempMaxThree.textContent =
			Math.floor(data.daily[dayIndex].temp.max) + '°C';
		tempMinThree.textContent =
			Math.floor(data.daily[dayIndex].temp.min) + '°C';

		// Fourth day
		d = new Date(data.daily[dayIndex].dt * 1000);
		dayName = days[d.getDay()];
		dayFour.textContent = dayName;
		dayIndex++;

		tempMaxFour.textContent =
			Math.floor(data.daily[dayIndex].temp.max) + '°C';
		tempMinFour.textContent =
			Math.floor(data.daily[dayIndex].temp.min) + '°C';

		// Fifth day
		d = new Date(data.daily[dayIndex].dt * 1000);
		dayName = days[d.getDay()];
		dayFive.textContent = dayName;
		dayIndex++;

		tempMaxFive.textContent =
			Math.floor(data.daily[dayIndex].temp.max) + '°C';
		tempMinFive.textContent =
			Math.floor(data.daily[dayIndex].temp.min) + '°C';

		// Sixth day
		d = new Date(data.daily[dayIndex].dt * 1000);
		dayName = days[d.getDay()];
		daySix.textContent = dayName;
		dayIndex++;

		tempMaxSix.textContent =
			Math.floor(data.daily[dayIndex].temp.max) + '°C';
		tempMinSix.textContent =
			Math.floor(data.daily[dayIndex].temp.min) + '°C';
	})
	.catch((err) => console.error(err));
}

getWeather();
btn.addEventListener('click', getWeather);
input.addEventListener('keyup', enterCheck);
