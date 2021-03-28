var apiKey = "8fd343e8e0a625fd4fe2e99e70b356cb"

var citySearch = "";

 var searchBtn = $('#searchBtn');
 var input = $('#input-search');
 var search = $('#forecast');




var city = "ottawa";



function getWeatherForecast() {
 fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
 .then(response => response.json())
     .then((data) =>{
        console.log('Fetch Response \n-------------');
        
        for (let i = 0; i < data.list.length; i++) {
        //    console.log(data.list[i])
            
     if(data.list[i].dt_txt.indexOf('15:00:00') !== -1){
         console.log(data.list[i])
         
         var card = $('<div>');
         var tempE = $('<p>').text('Temperature: ' + data.main.weather.array());
         card.append(tempE);
            $('#forecast').append(card);

         
    }
     
        }
    });
}


//  var card = $('<div>');
        //  var dayOne = $(('<p>').text('Day One: ' + data.main.temp))
        //  card.append(dayOne);
        //  $('#forecast').append(card)
        //  console.log(dayOne)

function getCurrentWeather(){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
        .then((data) =>{

            // console.log('Fetch Response \n-------------');
            // var date = $('<p>').text()
        
            // console.log('citySearch', citySearch)
            var card = $('<div>');
            var tempEl = $('<p>').text('Temperature: ' + data.main.temp);

            card.append(tempEl);
            $('#currentWeather').append(card);

            var feelsLike = $('<p>').text('Feels Like: ' + data.main.feels_like);
            card.append(feelsLike)
            $('#currentWeather').append(card);

            var wind =  $('<p>').text('Wind Speed: ' + data.wind.speed);
            card.append(wind)
            $('#currentWeather').append(card);

            var humidity = $('<p>').text('Humidity: ' + data.main.humidity);
            card.append(humidity)
            $('#currentWeather').append(card);

            var tempMax = $('<p>').text('Temp Max: ' + data.main.temp_max);
            card.append(tempMax)
            $('#currentWeather').append(card);

            var tempMin = $('<p>').text('Temp Min: ' + data.main.temp_min);
            card.append(tempMin)
            $('#currentWeather').append(card);
            


        });
    //get current weather data
    //create some dynamic elements
    //with the data from api call, we will pass this data to the new elements we just created
    //then append new elemnets to html
};





        searchBtn.on('click', function () {

            // console.log(input.val());
            citySearch = input.val();
            search = input.val();
            getCurrentWeather();
            getWeatherForecast();

        });