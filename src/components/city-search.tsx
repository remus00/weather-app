import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { useLocationSearch } from '@/hooks/use-weather';
import {} from 'cmdk';
import { Loader2, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export const CitySearch = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');

    const { data: locations, isLoading } = useLocationSearch(query);

    const navigate = useNavigate();

    const handleSelect = (city: string) => {
        const [lat, lon, name, country] = city.split('|');

        navigate(`/city/${name}?lat=${lat}&lon=${lon}`);

        setOpen(false);
    };

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
            >
                <SearchIcon className="mr-2 size-4" /> Search cities...
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder="Search cities..."
                    value={query}
                    onValueChange={setQuery}
                />
                <CommandList>
                    {query.length > 2 && !isLoading && (
                        <CommandEmpty>No cities found.</CommandEmpty>
                    )}
                    <CommandGroup heading="Favourites">
                        <CommandItem>Calendar</CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Recent Searches">
                        <CommandItem>Calendar</CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    {locations && locations.length > 0 && (
                        <CommandGroup heading="Suggestions">
                            {isLoading && (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="size-4 animate-spin" />
                                </div>
                            )}
                            {locations.map((location, idx) => (
                                <CommandItem
                                    key={idx}
                                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                    onSelect={handleSelect}
                                    className="flex cursor-pointer items-center gap-1"
                                >
                                    <SearchIcon className="mr-2 size-4" />
                                    <span>{location.name}</span>
                                    {location.state && (
                                        <span className="text-sm text-muted-foreground">
                                            - {location.state}
                                        </span>
                                    )}

                                    <span className="text-sm text-muted-foreground">
                                        - {location.country}
                                    </span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    );
};
