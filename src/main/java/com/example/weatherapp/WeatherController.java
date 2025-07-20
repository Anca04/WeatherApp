package com.example.weatherapp;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class WeatherController {
	private final WeatherService weatherService;

	public WeatherController(WeatherService weatherService) {
		this.weatherService = weatherService;
	}

	// returns the weather
	@GetMapping("/weather")
	public WeatherResponse getWeather(@RequestParam String location) {
		return weatherService.getWeatherData(location);
	}
}
