import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Flame, Heart, ShoppingBag, Leaf, HelpCircle } from 'lucide-react';
import { PizzaItem } from '../types';

interface PizzaModalProps {
  pizza: PizzaItem | null;
  onClose: () => void;
  onAddToCart: (pizza: PizzaItem, quantity: number, size: 'Small' | 'Medium' | 'Large', toppings: string[]) => void;
}

export const PizzaModal: React.FC<PizzaModalProps> = ({ pizza, onClose, onAddToCart }) => {
  const [size, setSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  // Available custom toppings
  const availableToppings = [
    'Extra Pepperoni',
    'Sliced Mushrooms',
    'Black Olives',
    'Fresh Basil Leaves',
    'Gorgonzola Cheese',
    'Balsamic Glaze Drizzle',
    'Hot Honey Pour',
    'Fresh Garlic Rub',
  ];

  useEffect(() => {
    if (pizza) {
      setSize('Medium');
      setSelectedToppings([]);
      setQuantity(1);
      setIsLiked(false);
    }
  }, [pizza]);

  if (!pizza) return null;

  // Calculate adjusted price based on size selection
  const sizeSurcharge = size === 'Small' ? -1.5 : size === 'Large' ? 2.5 : 0;
  const toppingsPrice = selectedToppings.length * 0.99;
  const singlePizzaPrice = pizza.price + sizeSurcharge + toppingsPrice;
  const totalPrice = singlePizzaPrice * quantity;

  const handleToppingToggle = (topping: string) => {
    setSelectedToppings((prev) =>
      prev.includes(topping) ? prev.filter((t) => t !== topping) : [...prev, topping]
    );
  };

  const handleAdd = () => {
    onAddToCart(pizza, quantity, size, selectedToppings);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          id="modal-backdrop"
          className="fixed inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          id="modal-window"
          className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh] md:max-h-none"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        >
          {/* Close Button */}
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Huge visual display */}
          <div className="w-full md:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-8 relative overflow-hidden min-h-[300px] md:min-h-0">
            {/* Ambient colorful background blur */}
            <div className={`absolute w-72 h-72 rounded-full blur-3xl opacity-30 -bottom-24 -left-24
              ${
                pizza.colorTheme === 'green' ? 'bg-green-400' :
                pizza.colorTheme === 'orange' ? 'bg-orange-400' :
                pizza.colorTheme === 'pink' ? 'bg-pink-400' : 'bg-amber-400'
              }
            `} />

            {/* Sticker / Floating Badge */}
            <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
              <span className="bg-red-500 text-white font-black text-xs px-3 py-1.5 rounded-xl uppercase shadow-md flex items-center">
                <Flame className="w-3.5 h-3.5 mr-1" /> Best Seller
              </span>
              <span className="bg-green-600 text-white font-black text-xs px-3 py-1.5 rounded-xl uppercase shadow-md flex items-center">
                <Leaf className="w-3.5 h-3.5 mr-1" /> Fresh Dough
              </span>
            </div>

            {/* Main Interactive Pizza Image */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              {/* Pizza Base Shadow */}
              <div className="absolute bottom-2 w-56 h-6 bg-gray-900/10 rounded-full blur-lg" />
              
              <motion.img
                src={pizza.image}
                alt={pizza.name}
                referrerPolicy="no-referrer"
                className="w-60 h-60 md:w-76 md:h-76 object-cover rounded-full z-10 drop-shadow-xl"
                animate={{ rotate: size === 'Small' ? -15 : size === 'Large' ? 15 : 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
            </div>

            {/* Nutrition facts display */}
            <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-4 w-full shadow-sm z-10 max-w-sm">
              <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase block mb-2.5">
                Nutrition Facts (Per Slice)
              </span>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-gray-50/50 rounded-xl p-2 border border-gray-100">
                  <p className="text-[10px] font-medium text-gray-400">Calories</p>
                  <p className="text-sm font-extrabold text-gray-800 font-mono mt-0.5">{pizza.nutrition.calories}</p>
                </div>
                <div className="bg-gray-50/50 rounded-xl p-2 border border-gray-100">
                  <p className="text-[10px] font-medium text-gray-400">Protein</p>
                  <p className="text-sm font-extrabold text-gray-800 font-mono mt-0.5">{pizza.nutrition.protein}</p>
                </div>
                <div className="bg-gray-50/50 rounded-xl p-2 border border-gray-100">
                  <p className="text-[10px] font-medium text-gray-400">Carbs</p>
                  <p className="text-sm font-extrabold text-gray-800 font-mono mt-0.5">{pizza.nutrition.carbs}</p>
                </div>
                <div className="bg-gray-50/50 rounded-xl p-2 border border-gray-100">
                  <p className="text-[10px] font-medium text-gray-400">Fat</p>
                  <p className="text-sm font-extrabold text-gray-800 font-mono mt-0.5">{pizza.nutrition.fat}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customizer form */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[80vh]">
            <div>
              {/* Product Info */}
              <div className="border-b border-gray-100 pb-4">
                <h2 className="font-sans text-3xl font-black text-gray-900 tracking-tight leading-none mb-1">
                  {pizza.name}
                </h2>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center text-amber-400 fill-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-mono text-sm font-extrabold text-gray-800 ml-1">{pizza.rating}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs text-gray-500 font-medium">{pizza.reviewsCount} customer reviews</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mt-3">
                  {pizza.description}
                </p>
              </div>

              {/* 1. Crust Size Selection */}
              <div className="py-4 border-b border-gray-100">
                <span className="text-xs font-black tracking-widest text-gray-400 uppercase block mb-3">
                  Select Crust Size
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {(['Small', 'Medium', 'Large'] as const).map((s) => {
                    const priceLabel = s === 'Small' ? '-$1.50' : s === 'Large' ? '+$2.50' : 'Included';
                    return (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`py-3 px-4 rounded-2xl border text-center font-bold text-sm transition-all focus:outline-none ${
                          size === s
                            ? 'border-red-500 bg-red-50/50 text-red-600'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <p>{s}</p>
                        <p className={`text-[10px] font-semibold mt-0.5 ${size === s ? 'text-red-500' : 'text-gray-400'}`}>
                          {priceLabel}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Extra toppings selection */}
              <div className="py-4 border-b border-gray-100">
                <span className="text-xs font-black tracking-widest text-gray-400 uppercase block mb-3 flex items-center">
                  Add Extra Toppings <span className="text-red-500 font-bold ml-1">($0.99 each)</span>
                </span>
                <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto pr-2">
                  {availableToppings.map((topping) => {
                    const isSelected = selectedToppings.includes(topping);
                    return (
                      <button
                        key={topping}
                        onClick={() => handleToppingToggle(topping)}
                        className={`py-1.5 px-3.5 rounded-full text-xs font-bold transition-all focus:outline-none flex items-center ${
                          isSelected
                            ? 'bg-red-500 text-white shadow-sm shadow-red-200'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {topping}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Panel */}
            <div className="pt-4 mt-4 flex items-center justify-between">
              {/* Total Summary */}
              <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Total Price</span>
                <span className="text-3xl font-black font-mono text-gray-900 tracking-tight">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Action and counter */}
              <div className="flex items-center space-x-3">
                {/* Quantity input */}
                <div className="flex items-center rounded-full border border-gray-200 bg-gray-50/50 p-1">
                  <button
                    onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-600 font-bold hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-600 font-bold hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to basket button */}
                <motion.button
                  id="add-to-basket-action-btn"
                  onClick={handleAdd}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-2xl py-3 px-6 font-bold flex items-center space-x-2 shadow-lg shadow-red-200 transition-all text-sm md:text-base"
                  whileTap={{ scale: 0.96 }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Basket</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
