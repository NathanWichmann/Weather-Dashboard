// this is the api key that allows acces to the api 
var apiKey = "e3418ba2f79f3a5ca9fcb473c1215f42"
//connects the dom to the html 
var searchBtn = $('#searchBtn');
//creates a cityInput variable to has no assigned value
var cityInput;
var inputEll = "";
//this creates the history array that is stored to the local storage with a key name history or array 
var historyArr = JSON.parse(localStorage.getItem('history')) || [];
//this sets the variables lat and lon with no value 
var lat;
var lon;

document.getElementById("currentWeather").style.display = "none";
document.getElementById("weather").style.display = "none";
//this gets the uv index form the lat and lon coordinates api and creates the p tag to display the value and span is used b/c a p tag only takes text not number values 
function getUvIndex() {
    fetch(`http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then((data) => {

            var uvEl = $('<p>').text('UV Index: ');
            var span = $('<span>').text(data.value)

            $('#currentWeather .currentWeather').append(uvEl.append(span));

            if (data.value > 0 && data.value <= 2) {
                uvEl.attr('class', 'green');
            }
            else if (data.value > 2 && data.value <= 5) {
                uvEl.attr('class', 'yellow')
            }
            else if (data.value > 5 && data.value <= 7) {
                uvEl.attr('class', 'orange')
            }
            else if (data.value > 7 && data.value <= 10) {
                uvEl.attr('class', 'red')
            }
            else {
                uvEl.attr('class', 'purple')
            }

        });
}


function getWeatherForecast() {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then((data) => {
            // console.log('Fetch Response \n-------------');
            $('.forecast').empty();
            document.getElementById("weather").style.display = "block";

            for (let i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.indexOf('15:00:00') !== -1) {
                    console.log(data.list[i])

                    var skyConditions = data.list[i].weather[0].icon

                    console.log(data.list[i].weather[0].icon)



                    var icon = 'http://openweathermap.org/img/wn/' + skyConditions + '@2x.png';
                    console.log(icon);
                    var dataEl = data.list[i].dt_txt

                    var tempatureEl = data.list[i].main.temp
                    // var cityNameEl = data.list[i].name
                    var maxTempEl = data.list[i].main.temp_max
                    var minTemp = data.list[i].main.temp_min
                    var humidityEl = data.list[i].main.humidity

                    // this is your column: no class attached yet
                    var col = document.createElement('div');
                    var imgTag = document.createElement('img');
                    var card = document.createElement('div');
                    var cardBody = document.createElement('div');
                    var header6 = document.createElement('h6')
                    var cardText = document.createElement('p');
                    var cardTextEl = document.createElement('p');
                    var cardtext = document.createElement('p');
                    var cardtextE = document.createElement('p');

                    imgTag.setAttribute('src', icon);
                    card.setAttribute('class', 'card text-center rounded bg-primary text-white');
                    cardBody.setAttribute('class', 'card-body');
                    col.setAttribute('class', 'col')
                    header6.setAttribute('class', 'card-title text-bold');
                    cardText.setAttribute('class', 'card-text');
                    cardTextEl.setAttribute('class', 'card-text');
                    cardtext.setAttribute('class', 'card-text');
                    cardtextE.setAttribute('class', 'card-text');

                    header6.textContent = ("Date: " + dataEl);
                    cardTextEl.textContent = ("Temp: " + tempatureEl);
                    cardtext.textContent = ("Max Temp: " + maxTempEl);
                    cardText.textContent = ("Min Temp: " + minTemp);
                    cardtextE.textContent = ("Humidity: " + humidityEl);
                    card.append(cardBody);
                    cardBody.append(header6, imgTag, cardTextEl, cardtext, cardText, cardtextE);

                    $('.forecast').append(card)
                }
            }
        })
}





function getCurrentWeather() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then((data) => {
            $('#currentWeather').empty();
            document.getElementById("currentWeather").style.display = "block";
            // console.log('Fetch Response \n-------------');

            var card = $('<div>').addClass('currentWeather');

            var dateEl = $('<p>').text('Date: ' + moment().format("M/D/YYYY"))
            card.append(dateEl)
            $('#currentWeather').append(card)



            var cityEl = $('<p>').text('City: ' + data.name)
            card.append(cityEl);
            $('#currentWeather').append(card)

            var tempEl = $('<p>').text('Temperature: ' + data.main.temp);
            card.append(tempEl);
            $('#currentWeather').append(card);

            var feelsLike = $('<p>').text('Feels Like: ' + data.main.feels_like);
            card.append(feelsLike)
            $('#currentWeather').append(card);

            var wind = $('<p>').text('Wind Speed: ' + data.wind.speed);
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
            lat = data.coord.lat;
            lon = data.coord.lon;

            getUvIndex();

        });
};





searchBtn.on('click', function () {

    // console.log(input.val());
    cityInput = $('#input-search').val();

    if (historyArr.indexOf(cityInput) === -1) {

        historyArr.push(cityInput);
        localStorage.setItem('history', JSON.stringify(historyArr));
    }

    getCurrentWeather();
    getWeatherForecast();
});


function loadHistory() {
    //make list for history

    for (let i = 0; i < historyArr.length; i++) {
        // console.log(historyArr[i])
        var history = historyArr[i]
        var li = $('<li>').text(history)
        li.attr('id', 'list');
        li.attr('data', history);
        li.attr('class', 'list-group')
        console.log(history)
        historyList.prepend(history)
       
        

        //make li tags w/ a button inside
        //apend li tag to UL tag on html
        //button when clicked should call getCurrentWeather

    }

}

loadHistory();