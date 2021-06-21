const weatherContainer=document.querySelector(".js-weather");

const API_KEY=,
  LC_COORDS="weather-coords";

function WEATHER_saveToLocal(coords){
  localStorage.setItem(LC_COORDS,JSON.stringify(coords));
}

function WEATHER_loadFromLocal(){
  return JSON.parse(localStorage.getItem(LC_COORDS));
}

function weatherInfo(json){
  console.log(json);
  const tempNow=json.main.temp,
    tempMax=json.main.temp_max,
    tempMin=json.main.temp_min,
    location=json.name;
  weatherContainer.innerHTML=`최저온도${tempMax}</br> 
    최고온도: ${tempMin}</br> 
    현재온도: ${tempNow}</br> 
    지역: ${location}`;
}

function displayWeather(coords){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`
    ).then(function(response){
      return response.json();
    }).then(weatherInfo);
}

function getCoordsSuccess(position){
  const latitude=position.coords.latitude;
  const longitude=position.coords.longitude;
  const coords={
    latitude,
    longitude
  };
  WEATHER_saveToLocal(coords);
  displayWeather(coords);
}

function getCoordsError(){
  console.log("please allow location service");
}

function getCoords(){
  navigator.geolocation.getCurrentPosition(getCoordsSuccess,getCoordsError);
}

function init(){
  const coords=WEATHER_loadFromLocal();
  if(coords){
    displayWeather(coords);
  }else{
    getCoords();
  }
} 

init();