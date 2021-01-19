$(document)

$(".btn_search").on("click", function (e) {
    e.preventDefault();
    $('.weather_details').html('');
    $('.weather_preview').html('');


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
        currentWeather=response;
    });

    function getCityName(lon, lat) {
        var settings = {
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=ef8c46d94877be6e25c248a610296d01&units=metric`,
        method: "GET",
        timeout: 0,
        };

        $.ajax(settings).done(function (response) {
        const NowDateSunrise = response.current.sunrise;
        const NowDateSunset = response.current.sunset;
        // Date Sunrise Current
        const dSunrise = new Date(NowDateSunrise*1000);
        const hourSunrise = dSunrise.getHours();
        const minuteSunrise = dSunrise.getMinutes();
        // Date Sunset Current
        const dSunset = new Date(NowDateSunset*1000);
        const hourSunset = dSunset.getHours();
        const minuteSunset = dSunset.getMinutes();
        // Degrees only Int
        const degree = Math.round(response.current.temp);
        // Feels Like round
        const feelsLike = Math.round(response.current.feels_like);

        // console.log(Math.round(degree));
        // console.log(dSunset.getHours());
        // console.log(new Date(response.current.dt).getHours());
        // console.log(new Date(prueba*1000).getHours());
        // console.log(response.current.sunrise);
        // console.log(response.current.sunset);

        $('.weather_details').append(
            `<div class="weather_details__temp">
                <p class="weather_details_temp__city">${city}</p>
                <p class="weather_details_temp__degrees">${degree}º </p>
                <p class="weather_details_temp__feelsLike">feels like ${feelsLike}º</p>
            </div>
            <div class="weather_details__info">
                <div class="weather_details_info__sunset">
                    <img class="weather_details_info__img" src="http://dummyimage.com/40x40/4d494d/686a82.gif&text=" alt="placeholder+image">
                    <p class="weather_details_info_sunset__hour">${hourSunrise+':'+minuteSunrise}h</p>
                </div>
                <div class="weather_details_info__sunrise">
                    <img class="weather_details_info__img" src="http://dummyimage.com/40x40/4d494d/686a82.gif&text=" alt="placeholder+image">
                    <p class="weather_details_info_sunrise__hour">${hourSunset+':'+minuteSunset}h</p>
                </div>
                <div class="weather_details_info__minTemp">
                    <img class="weather_details_info_img" src="http://dummyimage.com/40x40/4d494d/686a82.gif&text=" alt="placeholder+image">
                    <p class="weather_details_info_minTemp__data">min: ${currentWeather.main.temp_min}º</p>
                </div>
                <div class="weather_details_info__maxTemp">
                    <img class="weather_details_info_img" src="http://dummyimage.com/40x40/4d494d/686a82.gif&text=" alt="placeholder+image">
                    <p class="weather_details_info_maxTemp__data">max: ${currentWeather.main.temp_max}º</p>
                </div>
            </div>`
        );

        getWeatherPreviewResume(response.current.weather[0].main);
        getWeatherPreviewMain(response.current.weather[0].main);
        getWeatherPreviewWind(response.current.wind_speed,response.current.wind_deg);


        });
}

});

currentDate();
function currentDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var currentDate = `${day.toString()}/${month.toString() + 1}/${year.toString()}`;
    console.log(currentDate);
}

currentWeekday();

function getWeatherPreviewResume(sky){

    var weatherPreviewResume = $('<div class="weather_preview__resume"></div>');
    var resumeTemp = $(`<p class="resume_temp">Cold</p>`);
    var resumeSky = $(`<p class="resume_sky">${sky}</p>`);
    var resumeDaytime = $(` <p class="resume_daytime">day</p>`)

    $(".weather_preview").append(weatherPreviewResume);
    weatherPreviewResume.append(resumeTemp);
    weatherPreviewResume.append(resumeSky);
    weatherPreviewResume.append(resumeDaytime);

    console.log(sky);
}

function getWeatherPreviewMain(sky){

    var weatherPreviewMain = $('<div class="weather_preview__main"></div>');
    var mainDate = $(`<p>${currentDate()}</p>`)
    var mainWeekDay = $(`<p>${currentWeekday()}</p>`)
    var mainIcon = $(`<img src="./assets/icons/cloudy-day-1.svg"/>`)

    $(".weather_preview").append(weatherPreviewMain);
    weatherPreviewMain.append(mainWeekDay);
    weatherPreviewMain.append(mainDate);
    weatherPreviewMain.append(mainIcon);

}

function getWeatherPreviewWind(speed, degrees){

    var weatherPreviewWind = $('<div class="weather_preview__wind"></div>');
    var windSpeed = $(`<i class="wi wi-wind wi-from-e"></i>`)
    var windDregrees = $(`<i class="wi wi-wind wi-cloud"></i>`)

    $(".weather_preview").append(weatherPreviewWind);
    weatherPreviewWind.append(windSpeed);
    weatherPreviewWind.append(windDregrees);

}


function currentDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var currentDate = `${day.toString()}/${month.toString() + 1}/${year.toString()}`;
    console.log(currentDate);
    return currentDate;
}



function currentWeekday() {
    var date = new Date();
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var currentWeekday = weekday[date.getDay()];
    console.log(currentWeekday);
    return currentWeekday;
}

$(".sidebar_toggle").on("click", function(){
    $(".sidebar_container").toggle();
})
