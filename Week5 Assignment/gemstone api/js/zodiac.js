// todo
console.log("ZODIAC");
var userId = '601868';
var apiKey = 'b66abd5e9c629a8abd16651341c9213e';
var data = 'JSON Request Data';
var api = "/basic_gem_suggestion"

// Returns A promiss

$("#generate-horoscope").click(function() {
  var latDefault = "19.2056";
  var lonDefault = "25.2056";

  var dates = $("#input1").val().split("/");
  // var fDates = $("#input2").val();

  console.log(dates);

  var reqData = {
    day : dates[1],
    month:dates[0],
    year:dates[2],
    hour:dates[3],
    min: dates[4],
    lat: latDefault,
    lon: lonDefault,
    tzone: 5.5
  }
  // var data = {Params:zodiac};
  console.log(reqData);
  $(".spinner-container").show();
  $.ajax({
    url: "https://json.astrologyapi.com/v1/basic_gem_suggestion",
    method: "POST",
    dataType:'json',
    headers: {
    "authorization": "Basic " + btoa(userId+":"+apiKey),
    "Content-Type":'application/json'
    },
    data:JSON.stringify(reqData)
  }).then(function(response) {
    console.log(response);
    // response.then(data => {
    //   console.log(data);
    // })
    $(".spinner-container").hide();
    $("#output").html(function() {
      let textOutput = `
      <p>Benefic: ${response.BENEFIC.name} <p/>
      <p>Life: ${response.LIFE.name}<p/>
      <p>Lucky: ${response.LUCKY.name}<p/>
      `;
      return textOutput;
    });
  }, function(err) {
    console.log(err);
  })


});
