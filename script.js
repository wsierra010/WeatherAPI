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
    console.log(response);
  });
});
