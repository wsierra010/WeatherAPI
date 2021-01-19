$(document)

$(".btn_search").on("click", function (e) {
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

    function getCityName(lon, lat) {
        var settings = {
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=ef8c46d94877be6e25c248a610296d01&units=metric`,
        method: "GET",
        timeout: 0,
        };

        $.ajax(settings).done(function (response) {
        const NowDate = response.current.sunrise;
        const d = new Date(NowDate*1000);
        console.log('La hora del amanecer es a las '+ d.getHours());
        // console.log(response);
        // console.log(response.current.temp);
        // console.log(response.current.sunrise);
        // console.log(response.current.sunset);
        });
    }
});

  currentDate()
  
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
