const input = document.querySelector('input');
const btn = document.querySelector('button');

const test = document.querySelector('.test');
const test1 = document.querySelector('.test');
const test2 = document.querySelector('.test');
const test3 = document.querySelector('.test');
const test4 = document.querySelector('.test');
const test5 = document.querySelector('.test');

const cityName = document.querySelector('.city-name');
const currentTemp = document.querySelector('.current-temp');
const currentDay = document.querySelector('.current-day');
const warning = document.querySelector('.warning');

// Weather icon for each particular day
const weatherIconCurrent = document.querySelector('.weather-icon-current');
const weatherIconOne = document.querySelector('.weather-icon-one');
const weatherIconTwo = document.querySelector('.weather-icon-two');
const weatherIconThree = document.querySelector('.weather-icon-three');
const weatherIconFour = document.querySelector('.weather-icon-four');
const weatherIconFive = document.querySelector('.weather-icon-five');
const weatherIconSix = document.querySelector('.weather-icon-six');
const weatherIconSeven = document.querySelector('.weather-icon-seven');

// Detailed temperature for current day
const feelsLike = document.querySelector('.feeling');
const windSpeed = document.querySelector('.windy');
const pressure = document.querySelector('.pressure');
const humidity = document.querySelector('.humidity');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');

// Forecast for the next 6 days
const dayOne = document.querySelector('.day-one');
const dayTwo = document.querySelector('.day-two');
const dayThree = document.querySelector('.day-three');
const dayFour = document.querySelector('.day-four');
const dayFive = document.querySelector('.day-five');
const daySix = document.querySelector('.day-six');
const daySeven = document.querySelector('.day-seven');

const tempMaxOne = document.querySelector('.temp-max-one');
const tempMaxTwo = document.querySelector('.temp-max-two');
const tempMaxThree = document.querySelector('.temp-max-three');
const tempMaxFour = document.querySelector('.temp-max-four');
const tempMaxFive = document.querySelector('.temp-max-five');
const tempMaxSix = document.querySelector('.temp-max-six');
const tempMaxSeven = document.querySelector('.temp-max-seven');

