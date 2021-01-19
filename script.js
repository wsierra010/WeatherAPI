$(document)

$(".btn_search").on("click", function (e) {
    e.preventDefault();

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

        const prueba = response.daily[0].dt;

        console.log(dSunset.getHours());
        console.log(new Date(response.current.dt).getHours());
        console.log(new Date(prueba*1000).getHours());
        // console.log(response.current.sunrise);
        // console.log(response.current.sunset);

        $('.weather_details').html('');
        $('.weather_details').append(
            `<div class="weather_details__temp">
                <p class="weather_details_temp__city">${city}</p>
                <p class="weather_details_temp__degrees">${response.current.temp}º </p>
                <p class="weather_details_temp__feelsLike">feels like ${response.current.feels_like}º</p>
            </div>
            <div class="weather_details__info">
                <div class="weather_details_info__sunset">
                    <img class="weather_details_info__img" src="http://dummyimage.com/40x40/4d494d/686a82.gif&text=" alt="placeholder+image">
                    <p class="weather_details_info_sunset__hour">${hourSunrise+':'+minuteSunrise}h</p>
                </div>
                <div class="weather_details_info__sunrise">
                    <img class="weather_details_info__img" src="http://dummyimage.com/40x40/4d494d/686a82.gif&text=" alt="placeholder+image">
                    <p class="weather_details_info_sunrise__hour">${hourSunset+':'+minuteSunset}</p>
                </div>
                <div class="weather_details_info__minTemp">
                    <img src="http://dummyimage.com/40x40/4d494d/686a82.gif&text=" alt="placeholder+image">
                    <p class="weather_details_info_minTemp__data">min: ${currentWeather.main.temp_min}º</p>
                </div>
                <div class="weather_details_info__maxTemp">
                    <img src="http://dummyimage.com/40x40/4d494d/686a82.gif&text=" alt="placeholder+image">
                    <p class="weather_details_info_maxTemp__data">max: ${currentWeather.main.temp_max}º</p>
                </div>
            </div>`
        );
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
function currentWeekday() {
    var date = new Date();
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var currentWeekday = weekday[date.getDay()];
    console.log(currentWeekday);
}

$(".sidebar_toggle").on("click", function(){
    $(".sidebar_container").toggle();
})

$(document).ready(function () {

});
