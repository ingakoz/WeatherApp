


let now = new Date();
let days = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
let day = days[now.getDay()];

let hour= now.getHours();
hour= ("0" + hour).slice (-2);
let minutes= now.getMinutes();
minutes= ("0"+ minutes).slice(-2);
let months = [
  `Jan`,
  `Feb`,
  `March`,
  `April`,
  "`May",
  `June`,
  `July`,
  `Aug`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`
];
let month = months[now.getMonth()];
let today = now.getDate();
let formatDate = `${day}, ${month} ${today} , ${hour}:${minutes}`;
let p=document.querySelector("p");
p.innerHTML= `Last updated: <br /> ${formatDate}` ;

function formDate (timestamp){
  let date = new Date (timestamp * 1000);
  let day = date.getDay();
  let days= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  return days[day];

}

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay , index){
    if (index < 6){
  forecastHTML = forecastHTML + 
            `
            <div class="col-2">
                <strong>
                <div class="forecast-date">${formDate(forecastDay.dt)} </strong> </div>
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
                alt="" width="36"/>
                 <br />
                <div class="forecast-temperatures">
                    <span class="forecast-temperature-max">
                        ${Math.round(forecastDay.temp.max)}°
                    </span>
                    <span class="forecast-temperature-min">
                        ${Math.round(forecastDay.temp.min)}°
                    </span>
                </div>
            </div>
        `;
        }
  })
        forecastHTML = forecastHTML + `</div>`;


        forecastElement.innerHTML = forecastHTML;



}



function getForecast(coordinates){
  let api2= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=1591a667f6fc96d6e0e8c80981573a26&units=metric`;
  axios.get(api2).then(displayForecast);
}


function showTemp(response){
  let temperature= Math.round(response.data.main.temp);

  let tempElement= document.querySelector("#temperature");
  tempElement.innerHTML= `${temperature} `;

  let locatedCity = `${response.data.name}`;
  (city2).innerHTML= (`${locatedCity}`).toUpperCase();


  let describeEl=`${response.data.weather[0].main}`;
  (description).innerHTML = (`SKY: ${describeEl}`);

  let humidElement= `${response.data.main.humidity}`;
  (humid).innerHTML = (`HUMIDITY: ${humidElement} %`);

  let pressElement= `${response.data.main.pressure}`;
  (pressure).innerHTML = (`PRESSURE: ${pressElement} hPa`);

  let windElement = Math.round(response.data.wind.speed);
  (wind).innerHTML = (`WIND: ${windElement} km/h`);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);


  celTemperature = response.data.main.temp;
  
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#cities");
  (city2).innerHTML= (`${input.value}`).toUpperCase();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=1591a667f6fc96d6e0e8c80981573a26&units=metric`;
  axios.get(apiUrl).then(showTemp);
}



function locateMe(position){
  let latitude= position.coords.latitude;
  let longitude= position.coords.longitude;
  let apiSecond= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=1591a667f6fc96d6e0e8c80981573a26`;
  axios.get(apiSecond).then(showTemp);
  
}
function currentLoc(event){
  event.preventDefault();
navigator.geolocation.getCurrentPosition(locateMe);
}

let currentButton=document.querySelector("#buttonLocation");
currentButton.addEventListener ("click", currentLoc);

function showFahrTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector ("#temperature");
  celLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelTemp(event){
  event.preventDefault();
  celLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector ("#temperature");
    temperatureElement.innerHTML = Math.round(celTemperature);

}

let celTemperature = null;

let form = document.querySelector("#searching");
form.addEventListener("submit", searchCity);

let fahrenheitLink = document.querySelector("#fahr-link");
fahrenheitLink.addEventListener("click", showFahrTemp);

let celLink= document.querySelector("#cel-link");
celLink.addEventListener("click", showCelTemp);

