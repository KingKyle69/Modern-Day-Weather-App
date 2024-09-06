const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

function getCurrentDateTime(offset) {
    const now = new Date();
    const localTime = new Date(now.getTime() + (offset * 1000) + (now.getTimezoneOffset() * 60 * 1000));
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return localTime.toLocaleString('en-US', options);
}

search.addEventListener('click', () => {
    const APIKey = '88fc2da1f2945102c2cf0523bde9123c';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;
                case 'Rain':
                    image.src = 'rain.png';
                    break;
                case 'Snow':
                    image.src = 'snow.png';
                    break;
                case 'Clouds':
                    image.src = 'cloud.png';
                    break;
                case 'Haze':
                    image.src = 'mist.png';
                    break;
                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            const currentDateTime = document.querySelector('.current-date-time');
            currentDateTime.innerHTML = getCurrentDateTime(json.timezone);

            
            const lat = json.coord.lat;
            const lon = json.coord.lon;

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily,alerts&units=metric&appid=${APIKey}`)
                .then(response => response.json())
                .then(oneCallData => {
                    const uvIndex = document.querySelector('.weather-details .uv-index span');
                    uvIndex.innerHTML = oneCallData.current.uvi.toFixed(1);
                    
                });

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
});
// Add this function to update the background
function updateBackground(weatherCondition) {
    const body = document.querySelector('body');

    body.classList.remove('clear', 'rain', 'snow', 'clouds', 'haze');
    body.classList.add(weatherCondition.toLowerCase());
}

// Modify the switch statement in your fetch request to call the updateBackground function
switch (json.weather[0].main) {
    case 'Clear':
        image.src = 'clear.png';
        updateBackground('Clear');
        break;
    case 'Rain':
        image.src = 'rain.png';
        updateBackground('Rain');
        break;
    case 'Snow':
        image.src = 'snow.png';
        updateBackground('Snow');
        break;
    case 'Clouds':
        image.src = 'cloud.png';
        updateBackground('Clouds');
        break;
    case 'Haze':
        image.src = 'mist.png';
        updateBackground('Haze');
        break;
    default:
        image.src = '';
}
function updateBackground(weatherCondition) {
    const body = document.querySelector('body');

    body.classList.remove('clear', 'rain', 'snow', 'clouds', 'haze');
    body.classList.add(weatherCondition.toLowerCase());
}
switch (json.weather[0].main) {
    case 'Clear':
        image.src = 'clear.png';
        updateBackground('Clear');
        break;
    case 'Rain':
        image.src = 'rain.png';
        updateBackground('Rain');
        break;
    case 'Snow':
        image.src = 'snow.png';
        updateBackground('Snow');
        break;
    case 'Clouds':
        image.src = 'cloud.png';
        updateBackground('Clouds');
        break;
    case 'Haze':
        image.src = 'mist.png';
        updateBackground('Haze');
        break;
    default:
        image.src = '';
}
placesAutocomplete.on('change', (e) => {
    const city = e.suggestion.name;
  
    if (city === '') return;
  
    // Your existing fetch request and processing logic goes here
  });  


  
