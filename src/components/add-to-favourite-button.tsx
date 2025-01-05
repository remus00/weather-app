import { WeatherData } from '@/api/weather-types';
import { useFavourite } from '@/hooks/use-favourite';
import { cn } from '@/lib/utils';
import { StarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';

export const AddToFavouriteButton = ({ data }: { data: WeatherData }) => {
    const { addToFavourite, isFavourite, removeFavourite } = useFavourite();

    const isCurrentlyFavourite = isFavourite(data.coord.lat, data.coord.lon);

    const handleToggleFavourite = () => {
        if (isCurrentlyFavourite) {
            removeFavourite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from Favourites.`);
        } else {
            addToFavourite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country,
            });
            toast.success(`Added ${data.name} to Favourites.`);
        }
    };

    return (
        <Button
            onClick={handleToggleFavourite}
            variant={isCurrentlyFavourite ? 'default' : 'outline'}
            size="icon"
            className={cn(
                isCurrentlyFavourite ? 'bg-yellow-500 hover:bg-yellow-600' : ''
            )}
        >
            <StarIcon
                className={cn('size-4', isCurrentlyFavourite ? 'fill-current' : '')}
            />
        </Button>
    );
};
