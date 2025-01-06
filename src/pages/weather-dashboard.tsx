import { CurrentWeather } from '@/components/current-weather';
import { FavouriteCities } from '@/components/favourite-cities';
import { HourlyTemperature } from '@/components/hourly-temperature';
import { LoadingSkeleton } from '@/components/loading-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { WeatherDetails } from '@/components/weather-details';
import { WeatherForecast } from '@/components/weather-forecast';
import { useGeolocation } from '@/hooks/use-geolocation';
import {
    useForecastQuery,
    useReverseGeocodeQuery,
    useWeatherQuery,
} from '@/hooks/use-weather';
import { cn } from '@/lib/utils';
import { AlertTriangle, MapPin, RefreshCw } from 'lucide-react';

export const WeatherDashboard = () => {
    const {
        coordinates,
        error: locationError,
        isLoading: locationLoading,
        getLocation,
    } = useGeolocation();

    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);
    const locationQuery = useReverseGeocodeQuery(coordinates);

    const handleRefresh = () => {
        getLocation();

        if (coordinates) {
            weatherQuery.refetch();
            forecastQuery.refetch();
            locationQuery.refetch();
        }
    };

    if (locationLoading) {
        return <LoadingSkeleton />;
    }

    if (locationError) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Location error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>{locationError}</p>
                    <Button variant="outline" className="w-fit">
                        <MapPin className="mr-2 size-4" />
                        Enable location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (!coordinates) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Location required</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Please enable location access to see your location weather.</p>
                    <Button variant="outline" className="w-fit">
                        <MapPin className="mr-2 size-4" />
                        Enable location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    const locationName = locationQuery.data?.[0];

    if (weatherQuery.error || forecastQuery.error) {
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
                <p>Failed to fetch weather data. Please try again.</p>
                <Button onClick={handleRefresh} variant="outline" className="w-fit">
                    <MapPin className="mr-2 size-4" />
                    Retry
                </Button>
            </AlertDescription>
        </Alert>;
    }

    if (!weatherQuery.data || !forecastQuery.data) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="space-y-4">
            <FavouriteCities />
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold tracking-tight">My location</h1>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRefresh}
                    disabled={weatherQuery.isFetching || forecastQuery.isFetching}
                >
                    <RefreshCw
                        className={cn(
                            'size-4',
                            weatherQuery.isFetching && 'animate-spin'
                        )}
                    />
                </Button>
            </div>

            <div className="grid gap-6">
                <div className="flex flex-col gap-4 lg:flex-row">
                    <CurrentWeather
                        data={weatherQuery.data}
                        locationName={locationName}
                    />

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
