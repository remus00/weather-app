import { useFavourite } from '@/hooks/use-favourite';
import { FavouriteCityBanner } from './favourite-city-banner';
import { ScrollArea } from './ui/scroll-area';

export const FavouriteCities = () => {
    const { favourites, removeFavourite } = useFavourite();

    if (!favourites.length) {
        return null;
    }

    return (
        <>
            <h1>Favourites</h1>
            <ScrollArea className="w-full pb-4">
                <div className="flex gap-4">
                    {favourites.map((item) => (
                        <FavouriteCityBanner
                            key={item.id}
                            {...item}
                            onRemove={() => removeFavourite.mutate(item.id)}
                        />
                    ))}
                </div>
            </ScrollArea>
        </>
    );
};
