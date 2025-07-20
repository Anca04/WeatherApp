package com.example.weatherapp;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.stereotype.Service;

@Service
public class WeatherService {
	// API key from Visual Crossing
	@Value("${weather.api.key}")
	private String apiKey;

	@Cacheable(value = "weather", key = "#location")
	public WeatherResponse getWeatherData(String location) {
		String url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
				+ location + "?unitGroup=metric&key=" + apiKey + "&include=current";

		// send a GET request
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<JsonNode> response = restTemplate.getForEntity(url, JsonNode.class);
		// get the response
		JsonNode root = response.getBody();

		// verify if status is 200, if I received the body of the response, and
		// if the meteo data exist
		if (!response.getStatusCode().is2xxSuccessful() ||
				root == null || root.get("currentConditions") == null) {
			throw new RuntimeException("Weather API error: invalid response or missing data.");
		}

		// finds the field currentConditions which contains the current weather
		JsonNode current = root.get("currentConditions");

		// extract data
		double temperature = current.get("temp").asDouble();
		double feelsLike = current.get("feelslike").asDouble();
		int humidity = (int) current.get("humidity").asDouble();
		String condition = current.get("conditions").asText();
		double windSpeed = current.get("windspeed").asDouble();
		int uvIndex = current.get("uvindex").asInt();
		String sunrise = current.get("sunrise").asText();
		String sunset = current.get("sunset").asText();

		return new WeatherResponse(location, temperature, feelsLike, humidity, condition, windSpeed, uvIndex, sunrise, sunset);
	}
}
