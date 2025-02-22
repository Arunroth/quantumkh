import {Link, useLocation} from 'react-router-dom';
import {FileText, LayoutDashboard, LogOut, Package, PaintBucket} from 'lucide-react';

const navigation = [
    {name: 'Dashboard', href: '/admin', icon: LayoutDashboard},
    {name: 'Content', href: '/admin/content', icon: FileText},
    {name: 'Projects', href: '/admin/projects', icon: PaintBucket},
    {name: 'Services', href: '/admin/services', icon: Package},
];

interface AdminSidebarProps {
    onLogout: () => void;
}

export default function AdminSidebar({onLogout}: AdminSidebarProps) {
    const location = useLocation();

    return (
        <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64">
                <div className="flex flex-col h-0 flex-1 bg-gray-900">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <span className="text-xl font-bold text-white">Admin Panel</span>
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            {navigation.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`${
                                            isActive
                                                ? 'bg-gray-800 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                                    >
                                        <item.icon
                                            className={`${
                                                isActive ? 'text-primary-400' : 'text-gray-400 group-hover:text-gray-300'
                                            } mr-3 h-6 w-6`}
                                        />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-gray-800 p-4">
                        <button
                            onClick={onLogout}
                            className="flex-shrink-0 w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            <LogOut className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300"/>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}