const tempMinOne = document.querySelector('.temp-min-one');
const tempMinTwo = document.querySelector('.temp-min-two');
const tempMinThree = document.querySelector('.temp-min-three');
const tempMinFour = document.querySelector('.temp-min-four');
const tempMinFive = document.querySelector('.temp-min-five');
const tempMinSix = document.querySelector('.temp-min-six');
const tempMinSeven = document.querySelector('.temp-min-seven');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';

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
			const press = res.data.main.pressure;
			const hum = res.data.main.humidity;
			const unixSunrise = res.data.sys.sunrise;
			const unixSunset = res.data.sys.sunset;
			// console.log(wind);
			// console.log(res.data.main.humidity);
			// console.log(res.data);
			feelsLike.textContent = Math.floor(feels) + '°C';
			windSpeed.textContent = wind + ' km/h';
			pressure.textContent = press + ' hPa';
			humidity.textContent = hum + ' %';

			// let unixDate = new Date(data.daily[0].dt * 1000);
			// console.log(unixDate);
			// let hours = unixDate.getHours();
			// console.log(hours);

			// Sunrise
			const unixTimeSunrise = new Date(unixSunrise * 1000);
			const hoursSunrise = unixTimeSunrise.getHours();
			const minutesSunrise = unixTimeSunrise.getMinutes() < 10 ? '0' + unixTimeSunrise.getMinutes() : unixTimeSunrise.getMinutes();			sunrise.textContent = hoursSunrise + ':' + minutesSunrise;

			// Sunset
			const unixTimeSunset = new Date(unixSunset * 1000);
			const hoursSunset = unixTimeSunset.getHours();
			const minutesSunset = unixTimeSunset.getMinutes() < 10 ? '0' + unixTimeSunset.getMinutes() : unixTimeSunset.getMinutes();
			sunset.textContent = hoursSunset + ':' + minutesSunset;

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
			// console.log(status.id);

			warning.textContent = '';
			input.value = '';

			// console.log(status.main);

			// console.log(status.description);

			// whatWeather(weatherIconCurrent, status.id);
			whatWeather(weatherIconCurrent, status.id);

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
const whatWeather = (dayIcon, dayID) => {
	let weatherIcon = dayIcon;

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
			console.log(data.daily[0].weather[0].id);
			// whatWeather(weatherIconCurrent, data.daily[0].weather[0].id);

			// First day
			d = new Date(data.daily[dayIndex].dt * 1000);
			dayName = days[d.getDay()];
			dayOne.textContent = dayName;
			whatWeather(weatherIconOne, data.daily[dayIndex].weather[0].id);
			dayIndex++;

			tempMaxOne.textContent = Math.floor(data.daily[dayIndex].temp.max) + '°C';
			tempMinOne.textContent = Math.floor(data.daily[dayIndex].temp.min) + '°C';

			// Second day
			d = new Date(data.daily[dayIndex].dt * 1000);
			dayName = days[d.getDay()];
			dayTwo.textContent = dayName;
			whatWeather(weatherIconTwo, data.daily[dayIndex].weather[0].id);
			dayIndex++;

			tempMaxTwo.textContent = Math.floor(data.daily[dayIndex].temp.max) + '°C';
			tempMinTwo.textContent = Math.floor(data.daily[dayIndex].temp.min) + '°C';

			// Third day
			// d = new Date(data.daily[dayIndex].dt * 1000);
			// dayName = days[d.getDay()];
			// whatWeather(weatherIconThree, data.daily[dayIndex].weather[0].id);

			// dayIndex++;

			// tempMaxThree.textContent =
			// 	Math.floor(data.daily[dayIndex].temp.max) + '°C';
			// tempMinThree.textContent =
			// 	Math.floor(data.daily[dayIndex].temp.min) + '°C';

			// Fourth day
			d = new Date(data.daily[dayIndex].dt * 1000);
			dayName = days[d.getDay()];
			dayFour.textContent = dayName;
			whatWeather(weatherIconFour, data.daily[dayIndex].weather[0].id);
			dayIndex++;

			tempMaxFour.textContent =
				Math.floor(data.daily[dayIndex].temp.max) + '°C';
			tempMinFour.textContent =
				Math.floor(data.daily[dayIndex].temp.min) + '°C';

			// Fifth day
			d = new Date(data.daily[dayIndex].dt * 1000);
			dayName = days[d.getDay()];
			dayFive.textContent = dayName;
			whatWeather(weatherIconFive, data.daily[dayIndex].weather[0].id);
			dayIndex++;

			tempMaxFive.textContent =
				Math.floor(data.daily[dayIndex].temp.max) + '°C';
			tempMinFive.textContent =
				Math.floor(data.daily[dayIndex].temp.min) + '°C';

			// Sixth day
			d = new Date(data.daily[dayIndex].dt * 1000);
			dayName = days[d.getDay()];
			daySix.textContent = dayName;
			whatWeather(weatherIconSix, data.daily[dayIndex].weather[0].id);
			dayIndex++;

			tempMaxSix.textContent = Math.floor(data.daily[dayIndex].temp.max) + '°C';
			tempMinSix.textContent = Math.floor(data.daily[dayIndex].temp.min) + '°C';

			// Seventh day
			d = new Date(data.daily[dayIndex].dt * 1000);
			dayName = days[d.getDay()];
			daySeven.textContent = dayName;
			whatWeather(weatherIconSeven, data.daily[dayIndex].weather[0].id);
			dayIndex++;

			tempMaxSeven.textContent =
				Math.floor(data.daily[dayIndex].temp.max) + '°C';
			tempMinSeven.textContent =
				Math.floor(data.daily[dayIndex].temp.min) + '°C';
		})
		.catch((err) => console.error(err));
};

getWeather();
btn.addEventListener('click', getWeather);
input.addEventListener('keyup', enterCheck);
