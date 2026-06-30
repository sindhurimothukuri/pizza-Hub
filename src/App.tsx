import heroPizza from './assets/images/hero_pizza_1782750035492.jpg';
import maestroChef from './assets/images/maestro_chef_1782750092253.jpg';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Minus, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  Heart,  
  ShoppingBag, 
  Flame, 
  Leaf, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles,
  Info
} from 'lucide-react';

import { pizzas, testimonials } from './data/pizzaData';
import { PizzaItem, CartItem } from './types';
import { Header } from './components/Header';
import { FloatingIngredient } from './components/FloatingIngredient';
import { PizzaCard } from './components/PizzaCard';
import { CartDrawer } from './components/CartDrawer';
import { PizzaModal } from './components/PizzaModal';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPizza, setSelectedPizza] = useState<PizzaItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Quick navigation to sections
  const handleNavigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart operations
  const handleAddToCartSimple = (pizza: PizzaItem, quantity: number) => {
    // Standard addition with Medium size and default empty toppings
    const cartId = `${pizza.id}-Medium-default`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: cartId, pizza, quantity, selectedSize: 'Medium', selectedToppings: [] }];
    });
  };

  const handleAddToCartCustom = (
    pizza: PizzaItem,
    quantity: number,
    size: 'Small' | 'Medium' | 'Large',
    toppings: string[]
  ) => {
    const toppingsKey = toppings.sort().join(',') || 'default';
    const cartId = `${pizza.id}-${size}-${toppingsKey}`;

    // Adjust price if size or extra toppings selected
    const sizeSurcharge = size === 'Small' ? -1.5 : size === 'Large' ? 2.5 : 0;
    const toppingsPrice = toppings.length * 0.99;
    const adjustedPizza = {
      ...pizza,
      price: pizza.price + sizeSurcharge + toppingsPrice,
    };

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: cartId, pizza: adjustedPizza, quantity, selectedSize: size, selectedToppings: toppings }];
    });
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)));
    }
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Newsletter Submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setEmailInput('');
      }, 3000);
    }
  };

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FAF6F0] selection:bg-red-500 selection:text-white pb-0">
      
      {/* Absolute Decorative Blobs */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-green-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[40vh] right-0 w-96 h-96 bg-red-200/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20vh] left-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Ingredients Scattered Professionally */}
      <FloatingIngredient type="basil" className="top-24 left-10 w-16 h-16 md:w-20 md:h-20" delay={0.2} duration={5} />
      <FloatingIngredient type="tomato" className="top-36 right-16 w-20 h-20 md:w-24 md:h-24" delay={1.1} duration={7} />
      <FloatingIngredient type="chili" className="top-[50vh] left-8 w-14 h-14 md:w-16 md:h-16" delay={0.7} duration={6} />
      <FloatingIngredient type="olive" className="top-[45vh] right-24 w-12 h-12 md:w-14 md:h-14" delay={1.8} duration={8} />
      <FloatingIngredient type="onion" className="top-[85vh] right-[10%] w-16 h-16 md:w-20 md:h-20" delay={0.4} duration={6.5} />
      <FloatingIngredient type="mushroom" className="top-[100vh] left-20 w-14 h-14 md:w-16 md:h-16" delay={1.5} duration={5.5} />

      {/* Header component */}
      <Header 
        cartCount={cartTotalItems} 
        onCartClick={() => setIsCartOpen(true)} 
        onNavigateToSection ={handleNavigateToSection} 
      />

      {/* Hero Section */}
      <section id="hero" className ="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 md:px-12 pt-10 pb-20">
        <div className="max-w-4xl mx-auto z-10 flex flex-col items-center">
          
          {/* Accent Mini Tag */}
          <motion.div 
            className   ="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Sparkles className="w-3.5 h-3.5 fill-red-500 text-red-500 animate-spin-slow" />
            Made with love, delivered hot
          </motion.div>

          {/* Main Hero Headline matching video aesthetic */}
          <motion.h1 
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-gray-950 tracking-tight leading-[1.05] mb-6"
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Your Delicious Pizza <br />
            <span className="text-red-500">Start Here!</span>
          </motion.h1>

          {/* Core Subtitle */}
          <motion.p 
            className="text-base md:text-lg text-gray-600 font-medium max-w-xl mb-10 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Gather your friends and family and enjoy the best pizza in town. Freshly tossed organic sourdough base, sun-ripened tomatoes, and premium artisan toppings.
          </motion.p>

          {/* Primary Action Button */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              id="view-menu-hero-btn"
              onClick={() => handleNavigateToSection('menu')}
              className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full text-base font-black tracking-wide shadow-lg shadow-red-200 hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>View Our Menu</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Huge interactive Pizza stage matching at the bottom */}
          <motion.div 
            className="relative mt-16 w-80 h-80 md:w-[450px] md:h-[450px] flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 20, delay: 0.4 }}
          >
            {/* Soft Shadow behind the main pizza */}
            <div className="absolute bottom-4 w-[85%] h-12 bg-gray-950/10 rounded-full blur-xl animate-pulse" />
            
            {/* Spinning Pizza Circle */}
            <motion.img
              src={heroPizza}
              alt="Premium Neapolitan Pizza"
              referrerPolicy="no-referrer"
              className="w-76 h-76 md:w-[420px] md:h-[420px] object-cover rounded-full shadow-2xl z-10 border-4 border-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Section: A Slice of Perfection in Every Bite! */}
      <section id="perfection" className="py-24 bg-white/60 border-y border-orange-100/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Rotating Pizza Showcase with floating badge */}
          <div className="relative flex justify-center items-center">
            {/* Ambient Background Circles */}
            <div className="absolute w-96 h-96 rounded-full border border-orange-100/50 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full border border-dashed border-red-100/80 flex items-center justify-center" />
            </div>

            {/* Quick Delivery Tag */}
            <div className="absolute top-4 left-6 bg-green-500 text-white font-extrabold text-xs px-4 py-2 rounded-2xl shadow-lg z-20 flex items-center gap-1.5 animate-bounce">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              Quick Delivery
            </div>

            {/* Interactive Badge connected with line */}
            <motion.div 
              className="absolute right-0 top-16 bg-white/95 backdrop-blur border border-orange-100 rounded-3xl p-3.5 shadow-xl z-20 flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center font-bold text-lg text-white">
                🍕
              </div>
              <div>
                <p className="text-xs font-black text-gray-900 leading-none">Capricciosa Pizza</p>
                <p className="text-[10px] font-bold text-red-500 mt-1">Chef Recommendation</p>
              </div>
            </motion.div>

            {/* Pizza Image rotating */}
            <motion.div
              className="relative z-10 w-72 h-72 md:w-96 md:h-96"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={heroPizza}
                alt="Perfect Capricciosa Pizza"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
              />
            </motion.div>
          </div>

          {/* Right Column: Premium Text block */}
          <div className="space-y-6">
            <span className="text-red-500 font-extrabold text-xs uppercase tracking-widest block">
              Pure Italian Craftsmanship
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              A Slice of <span className="text-red-500 italic">Perfection</span> <br />
              in Every Bite!
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
              Crafted with fresh ingredients, bold flavours, and a whole lot of love — our pizzas are designed to satisfy your cravings. Whether you love classic cheese combination or adventurous gourmet toppings, every single slice is a journey of taste that will keep you coming back for more!
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-red-50 text-red-500 rounded-xl mt-1">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Hot &amp; Fresh Always</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Straight from our hand-built clay woodfire ovens.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-50 text-green-600 rounded-xl mt-1">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">100% Organic Sourdough</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Naturally fermented dough for 48 hours.</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                id="view-more-perfection-btn"
                onClick={() => handleNavigateToSection('menu')}
                className="px-6 py-3.5 bg-gray-950 text-white hover:bg-gray-800 rounded-full font-bold text-sm tracking-wide shadow-md transition-colors cursor-pointer"
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-red-500 font-extrabold text-xs uppercase tracking-widest block">
            The Pizza Parlor Menu
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
            Your Delicious Pizza <br className="hidden sm:inline" />
            <span className="text-red-500">Start Here!</span>
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            Gather your friends and family and enjoy the best pizza in town. Freshly made and delivered hot! Choose your style, adjust size, and load extra cheese.
          </p>
        </div>

        {/* Pizzas grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pizzas.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              pizza={pizza}
              onAddToCart={handleAddToCartSimple}
              onQuickView={(p) => setSelectedPizza(p)}
            />
          ))}
        </div>

        {/* Bottom CTA block */}
        <div className="mt-16 text-center">
          <button
            id="view-full-menu-btn"
            onClick={() => handleNavigateToSection('menu')}
            className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl text-sm shadow-md transition-all cursor-pointer"
          >
            View Full Menu
          </button>
        </div>
      </section>

      {/* Maestro Chef Section */}
      <section id="about" className="py-24 bg-white/50 border-t border-orange-100/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Image in custom frame with floating assets */}
          <div className="relative flex justify-center">
            {/* Floating food items surrounding Chef */}
            <FloatingIngredient type="tomato" className="-top-6 left-12 w-14 h-14" delay={0.5} duration={5} />
            <FloatingIngredient type="basil" className="bottom-10 -left-6 w-12 h-12" delay={1.2} duration={6} />
            <FloatingIngredient type="olive" className="top-1/2 right-10 w-10 h-10" delay={0.8} duration={7} />

            {/* Custom rounded frame container */}
            <div className="relative w-80 h-80 md:w-[400px] md:h-[400px] rounded-[50px] overflow-hidden shadow-2xl border-8 border-white bg-gradient-to-tr from-amber-50 to-orange-100 flex items-center justify-center">
              <img
                src={maestroChef}
                alt="Chef Maestro"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="space-y-6">
            <span className="text-red-500 font-extrabold text-xs uppercase tracking-widest block">
              Meet our Creator
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Meet the <span className="text-red-500 italic">Maestro</span> <br />
              Behind the Magic!
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
              Our head chef isn't just passionate about pizza, he's obsessed with it. With over 15 years of experience, every pizza is a masterpiece of taste and texture. From hand-kneaded dough to the perfect topping combinations, our chef ensures every slice delivers pure, delicious joy.
            </p>

            <div className="bg-red-50/50 rounded-3xl p-6 border border-red-100 flex items-center gap-4 max-w-lg">
              <span className="text-3xl">👨‍🍳</span>
              <div>
                <p className="text-sm font-black text-gray-900">"Sourdough is a living thing. Treat it with respect, fire it with passion, and it will reward your tastebuds."</p>
                <p className="text-xs font-bold text-red-500 mt-1.5">— Chef Marco Giovanni, Head Maestro</p>
              </div>
            </div>

            <div className="pt-4">
              <button
                id="learn-more-chef-btn"
                onClick={() => handleNavigateToSection('perfection')}
                className="px-6 py-3.5 bg-gray-900 text-white hover:bg-gray-800 rounded-full font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-red-500 font-extrabold text-xs uppercase tracking-widest block">
            Love from Foodies
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-gray-900">
            What Our Customers <br />
            Are Saying!
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            We love making delicious pizzas, but hearing how much you enjoy them is the real reward! Check out what our happy customers have to say about their experiences.
          </p>
        </div>

        {/* Horizontal Testimonials exactly matching colors/layout in video */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => {
            // Colors corresponding exactly to green, pink/peach, and yellow from the video
            const getColors = () => {
              if (t.bgTheme === 'green') {
                return {
                  cardBg: 'bg-green-500/10 border-green-200/50',
                  accentText: 'text-green-700',
                  badgeBg: 'bg-green-100 text-green-800',
                  indicator: 'bg-green-500',
                };
              } else if (t.bgTheme === 'peach') {
                return {
                  cardBg: 'bg-pink-500/10 border-pink-200/50',
                  accentText: 'text-pink-700',
                  badgeBg: 'bg-pink-100 text-pink-800',
                  indicator: 'bg-pink-500',
                };
              } else {
                return {
                  cardBg: 'bg-amber-500/10 border-amber-200/50',
                  accentText: 'text-amber-700',
                  badgeBg: 'bg-amber-100 text-amber-800',
                  indicator: 'bg-amber-500',
                };
              }
            };

            const colors = getColors();

            return (
              <motion.div
                key={t.id}
                className={`rounded-3xl p-8 border ${colors.cardBg} flex flex-col justify-between relative overflow-hidden group`}
                whileHover={{ y: -6 }}
              >
                {/* Visual accent top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${colors.indicator}`} />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-black px-2.5 py-0.5 rounded-full uppercase ${colors.badgeBg}`}>
                      {t.role}
                    </span>
                    <div className="flex items-center space-x-0.5 text-amber-400">
                      {[...Array(t.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-extrabold text-gray-900 text-lg leading-tight">
                    "{t.title}"
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {t.text}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/30 flex items-center space-x-3">
                  <div className={`w-9 h-9 rounded-full ${colors.indicator} flex items-center justify-center font-bold text-white text-sm`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-900 leading-none">{t.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wide">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Deep Red Footer Section matching the video layout exactly */}
      <footer id="contact" className="bg-[#B91C1C] text-white pt-20 pb-8 rounded-t-[40px] relative overflow-hidden">
        
        {/* Subtle decorative pizza base at the bottom-right */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-red-700/20 blur-xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-red-400/20">
          
          {/* Column 1: Logo & Address */}
          <div className="space-y-6">
            <span className="font-serif text-4xl font-black tracking-tight block">
              Pizza<span className="text-green-400">.</span>
            </span>
            
            <div className="space-y-3 text-sm text-red-100 font-medium leading-relaxed">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                <p>123 Pizza Street, Foodie Town, NY 56789, United States</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-red-300" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-red-300" />
                <p>info@pizzaplace.com</p>
              </div>
            </div>
          </div>

          {/* Column 2: Opening Hours */}
          <div className="space-y-6">
            <h3 className="text-lg font-black tracking-wide text-white uppercase border-b border-red-500/50 pb-2">
              Opening Hours
            </h3>
            <div className="space-y-3 text-sm text-red-100 font-medium">
              <div className="flex justify-between items-center border-b border-red-700/50 pb-1.5">
                <span>Monday - Friday</span>
                <span className="font-mono bg-red-950/40 px-2 py-0.5 rounded-md font-bold text-xs">11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between items-center border-b border-red-700/50 pb-1.5">
                <span>Saturday - Sunday</span>
                <span className="font-mono bg-red-950/40 px-2 py-0.5 rounded-md font-bold text-xs">12:00 PM - 12:00 AM</span>
              </div>
              <div className="text-xs text-red-200 italic flex items-center gap-1.5 pt-1">
                <Clock className="w-3.5 h-3.5" /> Note: Kitchen closes 30 mins early
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-black tracking-wide text-white uppercase border-b border-red-500/50 pb-2">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-red-100 font-bold">
              <button onClick={() => handleNavigateToSection('hero')} className="text-left hover:text-white transition-colors duration-150 py-1">Home</button>
              <button onClick={() => handleNavigateToSection('menu')} className="text-left hover:text-white transition-colors duration-150 py-1">Menu</button>
              <button onClick={() => handleNavigateToSection('perfection')} className="text-left hover:text-white transition-colors duration-150 py-1">Details</button>
              <button onClick={() => handleNavigateToSection('about')} className="text-left hover:text-white transition-colors duration-150 py-1">About</button>
              <button onClick={() => handleNavigateToSection('contact')} className="text-left hover:text-white transition-colors duration-150 py-1">Contact</button>
              <button onClick={() => setIsCartOpen(true)} className="text-left hover:text-white transition-colors duration-150 py-1">Your Cart</button>
            </div>
          </div>

          {/* Column 4: Social Media & Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-black tracking-wide text-white uppercase border-b border-red-500/50 pb-2">
              Newsletter
            </h3>
            
            {!newsletterSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <p className="text-xs text-red-100 leading-relaxed font-medium">
                  Subscribe to get the latest slice of news &amp; secret pizza discounts!
                </p>
                <div className="flex gap-1">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="flex-1 bg-red-950/30 border border-red-400/30 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-white font-medium"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-red-600 rounded-xl font-bold text-xs hover:bg-red-50 transition-colors"
                  >
                    Join
                  </button>
                </div>
              </form>
            ) : (
              <motion.div 
                className="bg-red-950/20 border border-red-400/20 rounded-2xl p-4 text-center"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
              >
                <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-xs font-black text-white">Awesome, you're on the list!</p>
                <p className="text-[10px] text-red-100 mt-1">Check your inbox for a free garlic bread voucher.</p>
              </motion.div>
            )}

            {/* Social Icons */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-black tracking-widest text-red-200 uppercase">Follow Us</p>
              <div className="flex items-center space-x-3.5">
                <a href="#" className="p-2 bg-red-950/30 border border-red-400/20 rounded-xl hover:bg-white hover:text-red-600 transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-red-950/30 border border-red-400/20 rounded-xl hover:bg-white hover:text-red-600 transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 bg-red-950/30 border border-red-400/20 rounded-xl hover:bg-white hover:text-red-600 transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Footer Bottom */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-red-200 font-medium">
          <p>© 2026 Pizza. All rights reserved. Built with love and fire.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </footer>

      {/* Cart Slider Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Advanced Customizer Modal */}
      <PizzaModal
        pizza={selectedPizza}
        onClose={() => setSelectedPizza(null)}
        onAddToCart={handleAddToCartCustom}
      />
    </div>
  );
}
