import { useLocation } from 'react-router-dom';

export default function LoadingScreen() {
    const location = useLocation();
    const path = location.pathname;

    const isHome = path === '/';
    const isAdmin = path.startsWith('/admin');
    const isForm = path === '/request-project' || path === '/track';
    
    // Shared Navbar Skeleton for public pages
    const NavbarSkeleton = () => (
        <nav className="fixed w-full z-50 bg-white/80 dark:bg-dark-900/80 backdrop-blur-md border-b border-gray-100 dark:border-dark-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="w-32 h-10 bg-gray-200 dark:bg-dark-700 rounded-md animate-pulse" />
                    <div className="hidden md:flex items-center space-x-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-20 h-5 bg-gray-200 dark:bg-dark-700 rounded animate-pulse delay-75" />
                        ))}
                        <div className="w-8 h-8 bg-gray-200 dark:bg-dark-700 rounded-full animate-pulse delay-100" />
                        <div className="w-28 h-10 bg-primary-200 dark:bg-primary-900/40 rounded-md animate-pulse delay-150" />
                    </div>
                    <div className="md:hidden flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gray-200 dark:bg-dark-700 rounded-full animate-pulse" />
                        <div className="w-8 h-8 bg-gray-200 dark:bg-dark-700 rounded-md animate-pulse" />
                    </div>
                </div>
            </div>
        </nav>
    );

    // Admin Skeleton
    if (isAdmin) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex transition-colors">
                <div className="w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 h-screen p-4 hidden md:flex flex-col">
                    <div className="w-32 h-8 bg-gray-200 dark:bg-dark-700 rounded animate-pulse mb-8 mt-4 mx-auto" />
                    <div className="space-y-4 flex-1">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="w-full h-10 bg-gray-100 dark:bg-dark-700 rounded animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                        ))}
                    </div>
                </div>
                <div className="flex-1 p-8">
                    <div className="w-64 h-8 bg-gray-200 dark:bg-dark-700 rounded animate-pulse mb-8" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                         {[1, 2, 3].map(i => (
                             <div key={i} className="w-full h-32 bg-white dark:bg-dark-800 rounded-lg animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                         ))}
                    </div>
                    <div className="w-full h-96 bg-white dark:bg-dark-800 rounded-lg animate-pulse delay-300" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors">
            <NavbarSkeleton />

            <div className="relative pt-16">
                {isHome && (
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark-800 dark:to-dark-900 h-3/4 animate-pulse opacity-50 -z-10" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="h-12 w-3/4 bg-gray-200 dark:bg-dark-700 rounded-lg animate-pulse" />
                                    <div className="h-12 w-2/3 bg-gray-200 dark:bg-dark-700 rounded-lg animate-pulse delay-75" />
                                </div>
                                <div className="space-y-2 mt-6">
                                    <div className="h-5 w-full bg-gray-200 dark:bg-dark-700 rounded animate-pulse delay-100" />
                                    <div className="h-5 w-4/5 bg-gray-200 dark:bg-dark-700 rounded animate-pulse delay-150" />
                                </div>
                                <div className="mt-8 flex gap-4">
                                    <div className="h-12 w-40 bg-primary-200 dark:bg-primary-900/40 rounded-lg animate-pulse delay-200" />
                                    <div className="h-12 w-40 bg-gray-200 dark:bg-dark-700 rounded-lg animate-pulse delay-200" />
                                </div>
                            </div>
                            <div className="relative h-[400px] w-full bg-gray-200 dark:bg-dark-700 rounded-lg shadow-xl animate-pulse delay-150" />
                        </div>
                    </div>
                )}

                {(!isHome && !isForm) && (
                    <div className="text-center pt-16 pb-8">
                        <div className="h-10 w-64 bg-gray-200 dark:bg-dark-700 rounded-lg animate-pulse mx-auto mb-4" />
                        <div className="h-6 w-96 bg-gray-200 dark:bg-dark-700 rounded-lg animate-pulse mx-auto opacity-70" />
                    </div>
                )}

                {isForm ? (
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
                        <div className="text-center pb-8">
                            <div className="h-10 w-64 bg-gray-200 dark:bg-dark-700 rounded-lg animate-pulse mx-auto mb-4" />
                            <div className="h-5 w-80 bg-gray-200 dark:bg-dark-700 rounded-lg animate-pulse mx-auto opacity-70" />
                        </div>
                        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-xl border border-gray-100 dark:border-dark-700 p-8">
                            <div className="w-full h-12 bg-gray-200 dark:bg-dark-700 rounded animate-pulse mb-8" />
                            <div className="space-y-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i}>
                                        <div className="w-32 h-5 bg-gray-200 dark:bg-dark-700 rounded animate-pulse mb-2" style={{ animationDelay: `${i * 100}ms` }} />
                                        <div className="w-full h-12 bg-gray-100 dark:bg-dark-900 rounded animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                                    </div>
                                ))}
                            </div>
                            <div className="w-full h-12 bg-primary-200 dark:bg-primary-900/40 rounded animate-pulse mt-8 delay-300" />
                        </div>
                    </div>
                ) : (
                    <div className={`${isHome ? 'pt-0' : 'pt-8'} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-gray-50 dark:bg-dark-800 rounded-lg shadow-lg overflow-hidden animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
                                    <div className="h-48 bg-gray-200 dark:bg-dark-700 w-full" />
                                    <div className="p-6 space-y-4">
                                        <div className="h-6 w-3/4 bg-gray-200 dark:bg-dark-700 rounded" />
                                        <div className="space-y-2">
                                            <div className="h-4 w-full bg-gray-100 dark:bg-dark-900 rounded" />
                                            <div className="h-4 w-5/6 bg-gray-100 dark:bg-dark-900 rounded" />
                                            <div className="h-4 w-4/6 bg-gray-100 dark:bg-dark-900 rounded" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
