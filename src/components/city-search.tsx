import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { useSearchHistory } from '@/hooks/use-search-history';
import { useLocationSearch } from '@/hooks/use-weather';
import {} from 'cmdk';
import { format } from 'date-fns';
import { ClockIcon, Loader2, SearchIcon, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export const CitySearch = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const navigate = useNavigate();

    const { data: locations, isLoading } = useLocationSearch(query);
    const { history, addToHistory, clearHistory } = useSearchHistory();

    const handleSelect = (city: string) => {
        const [lat, lon, name, country] = city.split('|');

        addToHistory.mutate({
            query,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country,
        });

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

                    {/* <CommandGroup heading="Favourites">
                        <CommandItem>Calendar</CommandItem>
                    </CommandGroup> */}

                    {history.length > 0 && (
                        <>
                            <CommandSeparator />
                            <CommandGroup>
                                <div className="my-2 flex items-center justify-between px-2">
                                    <p className="text-xs text-muted-foreground">
                                        Recent searches
                                    </p>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => clearHistory.mutate()}
                                    >
                                        <XCircle className="mr-2 size-4" />
                                        Clear
                                    </Button>
                                </div>

                                {history.map((location, idx) => (
                                    <CommandItem
                                        key={idx}
                                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                        onSelect={handleSelect}
                                        className="flex cursor-pointer items-center gap-1"
                                    >
                                        <ClockIcon className="mr-2 size-4 text-muted-foreground" />
                                        <span>{location.name}</span>
                                        {location.state && (
                                            <span className="text-sm text-muted-foreground">
                                                - {location.state}
                                            </span>
                                        )}

                                        <span className="text-sm text-muted-foreground">
                                            - {location.country}
                                        </span>

                                        <span className="ml-auto text-xs text-muted-foreground">
                                            {format(location.searchedAt, 'MMM d, h:mm a')}
                                        </span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </>
                    )}

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
