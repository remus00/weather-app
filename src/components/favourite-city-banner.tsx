import { useWeatherQuery } from '@/hooks/use-weather';
import { Loader2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from './ui/button';

interface Props {
    id: string;
    name: string;
    lat: number;
    lon: number;
    onRemove: (id: string) => void;
}

export const FavouriteCityBanner = ({ id, name, lat, lon, onRemove }: Props) => {
    const navigate = useNavigate();
    const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

    const handleRemoveClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onRemove(id);
        toast.error(`Removed ${name} from Favourites.`);
    };

    return (
        <div
            onClick={() => navigate(`/city/${name}?lat=${lat}&lon${lon}`)}
            role="button"
            tabIndex={0}
            className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
        >
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1 size-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100"
                onClick={(e) => handleRemoveClick(e)}
            >
                <X className="size-4" />
            </Button>

            {isLoading ? (
                <div className="flex h-8 items-center justify-center">
                    <Loader2 className="size-4 animate-spin" />
                </div>
            ) : weather ? (
                <>
                    <div className="flex items-center gap-2">
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                            alt={weather.weather[0].description}
                            className="size-8 object-contain"
                        />
                        <div className="">
                            <p className="font-medium">{name}</p>
                            <div className="text-xs text-muted-foreground">
                                {weather.sys.country}
                            </div>
                        </div>
                    </div>
                    <div className="ml-auto text-right">
                        <p className="text-xl font-bold">
                            {Math.round(weather.main.temp)}
                        </p>
                        <p className="text-xs capitalize text-muted-foreground">
                            {weather.weather[0].description}
                        </p>
                    </div>
                </>
            ) : null}
        </div>
    );
};
