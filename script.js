$(".btn_submit").on("click", function (e) {
e.preventDefault();

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
});

function getCityName(lon, lat){
    var settings = {
        "url": `https://api.openweathermap.org/data/2.5/onecall?lat=${lon}&lon=${lat}&exclude=hourly&appid=ef8c46d94877be6e25c248a610296d01`,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

});