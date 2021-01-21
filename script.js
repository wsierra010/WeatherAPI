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

      var backgroundColor = getTemperatureState(
        Math.round(response.current.temp)
      ).color;

      printBackgroundColor(backgroundColor);

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
      
      printWeatherPreviewMain(skyIcon);

      var speedState = getWindSpeedState(response.current.wind_speed);
      var degreesIcon = getWindDegreesState(response.current.wind_deg).icon;
      var degreesText = getWindDegreesState(response.current.wind_deg).text;
     
      getWeatherPreviewWind(
        response.current.wind_speed,
        speedState,
        degreesText,
        degreesIcon
      );
    });
  }
});


function getSkyIcon(sky) {
  var setSkyState;

  var skyState = {
    thunderstorm: "./assets/icons/thunder.svg",
    drizzle: "./assets/icons/rainy-2.svg",
    rain: "./assets/icons/rainy-5.svg",
    snow: "./assets/icons/snowy-3.svg",
    athmosphere: "./assets/icons/cloudy-day-1.svg",
    clear: "./assets/icons/day.svg",
    clouds: "./assets/icons/cloudy.svg",
  };

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

function getWindSpeedState(speed) {

  var windSpeedState = {
    calm: "./assets/icons/wind-icons/calm.png",
    lightAir: "./assets/icons/wind-icons/light-air.png",
    lightBreeze: "./assets/icons/wind-icons/light-breeze.png",
    gentleBreeze: "./assets/icons/wind-icons/gentle-breeze.png",
    moderateBreeze: "./assets/icons/wind-icons/moderate-breeze.png",
    freshBreeze: "./assets/icons/wind-icons/fresh-breeze.png",
    strongBreeze: "./assets/icons/wind-icons/strong-breeze.png",
    moderateGale: "./assets/icons/wind-icons/moderate-gal.png",
    freshGale: "./assets/icons/wind-icons/fresh-gale.png",
    strongGale: "./assets/icons/wind-icons/strong-gale.png",
    wholeGale: "./assets/icons/wind-icons/whole-gale.png",
    storm: "./assets/icons/wind-icons/storm.png",
    hurricane: "./assets/icons/wind-icons/hurricane.png",
  };

  var setWindSpeedState =
    speed < 0.5
      ? windSpeedState.calm
      : speed < 1.6
      ? windSpeedState.lighAir
      : speed < 3.3
      ? windSpeedState.lightBreeze
      : speed < 5.5
      ? windSpeedState.gentleBreeze
      : speed < 8
      ? windSpeedState.moderateBreeze
      : speed < 10.8
      ? windSpeedState.freshBreeze
      : speed < 13.8
      ? windSpeedState.strongBreeze
      : speed < 17.2
      ? windSpeedState.moderateGale
      : speed < 20.8
      ? windSpeedState.freshGale
      : speed < 24.7
      ? windSpeedState.strongGale
      : speed < 28.6
      ? windSpeedState.wholeGale
      : speed < 32.7
      ? windSpeedState.storm
      : speed > 32.7
      ? windSpeedState.hurricane
      : null;

  return setWindSpeedState;
}

function getWindDegreesState(degrees) {

  var windDegreesState = {
    n: {
      icon: "north",
      text: "N",
    },
    ne: {
      icon: "northEast",
      text: "NE",
    },
    e: {
      icon: "east",
      text: "E"
    },
    se: {
      icon: "southEast",
      text: "SE",
    },
    s: {
      icon: "south",
      text: "S",
    },
    sw: {
      icon: "southWest",
      text: "SW",
    },
    w: {
      icon: "west",
      text: "W",
    },
    nw: {
      icon: "northWest",
      text: "NW"
    },
  }

  var setWindDegreesState = 
    degrees < 11.25
    ? windDegreesState.n:
    degrees < 56.25
    ?windDegreesState.ne:
    degrees < 101.25
    ? windDegreesState.e:
    degrees < 146.25
    ?windDegreesState.se:
    degrees < 191.25
    ? windDegreesState.s:
    degrees < 236.25
    ? windDegreesState.sw:
    degrees < 281.25
    ? windDegreesState.nw:
    degrees < 326.25
    ? windDegreesState.s:
    null;

    return setWindDegreesState;
}

function getTemperatureState(temperature) {
  var veryLow = {
    feel: " Freezing cold",
    color: "linear-gradient(to right, #F6CFFE , #F5D1F6)",
  };

  var low = {
    feel: "Cold",
    color: "linear-gradient(to right, #CFE9FE , #B0CAE6)",
  };

  var stable = {
    feel: "Warm",
    color: "linear-gradient(to right, #FBFF8E, #B6CD74)",
  };

  var high = {
    feel: "High",
    color: "linear-gradient(to right, #FEDDC0 , #E5C28C)",
  };

  var veryHigh = {
    feel: "Very High",
    color: "linear-gradient(to right, #C57265 , #EFCAA2)",
  };

  var temperatureState =
    temperature <= 0
      ? veryLow
      : temperature <= 12
      ? low
      : temperature <= 23
      ? stable
      : temperature <= 32
      ? high
      : temperature > 32
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

function printBackgroundColor (color) {
  $("body").css("background-image", `${color}`)
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

function getWeatherPreviewWind(speed, sepeedIcon, degrees, degreesIcon) {
  var speedKmH = Math.round((speed * (60 * 60)) / 1000);
  var weatherPreviewWind = $('<div class="weather_preview__wind"></div>');
  var divSpeed = $('<div class="wind_speed"></div>')
  var windSpeedIcon = $(`<img src="${sepeedIcon}"></i>`);
  var windSpeed = $(`<p>${speedKmH} km/h</p>`);
  var divDegrees = $('<div class="wind_degrees"></div>')
  var windDegrees = $(`<p>${degrees}</p>`);
  var windDregreesIcon = $(`<img src="./assets/icons/compass1.svg" class="${degreesIcon}"/>`);

  $(".weather_preview").append(weatherPreviewWind);
  weatherPreviewWind.append(divSpeed);
  divSpeed.append(windSpeedIcon);
  divSpeed.append(windSpeed);
  weatherPreviewWind.append(divDegrees);
  divDegrees.append(windDregreesIcon);
  divDegrees.append(windDegrees);
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
