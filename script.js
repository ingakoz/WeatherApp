


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

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

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

