import React, { useState } from 'react';
import './Weather.css';

function Weather() {
    // get location, JSON response from backend, and the link from an image from
    // Unsplash
    const [city, setCity] = useState('');
    const [data, setData] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const fetchWeather = async (loc = null) => {
        // takes a background image from Unsplash based on the location
        const queryParam = encodeURIComponent(loc || city);
        const response = await fetch(`http://localhost:8080/weather?location=${queryParam}`);
        if (!response.ok) {
            alert("Error at backend");
            return;
        }

        // sends the requests, receives the response
        const json = await response.json();
        setData(json);
        setCity(loc || city);

        // send another requests to Unsplash and returns the first result,
        // the first image relevant to the location
        try {
            const imgRes = await fetch(`https://api.unsplash.com/search/photos?query=${queryParam}&client_id=YkHJO8gyB8AHZnAp_mYvHQvLuIcHTaUQyZLZlsb3GV8`);
            const imgJson = await imgRes.json();
            if (imgJson.results && imgJson.results.length > 0) {
                setImageUrl(imgJson.results[0].urls.full);
            } else {
                setImageUrl('');
            }
        } catch (e) {
            console.error('Error at image:', e);
            setImageUrl('');
        }
    };

    // return a relevant emoji based on the conditions of the weather
    const getWeatherIcon = (condition) => {
        if (!condition) return '❓';
        const c = condition.toLowerCase();
        if (c.includes('sun') || c.includes('clear')) return '☀️';
        if (c.includes('cloud')) return '☁️';
        if (c.includes('rain') || c.includes('drizzle')) return '🌧️';
        if (c.includes('thunder')) return '⛈️';
        if (c.includes('snow')) return '❄️';
        if (c.includes('mist') || c.includes('fog')) return '🌫️';
        return '🌡️';
    };

    // returns a suggestion about what to wear based on the temperature
    const getClothingSuggestion = (temp, condition) => {
        if (temp < 5) return "Wear a coat and a scarf 🧥🧣";
        if (temp < 15) return "Wear a jacket 🧥";
        if (temp > 25 && condition.includes('sun')) return "T-shirt and sunglasses 👕🕶️";
        if (condition.includes('rain')) return "Take an umbrella ☔";
        return "Dress comfy 👕👖";
    };

    // to obtain the current location
    const fetchWeatherByGeolocation = () => {
        if (!navigator.geolocation) {
            alert("Location not supported.");
            return;
        }
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            fetchWeather(`${latitude},${longitude}`);
        });
    };

    // the user interface
    return (
        <div
            className="weather-container dynamic-bg"
            style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
        >
            {!data && <h1 className="title">Weather App</h1>}
            <div className="weather-card">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        fetchWeather();
                    }}
                >
                    <input
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="Enter city"
                    />
                    <button type="submit">Get Weather</button>
                    <button type="button" onClick={fetchWeatherByGeolocation}>
                        Use my location
                    </button>
                </form>

                {data && (
                    <div>
                        <p><strong>Location:</strong> {data.location}</p>
                        <p><strong>Temperature:</strong> {data.temperature}°C</p>
                        <p><strong>Feels Like:</strong> {data.feelsLike}°C</p>
                        <p><strong>Humidity:</strong> {data.humidity}%</p>
                        <p><strong>Condition:</strong> {data.condition} {getWeatherIcon(data.condition)}</p>
                        <p><strong>Wind Speed:</strong> {data.windSpeed} km/h</p>
                        <p><strong>UV Index:</strong> {data.uvIndex}</p>
                        <p><strong>Sunrise:</strong> {data.sunrise}</p>
                        <p><strong>Sunset:</strong> {data.sunset}</p>
                        <p><strong>What to wear:</strong> {getClothingSuggestion(data.temperature, data.condition)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather;
