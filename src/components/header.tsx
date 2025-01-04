import { useTheme } from '@/context/theme-provider';
import { cn } from '@/lib/utils';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link to="/">
                    <img
                        src={isDark ? '/logo-dark.png' : '/logo-light.png'}
                        alt="Klimate logo"
                        className="h-14"
                    />
                </Link>

                <div className="">
                    {/* Search */}
                    <div
                        className={cn(
                            'flex cursor-pointer items-center transition-transform duration-500',
                            isDark ? 'rotate-180' : 'rotate-0'
                        )}
                        onClick={() => setTheme(isDark ? 'light' : 'dark')}
                    >
                        {isDark ? (
                            <SunIcon className="size-6 rotate-0 text-yellow-600 transition-all" />
                        ) : (
                            <MoonIcon className="size-6 rotate-0 text-blue-500 transition-all" />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
