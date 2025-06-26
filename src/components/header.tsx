import { useState, useEffect } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { FaGithub, FaStar } from 'react-icons/fa6';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '../components/ui/drawer';
import { cn } from '../lib/utils';
import LinksSidebar from './links-sidebar';
import { Link } from '@tanstack/react-router';
import { GITHUB_URL } from '@/lib/constants';
import { useTranslation } from '@/hooks/use-translation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';

const formatStars = (num: number): string => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return num.toString();
};

const GithubLink = ({ stars, className }: { stars: number; className?: string }) => (
    <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('flex items-center gap-2 text-slate-200 hover:text-white', className)}
    >
        <FaGithub className="h-5 w-5" />
        <div className="flex items-center gap-1.5">
            <FaStar className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">{formatStars(stars)}</span>
        </div>
    </a>
);

export function Header() {
    const [stars, setStars] = useState(0);
    const [selectedLanguage, setSelectedLanguage] = useState(() => localStorage.getItem('currentLanguage') || 'en');

    const { t, languages, isLoadingLanguages } = useTranslation();

    useEffect(() => {
        localStorage.setItem('currentLanguage', selectedLanguage);
    }, [selectedLanguage]);

    useEffect(() => {
        fetch('https://api.github.com/repos/Flowscape-UI/interface')
            .then((res) => res.json())
            .then((data) => {
                if (data.stargazers_count) {
                    setStars(data.stargazers_count);
                }
            })
            .catch(() => {
                // If the request fails, stars will remain 0
            });
    }, []);

    const nav = [
        { href: '/components', label: 'Components' },
        { href: '/hire', label: 'Make an order' },
    ];

    // const NavLinks = ({ className }: { className?: string }) => (
    //     <nav className={cn('flex items-center gap-6', className)}>
    //         {nav.map((n) => (
    //             <Link disabled={n.label === 'Make an order'} key={n.href} to={n.href} className="text-slate-200 hover:text-white">
    //                 {n.label}
    //             </Link>
    //         ))}
    //     </nav>
    // );

    return (
        <header className="supports-backdrop-blur:bg-background/90 border-border sticky top-0 z-[1000] w-full border-b bg-white/5 backdrop-blur-lg">
            <div className="flex w-full items-center justify-between px-4 sm:px-6 py-3">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight text-white"
                >
                    <img src="/brand/logo.svg" alt="Flowscape" className="h-6 w-auto sm:h-8" />
                    <span className="hidden sm:inline">Flowscape</span>
                </Link>

                <div className="flex items-center gap-4">
                    {/* desktop nav */}
                    {/* <NavLinks className="hidden md:flex" /> */}
                    <GithubLink stars={stars} className="hidden md:flex" />

                    <Select onValueChange={setSelectedLanguage} defaultValue={selectedLanguage}>
                        <SelectTrigger className="w-[180px] h-[36px] hidden md:flex text-slate-200 border-slate-700 hover:bg-slate-800">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 text-slate-200 border-slate-700">
                            {isLoadingLanguages ? (
                                <SelectItem value="loading" disabled>Loading...</SelectItem>
                            ) : (
                                languages?.map((lang) => (
                                    <SelectItem key={lang.code} value={lang.code}>
                                        {lang.language}
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>

                    {/* <Link
                        disabled
                        to="/auth"
                        className="text-sm font-medium text-slate-200 hover:text-white hidden md:inline-flex items-center justify-center px-3 py-1.5 rounded-md border border-slate-700 hover:bg-slate-800"
                    >
                        {t('Sign In', selectedLanguage)}
                    </Link> */}

                    {/* mobile burger + drawer */}
                    <div className="flex items-center gap-4 md:hidden">
                        <GithubLink stars={stars} />
                        <Drawer>
                            <DrawerTrigger asChild>
                                <button className="text-slate-200">
                                    <HiOutlineMenu className="h-6 w-6" />
                                </button>
                            </DrawerTrigger>
                            <DrawerContent className="h-[90vh]">
                                <div className="flex h-full flex-col gap-6 p-4 text-lg">
                                    <nav className="flex flex-col gap-4">
                                        {nav.map((n) => (
                                            <DrawerClose asChild key={n.href}>
                                                <Link to={n.href} className="w-full text-left py-2">
                                                    {n.label}
                                                </Link>
                                            </DrawerClose>
                                        ))}
                                        <DrawerClose asChild>
                                            <Link disabled to="/auth" className="w-full text-left py-2">
                                                {t('Sign In', 'ru')}
                                            </Link>
                                        </DrawerClose>
                                    </nav>
                                    <hr className="border-white/10" />
                                    <div className="flex-1 overflow-y-auto">
                                        <LinksSidebar />
                                    </div>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
            </div>
        </header>
    );
}
