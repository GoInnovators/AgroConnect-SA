import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  Waves
} from 'lucide-react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState('Cape Town');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock weather data for demo
  const mockWeatherData = {
    current: {
      temp: 22,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      visibility: 10,
      uvIndex: 6,
      icon: 'partly-cloudy'
    },
    forecast: [
      { day: 'Today', high: 24, low: 18, condition: 'Partly Cloudy', icon: 'partly-cloudy' },
      { day: 'Tomorrow', high: 26, low: 19, condition: 'Sunny', icon: 'sunny' },
      { day: 'Friday', high: 23, low: 16, condition: 'Rainy', icon: 'rainy' },
      { day: 'Saturday', high: 21, low: 15, condition: 'Cloudy', icon: 'cloudy' },
      { day: 'Sunday', high: 25, low: 18, condition: 'Sunny', icon: 'sunny' }
    ]
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return Sun;
      case 'partly-cloudy':
      case 'partly cloudy':
        return Cloud;
      case 'rainy':
        return CloudRain;
      case 'snow':
        return CloudSnow;
      default:
        return Cloud;
    }
  };

  const getBackgroundGradient = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return 'bg-gradient-sunrise';
      case 'rainy':
        return 'bg-gradient-to-br from-gray-600 to-gray-800';
      case 'cloudy':
      case 'partly-cloudy':
      case 'partly cloudy':
        return 'bg-gradient-to-br from-blue-400 to-blue-600';
      default:
        return 'bg-gradient-field';
    }
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    
    try {
      // For demo purposes, we'll use mock data
      // In a real app, you would use: https://api.openweathermap.org/data/2.5/weather
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setWeather(mockWeatherData.current);
      setForecast(mockWeatherData.forecast);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 p-6 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <RefreshCw className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Weather Forecasting</h1>
          <p className="text-muted-foreground">
            Get accurate weather forecasts to optimize your farming decisions
          </p>
        </div>

        {/* Location Input */}
        <Card className="agri-card mb-8 animate-slide-up">
          <CardContent className="p-6">
            <form onSubmit={handleLocationSubmit} className="flex gap-4">
              <div className="flex-1">
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location (e.g., Cape Town)"
                  className="border-primary/20 focus:border-primary"
                />
              </div>
              <Button type="submit" className="agri-button" disabled={loading}>
                <MapPin className="mr-2 h-4 w-4" />
                Update Location
              </Button>
            </form>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </CardContent>
        </Card>

        {weather && (
          <>
            {/* Current Weather */}
            <div className={`rounded-2xl p-8 mb-8 text-white animate-grow ${getBackgroundGradient(weather.condition)}`}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <MapPin className="mr-2 h-5 w-5" />
                    <span className="text-lg">{location}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    {React.createElement(getWeatherIcon(weather.condition), { 
                      className: "h-20 w-20 mr-4" 
                    })}
                    <div>
                      <div className="text-6xl font-bold">{weather.temp}°C</div>
                      <div className="text-xl opacity-90">{weather.condition}</div>
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
                    <div className="text-2xl font-bold">{weather.humidity}%</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center mb-2">
                      <Wind className="mr-2 h-4 w-4" />
                      <span className="text-sm opacity-90">Wind Speed</span>
                    </div>
                    <div className="text-2xl font-bold">{weather.windSpeed} km/h</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center mb-2">
                      <Eye className="mr-2 h-4 w-4" />
                      <span className="text-sm opacity-90">Visibility</span>
                    </div>
                    <div className="text-2xl font-bold">{weather.visibility} km</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center mb-2">
                      <Sun className="mr-2 h-4 w-4" />
                      <span className="text-sm opacity-90">UV Index</span>
                    </div>
                    <div className="text-2xl font-bold">{weather.uvIndex}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <Card className="agri-card animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Thermometer className="mr-2 h-5 w-5 text-primary" />
                  5-Day Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {forecast.map((day, index) => (
                    <div 
                      key={index} 
                      className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-all duration-300 hover:shadow-soft animate-grow"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="font-medium text-foreground mb-2">{day.day}</div>
                      {React.createElement(getWeatherIcon(day.condition), { 
                        className: "h-12 w-12 mx-auto mb-2 text-primary" 
                      })}
                      <div className="text-sm text-muted-foreground mb-2">{day.condition}</div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">{day.high}°</span>
                        <span className="text-muted-foreground">{day.low}°</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Agricultural Insights & Seasonal Predictions */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Card className="agri-card animate-slide-up" style={{ animationDelay: '300ms' }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sun className="mr-2 h-5 w-5 text-primary" />
                    Agricultural Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Crop Recommendations</h3>
                      <div className="space-y-2">
                        <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-sm">Ideal conditions for maize planting</span>
                        </div>
                        <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                          <span className="text-sm">Monitor tomato crops for humidity stress</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Irrigation Advice</h3>
                      <div className="space-y-2">
                        <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-sm">Reduce irrigation by 20% due to forecast rain</span>
                        </div>
                        <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          <span className="text-sm">Optimal soil moisture expected this week</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="agri-card animate-slide-up" style={{ animationDelay: '400ms' }}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                    Seasonal Predictions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* TODO: integrate seasonal weather prediction APIs here */}
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border-l-4 border-orange-500">
                      <div className="flex items-center mb-2">
                        <Sun className="h-4 w-4 text-orange-500 mr-2" />
                        <span className="font-medium text-sm">Summer Outlook</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Above-average temperatures expected. Plan for increased irrigation needs.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-center mb-2">
                        <CloudRain className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="font-medium text-sm">Rainfall Forecast</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Normal to above-normal rainfall predicted for next 3 months.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-center mb-2">
                        <TrendingDown className="h-4 w-4 text-green-500 mr-2" />
                        <span className="font-medium text-sm">Growing Season</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Extended growing season likely due to favorable conditions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Assessment - Worst Case Scenarios */}
            <Card className="agri-card mt-6 animate-slide-up" style={{ animationDelay: '500ms' }}>
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
                      <span className="font-semibold text-red-700 dark:text-red-400">Drought Risk</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Probability</span>
                        <Badge variant="destructive" className="text-xs">High - 75%</Badge>
                      </div>
                      <div className="w-full bg-red-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Extended dry period possible in next 2 months. Consider water conservation.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center mb-3">
                      <Waves className="h-6 w-6 text-blue-500 mr-2" />
                      <span className="font-semibold text-blue-700 dark:text-blue-400">Flooding Risk</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Probability</span>
                        <Badge variant="secondary" className="text-xs">Medium - 35%</Badge>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Heavy rainfall events may cause localized flooding in low-lying areas.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center mb-3">
                      <Zap className="h-6 w-6 text-yellow-500 mr-2" />
                      <span className="font-semibold text-yellow-700 dark:text-yellow-400">Severe Weather</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Probability</span>
                        <Badge variant="outline" className="text-xs">Low - 15%</Badge>
                      </div>
                      <div className="w-full bg-yellow-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Hailstorms and strong winds possible during peak summer months.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mitigation Strategies */}
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3">Recommended Mitigation Strategies</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-foreground">Drought Preparation</h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Install drought-resistant crop varieties</li>
                        <li>• Implement water-efficient irrigation systems</li>
                        <li>• Create water storage reserves</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-foreground">Flood Protection</h5>
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