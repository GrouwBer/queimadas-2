// Global variables
const API_KEY = 'da2103b2c4ce4f95af051626232503'; // Consider moving this to a secure environment variable
const API_BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';

// DOM elements
const elements = {
  city: document.getElementById('city'),
  country: document.getElementById('country'),
  searchCity: document.getElementById('search'),
  cityTemp: document.getElementById('temp'),
  weatherIcon: document.getElementById('weather-icon'),
  weatherDescription: document.getElementById('description'),
  weatherHumidity: document.getElementById('humidity'),
  hoursIcon: document.querySelectorAll('.hourly-icon'),
  hoursTemp: document.querySelectorAll('.hours-temp'),
  daysIcon: document.querySelectorAll('.days-icon'),
  nextDay: document.querySelectorAll('.prediction-day'),
  predictionDesc: document.querySelectorAll('.prediction-desc'),
  daysTemp: document.querySelectorAll('.days-temp'),
  currentTime: document.querySelector('.time'),
  currentDate: document.querySelector('.date'),
  aqi: document.querySelector('.aqi'),
  hamburger: document.querySelector('.hamburger'),
  slidebar: document.querySelector('.slidebar'),
};

const monthName = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const weekDays = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

// Main weather functionality
async function getWeatherReport(searchCity) {
  try {
    const response = await fetch(`${API_BASE_URL}?key=${API_KEY}&q=${searchCity}&days=7&aqi=yes&alerts=no`);
    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // TODO: Implement user-friendly error handling
  }
}

// function to ask and get current location


function updateWeatherUI(data) {
  updateCurrentWeather(data);
  updateHourlyForecast(data);
  updateDailyForecast(data);
  updateTime(data.location.tz_id);
}

function updateCurrentWeather(data) {
  elements.cityTemp.textContent = data.current.temp_c;
  elements.weatherDescription.textContent = data.current.condition.text;
  elements.weatherIcon.src = data.current.condition.icon;
  elements.weatherHumidity.textContent = `${data.current.humidity}%`;
  updateUVIndex(data.current.uv);
}

function updateHourlyForecast(data) {
  elements.hoursTemp.forEach((t, i) => {
    t.textContent = data.forecast.forecastday[0].hour[i].temp_c;
  });

  elements.hoursIcon.forEach((t, i) => {
    t.src = data.forecast.forecastday[0].hour[i].condition.icon;
  });
}

function updateDailyForecast(data) {
  elements.daysIcon.forEach((icon, index) => {
    icon.src = data.forecast.forecastday[index].day.condition.icon;
  });

  elements.daysTemp.forEach((temp, index) => {
    const day = data.forecast.forecastday[index].day;
    temp.innerHTML = `${Math.round(day.maxtemp_c)}°c<span> / </span>${Math.round(day.mintemp_c)}°c`;
  });

  elements.predictionDesc.forEach((d, index) => {
    d.textContent = data.forecast.forecastday[index].day.condition.text;
  });

  elements.nextDay.forEach((day, index) => {
    const date = new Date(data.forecast.forecastday[index].date);
    day.textContent = `${weekDays[date.getDay()]} ${date.getDate()}`;
  });
}

function updateTime(timezone) {
  const updateClock = () => {
    const now = new Date();
    const options = { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit' };

    // Check if timezone is valid
    if (timezone) {
      const localTime = now.toLocaleTimeString('pt-BR', options);
      elements.currentTime.textContent = localTime;
    } else {
      elements.currentTime.textContent = "Invalid timezone"; // Handle invalid timezone
    }
  };

  updateClock();
  setInterval(updateClock, 1000);

  // Setting the date based on timezone
  const today = new Date(); // Get the current date in UTC
  if (timezone) {
    today.toLocaleString('pt-BR', { timeZone: timezone });
  }
  elements.currentDate.textContent = `${today.getDate()} ${monthName[today.getMonth()]} ${today.getFullYear()}, ${weekDays[today.getDay()]}`;
}


// Event listeners
elements.hamburger.addEventListener('click', () => {
  elements.hamburger.classList.toggle('active');
  elements.slidebar.classList.toggle('active');
});
// Initialize weather app with default city
getWeatherReport('Pocos de Caldas');  