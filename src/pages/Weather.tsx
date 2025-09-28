import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  MapPin,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Zap,
  Waves,
} from "lucide-react";
import axios from "axios";
import MarkdownDisplay from "@/components/Markdown";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState("Cape Town");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agriInsights, setAgriInsights] = useState("");

  const getInsights = async () => {
    const req = await fetch("https://agroapi.netlify.app/v1/ai/chat", {
      method: "POST",
      body: JSON.stringify({
        message: `Provide your brief insights to the farmer as 2nd person using the following weather input: ${JSON.stringify(
          weatherData
        )}, if weather input is null, give valuable insights
        currentPage: ${
          window.location.pathname
        }, farmerType: "Fruits & vegetables",

        Return sections of insights,riskAssessment,,seasonalPredictions, they must be in the first header #
        `,
      }),
    });
    const res = await req.json();
    if (res.response) {
      return res.response;
    }
  };

  function kelvinToCelsius(k) {
    return Math.round(k - 273.15); // round to whole °C
  }

  function groupForecastByDay(forecastList) {
    const days = {};

    forecastList.forEach((entry) => {
      const date = new Date(entry.dt * 1000);
      const dayKey = date.toISOString().split("T")[0];

      if (!days[dayKey]) {
        days[dayKey] = {
          date: dayKey,
          temps: [],
          humidities: [],
          windSpeeds: [],
          visibilities: [],
          uvs: [],
          weathers: [],
        };
      }

      const d = days[dayKey];

      d.temps.push(entry.main.temp);
      d.humidities.push(entry.main.humidity);
      d.windSpeeds.push(entry.wind.speed);
      d.visibilities.push(entry.visibility || 0);
      if (entry.uvi !== undefined) d.uvs.push(entry.uvi);
      d.weathers.push(entry.weather[0].description);
    });

    return Object.values(days)
      .map((day) => {
        const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

        const temp = kelvinToCelsius(avg(day.temps));
        const humidity = Math.round(avg(day.humidities));
        const wind = (avg(day.windSpeeds) * 3.6).toFixed(1); // m/s → km/h
        const visibility = (avg(day.visibilities) / 1000).toFixed(1); // m → km
        const uv = day.uvs.length ? Math.round(avg(day.uvs)) : "-";

        // most common weather description
        const count = {};
        day.weathers.forEach((w) => (count[w] = (count[w] || 0) + 1));
        const mainWeather = Object.keys(count).reduce((a, b) =>
          count[a] > count[b] ? a : b
        );

        return {
          date: day.date,
          temperature: `${temp}°C`,
          weather: mainWeather,
          humidity: `${humidity}%`,
          windSpeed: `${wind} km/h`,
          visibility: `${visibility} km`,
          uvIndex: uv,
        };
      })
      .slice(0, 5);
  }

  const getWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const req = await fetch(
            `https://api.agromonitoring.com/agro/1.0/weather/forecast?lat=${latitude}&lon=${longitude}&appid=${
              import.meta.env.VITE_AGRO_API_KEY
            }`
          );
          const res = await req.json();

          setWeatherData(groupForecastByDay(res));
        },
        () => {
          console.warn("Geolocation permission denied or unavailable");
        }
      );
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return Sun;
      case "partly-cloudy":
      case "partly cloudy":
        return Cloud;
      case "rainy":
        return CloudRain;
      case "snow":
        return CloudSnow;
      default:
        return Cloud;
    }
  };

  const getBackgroundGradient = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "bg-gradient-sunrise";
      case "rainy":
        return "bg-gradient-to-br from-gray-600 to-gray-800";
      case "cloudy":
      case "partly-cloudy":
      case "partly cloudy":
        return "bg-gradient-to-br from-blue-400 to-blue-600";
      default:
        return "bg-gradient-field";
    }
  };

  const fetchWeather = async () => {
    setLoading(true);

    setError("");

    try {
      // For demo purposes, we'll use mock data
      // In a real app, you would use: https://api.openweathermap.org/data/2.5/weather
      await getWeather();
      setAgriInsights(await getInsights());
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather().then(() => {
      localStorage.setItem("_weather", JSON.stringify(weatherData));
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 p-6 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <RefreshCw className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">
            Loading weather data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Weather Forecasting
          </h1>
          <p className="text-muted-foreground">
            Get accurate weather forecasts to optimize your farming decisions
          </p>
        </div>

        {weatherData && (
          <>
            {/* Current Weather */}
            <div
              className={`rounded-2xl p-8 mb-8 text-white animate-grow ${getBackgroundGradient(
                weatherData[0].weather
              )}`}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    {React.createElement(
                      getWeatherIcon(weatherData[0].weather),
                      {
                        className: "h-20 w-20 mr-4",
                      }
                    )}
                    <div>
                      <div className="text-6xl font-bold">
                        {weatherData[0].temperature}
                      </div>
                      <div className="text-xl opacity-90">
                        {weatherData[0].weather}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weather Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center mb-2">
                      <Droplets className="mr-2 h-4 w-4" />
                      <span className="text-sm opacity-90">Humidity</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {weatherData[0].humidity}
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center mb-2">
                      <Wind className="mr-2 h-4 w-4" />
                      <span className="text-sm opacity-90">Wind Speed</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {weather?.windSpeed} km/h
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <Card
              className="agri-card animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Thermometer className="mr-2 h-5 w-5 text-primary" />
                  5-Day Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {weatherData.map((day, index) => (
                    <div
                      key={index}
                      className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-all duration-300 hover:shadow-soft animate-grow"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="font-medium text-foreground mb-2">
                        {day.date}
                      </div>
                      {React.createElement(getWeatherIcon(day.weather), {
                        className: "h-12 w-12 mx-auto mb-2 text-primary",
                      })}
                      <div className="text-sm text-muted-foreground mb-2">
                        {day.weather}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">{day.temperature}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment - Worst Case Scenarios */}
            <Card
              className="agri-card mt-6 animate-slide-up"
              style={{ animationDelay: "500ms" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                  Risk Assessment & Worst-Case Scenarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* TODO: integrate climate risk assessment APIs here */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center mb-3">
                      <Sun className="h-6 w-6 text-red-500 mr-2" />
                      <span className="font-semibold text-red-700 dark:text-red-400">
                        Drought Risk
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Probability</span>
                        <Badge variant="destructive" className="text-xs">
                          High - 75%
                        </Badge>
                      </div>
                      <div className="w-full bg-red-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Extended dry period possible in next 2 months. Consider
                        water conservation.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center mb-3">
                      <Waves className="h-6 w-6 text-blue-500 mr-2" />
                      <span className="font-semibold text-blue-700 dark:text-blue-400">
                        Flooding Risk
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Probability</span>
                        <Badge variant="secondary" className="text-xs">
                          Medium - 35%
                        </Badge>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Heavy rainfall events may cause localized flooding in
                        low-lying areas.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center mb-3">
                      <Zap className="h-6 w-6 text-yellow-500 mr-2" />
                      <span className="font-semibold text-yellow-700 dark:text-yellow-400">
                        Severe Weather
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Probability</span>
                        <Badge variant="outline" className="text-xs">
                          Low - 15%
                        </Badge>
                      </div>
                      <div className="w-full bg-yellow-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Hailstorms and strong winds possible during peak summer
                        months.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mitigation Strategies */}
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">
                    Recommended Mitigation Strategies
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-foreground">
                        Drought Preparation
                      </h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Install drought-resistant crop varieties</li>
                        <li>• Implement water-efficient irrigation systems</li>
                        <li>• Create water storage reserves</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-foreground">
                        Flood Protection
                      </h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Improve field drainage systems</li>
                        <li>• Plant cover crops to prevent soil erosion</li>
                        <li>• Consider crop insurance coverage</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
