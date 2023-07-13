const apikey = "07e639a25f7f4bf707f513091ada97d6";
const formEl = document.querySelector("form");
const cityInputEl = document.getElementById("city-input");
const weatherDataEl = document.getElementById("weather-data"); 

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error("Network not available");
        }

        const data = await response.json()

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
        ]

        weatherDataEl.querySelector(
            ".icon"
            ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon"/>`;
        weatherDataEl.querySelector(
            ".temperature").textContent = `${temperature}°C`;
        weatherDataEl.querySelector(
            ".description").textContent = `${description}`;
        weatherDataEl.querySelector(
            ".details").innerHTML = details.map((detail)=> `<div>${detail}</div>`
            ).join("");
    


    } catch (error) {
        weatherDataEl.querySelector(
            ".icon"
            ).innerHTML = "-";
        weatherDataEl.querySelector(
            ".temperature").textContent = "-";
        weatherDataEl.querySelector(
            ".description").textContent = "Invalid city. Enter valid city";
        weatherDataEl.querySelector(
            ".details").innerHTML = "";
    }
}