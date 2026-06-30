import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Star, ShoppingCart, Info, Flame, Eye } from 'lucide-react';
import { PizzaItem } from '../types';

interface PizzaCardProps {
  pizza: PizzaItem;
  onAddToCart: (pizza: PizzaItem, quantity: number) => void;
  onQuickView: (pizza: PizzaItem) => void;
}

export const PizzaCard: React.FC<PizzaCardProps> = ({ pizza, onAddToCart, onQuickView }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const increment = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((q) => q + 1);
  };

  const decrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(pizza, quantity);
    // Reset quantity after purchase to make UI clean
    setQuantity(1);
  };

  // Define theme classes based on pizza colorTheme
  const getThemeClasses = () => {
    switch (pizza.colorTheme) {
      case 'green':
        return {
          cardBg: 'hover:border-green-300',
          accentBadgeBg: 'bg-green-50 text-green-700 border-green-200',
          qtyBg: 'bg-green-50 text-green-800',
          btnHover: 'hover:bg-green-600',
          iconColor: 'text-green-500',
          glow: 'group-hover:shadow-green-100',
        };
      case 'orange':
        return {
          cardBg: 'hover:border-orange-300',
          accentBadgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
          qtyBg: 'bg-orange-50 text-orange-800',
          btnHover: 'hover:bg-orange-600',
          iconColor: 'text-orange-500',
          glow: 'group-hover:shadow-orange-100',
        };
      case 'pink':
        return {
          cardBg: 'hover:border-pink-300',
          accentBadgeBg: 'bg-pink-50 text-pink-700 border-pink-200',
          qtyBg: 'bg-pink-50 text-pink-800',
          btnHover: 'hover:bg-pink-600',
          iconColor: 'text-pink-500',
          glow: 'group-hover:shadow-pink-100',
        };
      case 'yellow':
        return {
          cardBg: 'hover:border-amber-300',
          accentBadgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          qtyBg: 'bg-amber-50 text-amber-800',
          btnHover: 'hover:bg-amber-600',
          iconColor: 'text-amber-500',
          glow: 'group-hover:shadow-amber-100',
        };
      default:
        return {
          cardBg: 'hover:border-rose-300',
          accentBadgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          qtyBg: 'bg-rose-50 text-rose-800',
          btnHover: 'hover:bg-rose-600',
          iconColor: 'text-rose-500',
          glow: 'group-hover:shadow-rose-100',
        };
    }
  };

  const theme = getThemeClasses();

  return (
    <motion.div
      id={`pizza-card-${pizza.id}`}
      className={`group relative bg-white rounded-3xl border border-gray-100 p-6 shadow-sm transition-all duration-300 hover:shadow-xl ${theme.cardBg} ${theme.glow} flex flex-col justify-between overflow-hidden cursor-pointer`}
      whileHover={{ y: -8 }}
      onClick={() => onQuickView(pizza)}
    >
      {/* Absolute background subtle glow */}
      <div className={`absolute -right-16 -top-16 w-36 h-36 rounded-full blur-3xl opacity-20 transition-opacity duration-300 group-hover:opacity-40
        ${
          pizza.colorTheme === 'green' ? 'bg-green-400' :
          pizza.colorTheme === 'orange' ? 'bg-orange-400' :
          pizza.colorTheme === 'pink' ? 'bg-pink-400' : 'bg-amber-400'
        }
      `} />

      {/* Top badges / icons */}
      <div className="flex justify-between items-start z-10">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${theme.accentBadgeBg}`}>
          {pizza.tags[0] === 'Spicy' && <Flame className="w-3.5 h-3.5 mr-1 text-red-500" />}
          {pizza.tags[0] || 'Popular'}
        </span>

        <button
          id={`like-btn-${pizza.id}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`p-2 rounded-full border border-gray-100 bg-white shadow-sm transition-transform duration-200 hover:scale-110 active:scale-95 ${
            isLiked ? 'text-red-500 bg-red-50 border-red-200' : 'text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Interactive image stage */}
      <div className="relative w-48 h-48 mx-auto my-4 flex items-center justify-center">
        {/* Pizza base shadow */}
        <div className="absolute bottom-2 w-40 h-4 bg-gray-900/10 rounded-full blur-md group-hover:scale-110 transition-transform duration-300" />
        
        {/* Main image rotating on hover */}
        <motion.img
          src={pizza.image}
          alt={pizza.name}
          referrerPolicy="no-referrer"
          className="w-44 h-44 object-cover rounded-full z-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105"
        />

        {/* Hover quick-view overlay icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300 z-20">
          <motion.div
            className="p-3 rounded-full bg-white/90 shadow-md text-gray-800 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye className="w-5 h-5 text-red-500" />
          </motion.div>
        </div>
      </div>

      {/* Title & Reviews */}
      <div className="text-center z-10">
        <h3 className="font-sans text-xl font-bold text-gray-900 leading-tight group-hover:text-red-500 transition-colors duration-200">
          {pizza.name}
        </h3>
        <div className="flex items-center justify-center space-x-1 mt-1.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < Math.floor(pizza.rating)
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-gray-200'
              }`}
            />
          ))}
          <span className="text-xs font-mono font-medium text-gray-500 ml-1">
            ({pizza.reviewsCount})
          </span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 px-2 leading-relaxed min-h-[2.5rem]">
          {pizza.description}
        </p>
      </div>

      {/* Footer controls */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between z-10">
        {/* Price Tag */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</span>
          <span className="text-xl font-bold font-mono text-gray-900">${pizza.price.toFixed(2)}</span>
        </div>

        {/* Control actions */}
        <div className="flex items-center space-x-2">
          {/* Quantity selector */}
          <div className={`flex items-center rounded-full p-1 border border-gray-100 ${theme.qtyBg}`}>
            <button
              id={`qty-dec-${pizza.id}`}
              onClick={decrement}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-gray-600 font-bold hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <span className="w-6 text-center font-mono text-sm font-bold">{quantity}</span>
            <button
              id={`qty-inc-${pizza.id}`}
              onClick={increment}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-gray-600 font-bold hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>

          {/* Buy Button */}
          <motion.button
            id={`buy-btn-${pizza.id}`}
            onClick={handleBuy}
            className="flex items-center justify-center bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 shadow-sm shadow-red-200 transition-all font-semibold text-sm gap-1"
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="w-4 h-4" />
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
