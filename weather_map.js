console.log("weather map");

/*
how to get one day of weather to appear with the html
 and then to five days
 */

/*==============================WEATHER SECTION========================================*/

//----------* DISPLAY THE WEATHER INFO ON THE MAP *------------------------------//

function displayWeatherInFiveDays (results){
    console.log(results);
    console.log(results.city.name)
    $('.cityDisplay').html(results.city.name);
    let fiveDaysForecast = [0, 9, 17, 25, 33];
    for(let i = 0; i <fiveDaysForecast.length; i++){
        console.log(results.list[fiveDaysForecast[i]])

        // displaying the temperature, icon, desc, hum, wind, press
       $('.date').eq(i).html(results.list[fiveDaysForecast[i]].dt_txt.split(" ")[0]);
        $('.temperature').eq(i).html(results.list[fiveDaysForecast[i]].main.temp_max+"/"+results.list[fiveDaysForecast[i]].main.temp_min+ "'F");
        $('img').eq(i).attr("src", "http://openweathermap.org/img/w/" + results.list[fiveDaysForecast[i]].weather[0].icon+ ".png")
        $('.description').eq(i).html("Description: " +results.list[fiveDaysForecast[i]].weather[0].description);
        $('.humidity').eq(i).html("Humidity: " +results.list[fiveDaysForecast[i]].main.humidity);
        $('.wind').eq(i).html("Wind: "+results.list[fiveDaysForecast[i]].wind.speed);
        $('.pressure').eq(i).html("Pressure: " +results.list[fiveDaysForecast[i]].main.pressure);
    }
}

// Submit city function
$('#find').click(function(e){
    e.preventDefault()
    let userCity = $('#city').val();
    $.get("https://api.openweathermap.org/data/2.5/forecast", {
        q: userCity,
        appid: openWeatherKey,
        units:"imperial"
    }).done(displayWeatherInFiveDays);
})

// original loading page
$.get("https://api.openweathermap.org/data/2.5/forecast", {
    q: "Killeen, US",
    appid: openWeatherKey,
    units:"imperial"
}).done(displayWeatherInFiveDays);

/*================================MAPBOX PORTION ==================================*/

mapboxgl.accessToken = mapboxToken;

// var marcoMap = new mapboxgl.Map({
//     container: "map",
//     style: "mapbox://styles/mapbox/light-v10",
//     center: [-98.4861, 29.426],
//     zoom: 10
// });
//
// geocode("5002 Prewitt Ranch Road, Killeen, TX 76549", mapboxToken).then(function(results){
//     var popup = new mapboxgl.Popup()
//         .setHTML('<h6>Thanks Geocode</h6>')
//     new mapboxgl.Marker()
//         .setLngLat(results)
//         .setPopup(popup)
//         .addTo(marcoMap)
//     marcoMap.flyTo({center: results})
// })

let map = new mapboxgl.Map({
    container: 'maps',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-97.73136, 31.09296],
    zoom: 10
});

var AsianBuffetMarker = new mapboxgl.Marker()
    .setLngLat([-97.73136, 31.09296])
    .addTo(map)

var AsianBuffetPopup = new mapboxgl.Popup()
    .setLngLat([-97.73136, 31.09296])
    .setHTML("<h6><em>Asian Buffet!</em></h6>")
    .addTo(map)

AsianBuffetMarker.setPopup(AsianBuffetPopup);

$('#find').click(function(e){
    e.preventDefault()
    let userCityLocation = $('#city').val();
geocode(userCityLocation, mapboxToken).then(function(results){
    var popup = new mapboxgl.Popup()
        .setHTML('<h6>Thanks Geocode</h6>')
    new mapboxgl.Marker()
        .setLngLat(results)
        .setPopup(popup)
        .addTo(map)
    map.flyTo({center: results})
})});