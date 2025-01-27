// Replace this with your valid API key from WeatherAPI
const apiKey = '932f440f8cee4f05b3e15045252701';

// Function to fetch and display the current weather and forecast
function fetchWeather(city) {
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        // Display current weather and 7-day forecast
        displayCurrentWeather(data);
        displayForecast(data.forecast.forecastday);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error.message);
        alert('Could not fetch weather data. Please check your city name or API key.');
      });
  }
  
  // Function to display the current weather
  function displayCurrentWeather(data) {
    const current = data.current;
    const location = data.location;
  
    const weatherDetails = `
      <h2>Weather in ${location.name}, ${location.country}</h2>
      <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
      <p><strong>Condition:</strong> ${current.condition.text}</p>
      <p><strong>Wind Speed:</strong> ${current.wind_kph} km/h</p>
      <p><strong>Humidity:</strong> ${current.humidity}%</p>
      <img src="${current.condition.icon}" alt="Weather Icon">
    `;
  
    document.getElementById('weather-details').innerHTML = weatherDetails;
  }
  
  // Function to display the 7-day forecast
  function displayForecast(forecastDays) {
    const forecastHTML = forecastDays
      .map(day => {
        return `
          <div class="forecast-item">
            <p><strong>${new Date(day.date).toDateString()}</strong></p>
            <img src="${day.day.condition.icon}" alt="Weather Icon">
            <p><strong>Max:</strong> ${day.day.maxtemp_c}°C</p>
            <p><strong>Min:</strong> ${day.day.mintemp_c}°C</p>
            <p>${day.day.condition.text}</p>
          </div>
        `;
      })
      .join('');
  
    document.getElementById('forecast-details').innerHTML = forecastHTML;
  }
  
  // Add event listener to search button
  document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    if (city) {
      fetchWeather(city);
    } else {
      alert('Please enter a valid city name.');
    }
  });