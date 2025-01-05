import { CurrentWeather } from '@/components/current-weather';
import { HourlyTemperature } from '@/components/hourly-temperature';
import { LoadingSkeleton } from '@/components/loading-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { WeatherDetails } from '@/components/weather-details';
import { WeatherForecast } from '@/components/weather-forecast';
import { useForecastQuery, useWeatherQuery } from '@/hooks/use-weather';
import { AlertTriangle } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router-dom';

export const CityPage = () => {
    const [searchParams] = useSearchParams();
    const params = useParams();

    const lat = parseFloat(searchParams.get('lat') || '0');
    const lon = parseFloat(searchParams.get('lon') || '0');
    const coordinates = { lat, lon };

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);

    if (weatherQuery.error || forecastQuery.error) {
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
                Failed to fetch weather data. Please try again.
            </AlertDescription>
        </Alert>;
    }

    if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold tracking-tight">
                    {params.cityName}, {weatherQuery.data.sys.country}
                </h1>
                <div className=""></div>
            </div>

            <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                    <CurrentWeather data={weatherQuery.data} />

                    <HourlyTemperature data={forecastQuery.data} />
                </div>
                <div className="grid items-start gap-6 md:grid-cols-2">
                    <WeatherDetails data={weatherQuery.data} />
                    <WeatherForecast data={forecastQuery.data} />
                </div>
            </div>
        </div>
    );
};
