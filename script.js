$(".btn_search").on("click", function (e) {
    e.preventDefault();
    $('.aside').append(
        `<i class="fas fa-bars sidebar_toggle"></i>`
    );
    $(".sidebar_toggle").on("click", function () {
        $(".sidebar_container").toggle();
        $(".sidebar_container").css('background-color', 'rgba(0, 0, 0, 0.6)');
        $('.input').css('margin','10px 0 0');
        $('.btn_search').css('margin','10px 0 0 10px');
        $('.btn_search').css('background-color','white');
        $('.btn_search').css('color','#474C65');
    });

    $(".weather_details").html("");
  $(".weather_preview").html("");

  $(".sidebar_container").hide();

  var currentWeather = {};

  var city = $("#city").val();
  console.log(city);

  var settings = {
    url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=84001e7bfdb9a6e78a0b7b03512f2b90&units=metric`,
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    // Collect Array Objects API
    // console.log(response);
    // Collect Temperature
    // console.log(response.main.temp);
    // Collect Sunrise
    // console.log(response.sys.sunrise);
    // Collect Sunset
    // console.log(response.sys.sunset);
    getCityName(response.coord.lon, response.coord.lat);
    currentWeather = response;
  });

  function getCityName(lon, lat) {
    var settings = {
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=ef8c46d94877be6e25c248a610296d01&units=metric`,
      method: "GET",
      timeout: 0,
    };

        $.ajax(settings).done(function (response) {
        // console.log(response.current.sunrise);
        const NowDateSunrise = response.current.sunrise;
        const NowDateSunset = response.current.sunset;
        // Date Sunrise Current
        const dSunrise = new Date(NowDateSunrise*1000);
        // Date Sunset Current
        const dSunset = new Date(NowDateSunset*1000);
        // Degrees only Int
        const degree = Math.round(response.current.temp);
        // Feels Like round
        const feelsLike = Math.round(response.current.feels_like);

        // Max Temp round
        const maxTemp = Math.round(currentWeather.main.temp_max);
        // Min Temp round
        const minTemp = Math.round(currentWeather.main.temp_min);


        var sunsetTime = new Date(dSunset).toLocaleString("en-US", { timeZone: response.timezone });
        var sunriseTime = new Date(dSunrise).toLocaleString("en-US", { timeZone: response.timezone });

        // console.log(sunsetTime);
        // SUNSET TIME
        var hourSunset = new Date(sunsetTime).getHours();
        var minuteSunset = new Date(sunsetTime).getMinutes();

        // SUNRISE TIME
        var hourSunrise = new Date(sunriseTime).getHours();
        var minuteSunrise = new Date(sunriseTime).getMinutes();
        // console.log(senseibleSunset + " : " + senseibleSunset1);

        const hour1 = new Date((response.hourly[0].dt)*1000);
        const hourNow = hour1.getHours();


         // console.log(Math.round(degree));
         // console.log(dSunset.getHours());
         // console.log(new Date(response.current.dt).getHours());
         // console.log(new Date(prueba*1000).getHours());
         // console.log(response.current.sunrise);
         // console.log(response.current.sunset);

        $(".weather_details").append(
        `<div class="weather_details__temp">
                <p class="weather_details_temp__city">${city}</p>
                <p class="weather_details_temp__degrees">${degree}º </p>
                <p class="weather_details_temp__feelsLike">feels like ${feelsLike}º</p>
            </div>
            <div class="weather_details__info">
                <div class="weather_details_info__sunrise">
                    <img class="weather_details_info__img" src="assets/icons/sunset.svg" alt="">
                    <p class="weather_details_info_sunrise__hour">${hourSunrise+':'+minuteSunrise}h</p>
                </div>
                <div class="weather_details_info__sunset">
                    <img src="assets/icons/sunset.svg" alt="sunsetIcon" class="weather_details_info__img">
                    <p class="weather_details_info_sunset__hour">${hourSunset+':'+minuteSunset}h</p>
                </div>
                <div class="weather_details_info__minTemp">
                    <img class="weather_details_info__img" src="assets/icons/coldTherm.svg" alt="">
                    <p class="weather_details_info_minTemp__data">${minTemp}º</p>
                </div>
                <div class="weather_details_info__maxTemp">
                    <img class="weather_details_info__img" src="assets/icons/hotTherm.svg" alt="">
                    <p class="weather_details_info_maxTemp__data">${maxTemp}º</p>
                </div>
            </div>`
    );
    response.hourly.forEach((e,i) => {
        // console.log(getSkyIcon(e.weather.main));
        if(i<=23){
            // Milliseconds to Hours
            const hour1 = new Date((e.dt)*1000);
            const hourNow = hour1.getHours();
            // Temp round
            const tempHour = Math.round(e.temp);


            $('.weather_hours').append(
                `<div class="weather_hours__container">
                <p class="weather_hours_container__hour">${hourNow}</p>
                <img class="weather_hours_container__icon" src="${getSkyIcon(e.weather[0].main)}" alt="">
                <p class="weather_hours_container__temp">${tempHour}º</p>
            </div>`
                )
        }
    });

      var temperatureFeel = getTemperatureState(
        Math.round(response.current.temp)
      ).feel;

      var daytime = getDaytime(
        response.timezone,
        response.current.sunrise,
        response.current.sunset
      );

      printWeatherPreviewResume(
        temperatureFeel,
        response.current.weather[0].main,
        daytime
      );

      var skyIcon = getSkyIcon(response.current.weather[0].main);
      console.log(skyIcon);
      printWeatherPreviewMain(skyIcon);

      getWeatherPreviewWind(
        response.current.wind_speed,
        response.current.wind_deg
      );
    });
  }
});

