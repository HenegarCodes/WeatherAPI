var btn = document.getElementById('search');
var inputSearch = document.getElementById('input');

const date = new Date();
var month = date.getMonth() + 1;
var day = date.getDate();
var year = date.getFullYear().toString().slice(-2);
var formattedDate = `${month}/${day}/${year}`;


btn.addEventListener('click', function () {
    var citySearched = inputSearch.value.trim();
    console.log(citySearched);
    var apiKey = 'aecc33e1f3ac606321129d5660f649cb';

    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&appid=${apiKey}`;
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })

        // look into metrics / units
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearched}&appid=${apiKey}`;
   fetch(forecastUrl)
   .then(response => response.json())
   .then(data => {
       console.log(data);

    // 4, 12, 20, 28, 36
    var lookup = [4,12,20,36,39]
    document.querySelectorAll(".card").forEach((el,i)=> {

        var listIndex = lookup[i]
        var info = data.list[listIndex]

        var formattedDate = info.dt_txt.split(" ")[0]
        var temperature = info.main.temp
        var humidity = info.main.humidity
        var windSpeed = info.wind.speed
        var iconCode = info.weather[0].icon

        /*
            {
                "dt": 1697457600,
                "main": {
                    "temp": 297.83,
                    "feels_like": 296.85,
                    "temp_min": 297.83,
                    "temp_max": 297.83,
                    "pressure": 1013,
                    "sea_level": 1013,
                    "grnd_level": 971,
                    "humidity": 19,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "clear sky",
                        "icon": "01n"
                    }
                ],
                "clouds": {
                    "all": 0
                },
                "wind": {
                    "speed": 2.03,
                    "deg": 66,
                    "gust": 2.65
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-10-16 12:00:00"
            }
            */


        var forecastHtml = `
        <div class="forecast-item">
            <p>Date: ${formattedDate}</p>
            <p>Temperature: ${temperature} °C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <img src="https://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">
        </div>
    `;
    el.innerHTML = forecastHtml

    })
   })

})


