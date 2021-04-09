// this is the api key that allows acces to the api 
var apiKey = "e3418ba2f79f3a5ca9fcb473c1215f42"
//connects the dom to the html 
var searchBtn = $('#searchBtn');
//creates a cityInput variable to has no assigned value
var cityInput;
var historyList = $('.historyList ul')
var inputEll = "";
//this creates the history array that is stored to the local storage with a key name history or array 
var historyArr = JSON.parse(localStorage.getItem('history')) || [];
//this sets the variables lat and lon with no value 
var lat;
var lon;
//these stop the display of headings 
document.getElementById("currentWeather").style.display = "none";
document.getElementById("weather").style.display = "none";
//this gets the uv index form the lat and lon coordinates api and creates the p tag to display the value and span is used b/c a p tag only takes text not number values 
function getUvIndex() {
    fetch(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then((data) => {

            var uvEl = $('<p>').attr('id', 'uvEl').text('UV Index: ');
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

// this creates the 5 cards for the weather forcast and styles them 
function getWeatherForecast() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then((data) => {
            // console.log('Fetch Response \n-------------');
            $('.forecast').empty();
            document.getElementById("weather").style.display = "block";
            // for loop goes through the data.list array and then attaches to the 3:pm time only each of the 5 days 
            for (let i = 0; i < data.list.length; i++) {
                if (data.list[i].dt_txt.indexOf('15:00:00') !== -1) {
                    console.log(data.list[i])
                    // this creates the skyConditions variable that creates the icons 
                    var skyConditions = data.list[i].weather[0].icon

                    console.log(data.list[i].weather[0].icon)


                    // these are the sky conditions and icons 
                    var icon = 'https://openweathermap.org/img/wn/' + skyConditions + '@2x.png';
                    console.log(icon);
                    var dataEl = moment().format("M/D/YYYY")
                    // sets the temp, max, min and humidity 
                    var tempatureEl = data.list[i].main.temp
                    var maxTempEl = data.list[i].main.temp_max
                    var minTemp = data.list[i].main.temp_min
                    var humidityEl = data.list[i].main.humidity

                    // creates the div, img and p tags 
                    var col = document.createElement('div');
                    var imgTag = document.createElement('img');
                    var card = document.createElement('div');
                    var cardBody = document.createElement('div');
                    var header6 = document.createElement('h6')
                    var cardText = document.createElement('p');
                    var cardTextEl = document.createElement('p');
                    var cardtext = document.createElement('p');
                    var cardtextE = document.createElement('p');
                    // creates the cards for the forcast and styles them 
                    imgTag.setAttribute('src', icon);
                    card.setAttribute('class', 'card text-center rounded bg-primary text-white');
                    cardBody.setAttribute('class', 'card-body');
                    col.setAttribute('class', 'col')
                    header6.setAttribute('class', 'card-title text-bold');
                    cardText.setAttribute('class', 'card-text');
                    cardTextEl.setAttribute('class', 'card-text');
                    cardtext.setAttribute('class', 'card-text');
                    cardtextE.setAttribute('class', 'card-text');
                    // appends the cards to the variables 
                    header6.textContent = (dataEl);
                    cardTextEl.textContent = ("Temp: " + Math.round(tempatureEl) + '°C');
                    cardtext.textContent = ("Max Temp: " + Math.round(maxTempEl) + '°C');
                    cardText.textContent = ("Min Temp: " + Math.round(minTemp) + '°C');
                    cardtextE.textContent = ("Humidity: " + humidityEl + '%');
                    card.append(cardBody);
                    // creates the order they appear on the card 
                    cardBody.append(header6, imgTag, cardTextEl, cardtext, cardText, cardtextE);
                    // attaches to the html 
                    $('.forecast').append(card)

                }
            }
        })
}

// this function creates the current weather 
function getCurrentWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then((data) => {
            $('#currentWeather').empty();
            document.getElementById("currentWeather").style.display = "block";
            // console.log('Fetch Response \n-------------');

            var card = $('<div>').addClass('currentWeather');

            var dateEl = $('<p>').attr('id', 'date').text(moment().format("M/D/YYYY"))
            card.append(dateEl)
            $('#currentWeather').append(card)

            var cityEl = $('<h2>').addClass('cityName').text(data.name)
            card.append(cityEl);
            $('#currentWeather').append(card)

            var tempEl = $('<p>').text('Temperature: ' + Math.round(data.main.temp) + '°C');
            card.append(tempEl);
            $('#currentWeather').append(card);

            var feelsLike = $('<p>').text('Feels Like: ' + Math.round(data.main.feels_like) + '°C');
            card.append(feelsLike)
            $('#currentWeather').append(card);

            var wind = $('<p>').text('Wind Speed: ' + data.wind.speed + ' ' + 'km/h');
            card.append(wind)
            $('#currentWeather').append(card);

            var humidity = $('<p>').text('Humidity: ' + data.main.humidity + '%');
            card.append(humidity)
            $('#currentWeather').append(card);

            var tempMax = $('<p>').text('Max Temp: ' + Math.round(data.main.temp_max) + '°C');
            card.append(tempMax)
            $('#currentWeather').append(card);

            var tempMin = $('<p>').text('Min Temp: ' + Math.round(data.main.temp_min) + '°C');
            card.append(tempMin)
            $('#currentWeather').append(card);
            lat = data.coord.lat;
            lon = data.coord.lon;
            // attaches the uv index to the card 
            getUvIndex();



        });
};

// creates the searchBtn when clicked and attaches the user input to the html and the javascript and creates a value 
searchBtn.on('click', function () {
    // console.log(input.val());
    cityInput = $('#input-search').val();
    // generates the history arr to the local storage
    if (historyArr.indexOf(cityInput) === -1) {

        historyArr.push(cityInput);
        localStorage.setItem('history', JSON.stringify(historyArr))
    }

    getCurrentWeather();
    getWeatherForecast();
});

// this function puts the cityInput value in the history and creates the app calls again
function historySelect() {

    cityInput = this.value;
    getCurrentWeather();
    getWeatherForecast();

}

// this function loads the history arr 
function loadHistory() {
    //make list for history

    for (let i = 0; i < historyArr.length; i++) {
        var history = historyArr[i];
        var li = document.createElement('li')
        var buttonTagEl = document.createElement('button');
        // creates the button and sets the value to history 
        buttonTagEl.classList = 'list-group-item align-center';
        buttonTagEl.setAttribute('value', history);
        buttonTagEl.innerHTML = history;
        buttonTagEl.onclick = historySelect;

        li.append(buttonTagEl);

        var list = document.querySelector('.list-group');
        list.appendChild(li);

    }
};
//loads the history, is supposed to do so initially but doesnt 
loadHistory()







