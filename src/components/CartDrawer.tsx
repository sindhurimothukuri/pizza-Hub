import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, Ticket } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'success'>('cart');

  const subtotal = cartItems.reduce((acc, item) => acc + item.pizza.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 3.99 : 0;
  const discountAmount = subtotal * (discountPercent / 100);
  const taxRate = 0.08; // 8%
  const taxAmount = (subtotal - discountAmount) * taxRate;
  const total = subtotal - discountAmount + deliveryFee + taxAmount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'PIZZA20') {
      setDiscountPercent(20);
      setPromoApplied(true);
    } else {
      alert('Invalid Promo Code! Try "PIZZA20" for 20% off.');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutStep('success');
    }, 1500);
  };

  const handleResetCheckout = () => {
    onClearCart();
    setCheckoutStep('cart');
    setPromoCode('');
    setPromoApplied(false);
    setDiscountPercent(0);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="cart-backdrop"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sliding Panel */}
          <motion.div
            id="cart-panel"
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col justify-between"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {checkoutStep === 'cart' ? (
              <>
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-red-50 text-red-500 rounded-xl">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <h2 className="font-sans text-xl font-bold text-gray-900">Your Basket</h2>
                    <span className="bg-red-500 text-white font-mono text-xs px-2 py-0.5 rounded-full font-bold">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  </div>
                  <button
                    id="close-cart-btn"
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body - Cart Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                      {/* Empty state pizza slice */}
                      <svg viewBox="0 0 100 100" className="w-24 h-24 text-gray-200 fill-current">
                        <path d="M 50 10 L 80 80 A 40 40 0 0 1 20 80 Z" />
                        <circle cx="45" cy="45" r="4" className="text-red-300" />
                        <circle cx="55" cy="60" r="3" className="text-red-300" />
                        <circle cx="35" cy="65" r="5" className="text-red-300" />
                      </svg>
                      <h3 className="font-sans text-lg font-bold text-gray-800">Your basket is empty</h3>
                      <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                        It looks like you haven't added any pizza to your basket yet. Go on, grab a slice of heaven!
                      </p>
                      <button
                        id="start-ordering-btn"
                        onClick={onClose}
                        className="px-6 py-2.5 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 shadow-sm transition-all text-sm"
                      >
                        Start Ordering
                      </button>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layoutId={`cart-item-${item.id}`}
                        className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 relative group"
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        {/* Pizza thumbnail */}
                        <div className="w-16 h-16 rounded-full flex-shrink-0 bg-white shadow-sm flex items-center justify-center p-1">
                          <img
                            src={item.pizza.image}
                            alt={item.pizza.name}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 object-cover rounded-full"
                          />
                        </div>

                        {/* Pizza Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 truncate leading-snug">{item.pizza.name}</h4>
                          <p className="text-xs font-medium text-red-500 mt-0.5">
                            {item.selectedSize} Size
                          </p>
                          {item.selectedToppings.length > 0 && (
                            <p className="text-[10px] text-gray-500 truncate mt-0.5 leading-none">
                              Toppings: {item.selectedToppings.join(', ')}
                            </p>
                          )}
                          
                          {/* Cart Quantity Controls */}
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="flex items-center rounded-full bg-white border border-gray-100 p-0.5">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 font-bold text-xs"
                              >
                                -
                              </button>
                              <span className="w-5 text-center font-mono text-xs font-bold">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 font-bold text-xs"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-xs text-gray-400">x</span>
                            <span className="text-xs font-mono font-bold text-gray-800">${item.pizza.price.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Action column */}
                        <div className="flex flex-col items-end justify-between h-full space-y-4">
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-bold font-mono text-gray-900 whitespace-nowrap">
                            ${(item.pizza.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Footer calculations & checkout actions */}
                {cartItems.length > 0 && (
                  <div className="p-6 border-t border-gray-100 space-y-4 bg-gray-50/30">
                    {/* Promo input */}
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <Ticket className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Promo code (PIZZA20)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          disabled={promoApplied}
                          className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-red-500 disabled:opacity-60 bg-white"
                        />
                      </div>
                      <button
                        onClick={handleApplyPromo}
                        disabled={promoApplied}
                        className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-400 transition-colors"
                      >
                        {promoApplied ? 'Applied' : 'Apply'}
                      </button>
                    </div>

                    {/* Summary Calculations */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-500">
                        <span>Subtotal</span>
                        <span className="font-mono">${subtotal.toFixed(2)}</span>
                      </div>
                      {promoApplied && (
                        <div className="flex justify-between text-green-600 font-semibold">
                          <span>Promo Discount (20%)</span>
                          <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-gray-500">
                        <span>Delivery Fee</span>
                        <span className="font-mono">${deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>Estimated Tax (8%)</span>
                        <span className="font-mono">${taxAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-900 font-bold text-base pt-2 border-t border-gray-100">
                        <span>Grand Total</span>
                        <span className="font-mono text-red-500">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <motion.button
                      id="checkout-submit-btn"
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-red-200 hover:shadow-xl transition-all disabled:opacity-50"
                      whileTap={{ scale: 0.98 }}
                    >
                      {isCheckingOut ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Place Your Pizza Order</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                )}
              </>
            ) : (
              /* Success / Thank You screen */
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500" />
                </motion.div>

                <div className="space-y-2">
                  <h2 className="font-sans text-2xl font-black text-gray-900">Order Placed!</h2>
                  <p className="text-red-500 font-bold font-mono tracking-wide text-xs uppercase bg-red-50 px-3 py-1 rounded-full inline-block">
                    Order ID: #PZ-59374
                  </p>
                </div>

                <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                  Your pizza is being hand-kneaded by our chef maestro with fresh toppings, and will be out for delivery in 15-20 minutes. Keep your appetite ready!
                </p>

                {/* Live Tracking Simulator */}
                <div className="w-full border border-gray-100 rounded-3xl p-4 bg-gray-50/50 space-y-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block text-left">
                    Live Pizza tracker
                  </span>
                  <div className="flex items-center space-x-4">
                    <div className="relative flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold text-sm">
                        👨‍🍳
                      </div>
                      <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-ping" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">Preparing Ingredients</p>
                      <p className="text-[11px] text-gray-500 leading-none mt-0.5">Chef is hand-tossing the fresh sourdough base</p>
                    </div>
                  </div>
                </div>

                <button
                  id="reset-checkout-btn"
                  onClick={handleResetCheckout}
                  className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl text-sm font-bold shadow-md transition-colors"
                >
                  Back to Foodie Heaven
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
