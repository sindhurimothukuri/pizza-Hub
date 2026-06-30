import React from 'react';
import { ShoppingBag, Search, Compass, Menu } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onNavigateToSection }) => {
  return (
    <motion.header
      className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-orange-100/50 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {/* Brand Logo matching the video exactly */}
      <div 
        onClick={() => onNavigateToSection('hero')}
        className="flex items-center gap-1.5 cursor-pointer select-none group"
      >
        <span className="font-serif text-3xl font-black text-red-500 tracking-tight flex items-center">
          Pizza
          <span className="text-green-500 font-extrabold text-4xl leading-none">.</span>
        </span>
        {/* Subtle slice decorator */}
        <div className="w-2 h-2 rounded-full bg-orange-400 animate-ping group-hover:bg-red-500 hidden md:block" />
      </div>

      {/* Nav Menu */}
      <nav className="hidden md:flex items-center space-x-10 text-sm font-bold text-gray-700">
        <button
          onClick={() => onNavigateToSection('hero')}
          className="hover:text-red-500 transition-colors duration-200 cursor-pointer relative py-1 group"
        >
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
        </button>
        <button
          onClick={() => onNavigateToSection('menu')}
          className="hover:text-red-500 transition-colors duration-200 cursor-pointer relative py-1 group"
        >
          Menu
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
        </button>
        <button
          onClick={() => onNavigateToSection('about')}
          className="hover:text-red-500 transition-colors duration-200 cursor-pointer relative py-1 group"
        >
          About
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
        </button>
        <button
          onClick={() => onNavigateToSection('contact')}
          className="hover:text-red-500 transition-colors duration-200 cursor-pointer relative py-1 group"
        >
          Contact
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
        </button>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        {/* Quick Search */}
        <button className="p-2.5 rounded-full hover:bg-orange-50 text-gray-600 transition-colors hidden sm:block">
          <Search className="w-5 h-5" />
        </button>

        {/* Live Explorer button */}
        <button 
          onClick={() => onNavigateToSection('menu')}
          className="p-2.5 rounded-full hover:bg-orange-50 text-gray-600 transition-colors hidden sm:block"
        >
          <Compass className="w-5 h-5" />
        </button>

        {/* Cart Drawer Trigger */}
        <motion.button
          id="header-cart-btn"
          onClick={onCartClick}
          className="relative p-3 rounded-full bg-red-500 text-white shadow-md shadow-red-200 hover:bg-red-600 hover:shadow-lg transition-all flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 border-2 border-[#FAF6F0] rounded-full text-[10px] font-black text-white flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </motion.button>

        {/* Mobile menu trigger */}
        <button className="p-2.5 rounded-full hover:bg-orange-50 text-gray-600 md:hidden block">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </motion.header>
  );
};
