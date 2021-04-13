
function greet() {
  let now = new Date();
  let hour = now.getHours();
  if (hour >18 && hour < 4){
  alert (`Good evening!`);
  }else{
  alert (`Good morning!`);
  }
  }
  greet();

  

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
p.innerHTML= formatDate;


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



let form = document.querySelector("#searching");
form.addEventListener("submit", searchCity);

