import { Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import logoImage from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 dark:bg-dark-900/80 backdrop-blur-md fixed w-full z-50 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logoImage} alt="Company Logo" className="h-12 md:h-10 w-auto" />
              {/* <span className="hidden md:inline text-xl font-bold text-dark-900 dark:text-white">Quantum E&M</span> */}
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/services" 
              className={`${isActive('/services') ? 'text-primary-500' : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'}`}
            >
              Services
            </Link>
            <Link 
              to="/machines" 
              className={`${isActive('/machines') ? 'text-primary-500' : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'}`}
            >
              Our Machines
            </Link>
            <Link 
              to="/projects" 
              className={`${isActive('/projects') ? 'text-primary-500' : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'}`}
            >
              Projects
            </Link>
            <Link 
              to="/track" 
              className={`${isActive('/track') ? 'text-primary-500' : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'}`}
            >
              <div className="flex items-center space-x-1">
                <Search className="h-4 w-4" />
                <span>Track Project</span>
              </div>
            </Link>
            <ThemeToggle />
            <button className="btn-primary">
              Get Started
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/services" 
              className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-400/10"
            >
              Services
            </Link>
            <Link 
              to="/machines" 
              className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-400/10"
            >
              Our Machines
            </Link>
            <Link 
              to="/projects" 
              className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-400/10"
            >
              Projects
            </Link>
            <Link 
              to="/track" 
              className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-400/10"
            >
              Track Project
            </Link>
            <button className="w-full mt-2 btn-primary">
              Get Started (Demo)
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