function getSkyIcon(sky) {

  var setSkyState;

  var skyState = {
    thunderstorm : "./assets/icons/thunder.svg",
    drizzle : "./assets/icons/rainy-2.svg",
    rain : "./assets/icons/rainy-5.svg",
    snow : "./assets/icons/snowy-3.svg",
    athmosphere : "./assets/icons/cloudy-day-1.svg",
    clear : "./assets/icons/day.svg",
    clouds : "./assets/icons/cloudy.svg",
  }

  switch (sky) {
    case "Thunderstorm":
      setSkyState = skyState.thunderstorm;
      break;
    case "Drizzle":
      setSkyState = skyState.drizzle;
      break;
    case "Rain":
      setSkyState = skyState.rain;
      break;
    case "Snow":
      setSkyState = skyState.snow;
      break;
    case "Atmosphere ":
      setSkyState = skyState.athmosphere;
      break;
    case "Clear":
      setSkyState = skyState.clear;
      break;
    case "Clouds":
      setSkyState = skyState.clouds;
      break;
    default:
      setSkyState = skyState.athmosphere;
  }

  return setSkyState;

}

function getTemperatureState(temperature) {
  var veryLow = {
    feel: "Very Cold",
    color: "white",
  };

  var low = {
    feel: "Cold",
    color: "blue",
  };

  var stable = {
    feel: "Warm",
    color: "green",
  };

  var high = {
    feel: "High",
    color: "orange",
  };

  var veryHigh = {
    feel: "Very High",
    color: "red",
  };

  var temperatureState =
    temperature <= 0
      ? veryLow
      : temperature <= 10
      ? low
      : temperature <= 20
      ? stable
      : temperature <= 30
      ? high
      : temperature >= 40
      ? veryHigh
      : null;

  return temperatureState;
}

function getDaytime(timezone, sunrise, sunset) {
  var currentTime = new Date().toLocaleString("en-US", { timeZone: timezone });

  console.log(currentTime);
  console.log(timezone);
  var sensibleFormat = new Date(currentTime);
  var currentTimeMilliseconds = sensibleFormat.getTime();

  var day = "day";
  var night = "night";

  var daytime =
    currentTimeMilliseconds > sunrise * 1000 &&
    currentTimeMilliseconds < sunset * 1000
      ? day
      : currentTimeMilliseconds < sunrise * 1000 ||
        currentTimeMilliseconds > sunset * 1000
      ? night
      : null;

  return daytime;
}

function printWeatherPreviewResume(feel, sky, daytime) {
  var weatherPreviewResume = $('<div class="weather_preview__resume"></div>');
  var resumeFeel = $(`<p class="resume_temp">${feel}</p>`);
  var resumeSky = $(`<p class="resume_sky">${sky}</p>`);
  var resumeDaytime = $(` <p class="resume_daytime">${daytime}</p>`);

  $(".weather_preview").append(weatherPreviewResume);
  weatherPreviewResume.append(resumeFeel);
  weatherPreviewResume.append(resumeSky);
  weatherPreviewResume.append(resumeDaytime);
}

function printWeatherPreviewMain(sky) {
  var weatherPreviewMain = $('<div class="weather_preview__main"></div>');
  var mainDate = $(`<p>${getCurrentDate()}</p>`);
  var mainWeekDay = $(`<p>${getCurrentWeekday()}</p>`);
  var mainIcon = $(`<img src="${sky}"/>`);

  $(".weather_preview").append(weatherPreviewMain);
  weatherPreviewMain.append(mainWeekDay);
  weatherPreviewMain.append(mainDate);
  weatherPreviewMain.append(mainIcon);
}

function getWeatherPreviewWind(speed, degrees) {
  var weatherPreviewWind = $('<div class="weather_preview__wind"></div>');
  var windSpeed = $(`<i class="wi wi-wind wi-from-e"></i>`);
  var windDregrees = $(`<i class="wi wi-wind wi-cloud"></i>`);

  $(".weather_preview").append(weatherPreviewWind);
  weatherPreviewWind.append(windSpeed);
  weatherPreviewWind.append(windDregrees);
}

function getCurrentDate() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var currentDate = `${day.toString()}/${
    month.toString() + 1
  }/${year.toString()}`;
  console.log(currentDate);
  return currentDate;
}

function getCurrentWeekday() {
  var date = new Date();
  var weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var currentWeekday = weekday[date.getDay()];
  console.log(currentWeekday);
  return currentWeekday;
}
