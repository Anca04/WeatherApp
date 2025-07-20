package com.example.weatherapp;

import java.io.Serializable;

public class WeatherResponse implements Serializable {
	private static final long serialVersionUID = 1L;

	private final String location;
	private final double temperature;
	private final double feelsLike;
	private final int humidity;
	private final String condition;
	private final double windSpeed;
	private final int uvIndex;
	private final String sunrise;
	private final String sunset;

	public WeatherResponse(String location, double temperature, double feelsLike, int humidity, String condition, double windSpeed, int uvIndex, String sunrise, String sunset) {
		this.location = location;
		this.temperature = temperature;
		this.feelsLike = feelsLike;
		this.humidity = humidity;
		this.condition = condition;
		this.windSpeed = windSpeed;
		this.uvIndex = uvIndex;
		this.sunrise = sunrise;
		this.sunset = sunset;
	}

	public String getLocation() {
		return location;
	}

	public double getTemperature() {
		return temperature;
	}

	public double getFeelsLike() {
		return feelsLike;
	}

	public int getHumidity() {
		return humidity;
	}

	public String getCondition() {
		return condition;
	}

	public double getWindSpeed() {
		return windSpeed;
	}

	public int getUvIndex() {
		return uvIndex;
	}

	public String getSunrise() {
		return sunrise;
	}

	public String getSunset() {
		return sunset;
	}
}
