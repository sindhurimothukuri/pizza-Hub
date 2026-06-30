import vegetablePizza from '../assets/images/vegetable_pizza_1782750072242.jpg';
import mushroomPizza from '../assets/images/mushroom_pizza_1782750055728.jpg';
import heroPizza from '../assets/images/hero_pizza_1782750035492.jpg';
import { PizzaItem, Testimonial } from '../types';


export const pizzas: PizzaItem[] = [
  {
    id: 'veg-pizza',
    name: 'Vegetable Pizza',
    description: 'Fresh sliced tomatoes, green bell peppers, sweet corn, black olives, red onions and gourmet mozzarella on our house-kneaded base.',
    price: 13.99,
    rating: 4.8,
    reviewsCount: 124,
    image: vegetablePizza,
    colorTheme: 'green',
    accentBg: 'bg-green-500',
    tags: ['Vegetarian', 'Fresh Herbs'],
    ingredients: ['Gourmet Mozzarella', 'San Marzano Tomato Sauce', 'Green Bell Peppers', 'Sweet Corn', 'Black Olives', 'Red Onion'],
    nutrition: {
      calories: 240,
      protein: '11g',
      carbs: '28g',
      fat: '8g'
    }
  },
  {
    id: 'mushroom-pizza',
    name: 'Mushroom Pizza',
    description: 'Double dynamic layers of gourmet white button mushrooms, shredded mozzarella, fresh oregano, with a hint of garlic infused olive oil.',
    price: 15.99,
    rating: 4.9,
    reviewsCount: 186,
    image: mushroomPizza,
    colorTheme: 'orange',
    accentBg: 'bg-orange-500',
    tags: ['Best Seller', 'Gourmet'],
    ingredients: ['White Button Mushrooms', 'Shredded Mozzarella', 'Fresh Oregano', 'Garlic Olive Oil', 'Truffle Drizzle'],
    nutrition: {
      calories: 265,
      protein: '13g',
      carbs: '26g',
      fat: '10g'
    }
  },
  {
    id: 'mix-veg-pizza',
    name: 'Mix Veg Pizza',
    description: 'The ultimate garden medley. Vibrant bell peppers, sun-ripened tomatoes, sweet corn, sliced black olives, layered with extra virgin olive oil.',
    price: 13.99,
    rating: 4.7,
    reviewsCount: 98,
    image: vegetablePizza,//Reusing the high quality veg image
    colorTheme: 'pink',
    accentBg: 'bg-pink-500',
    tags: ['Spicy', 'House Special'],
    ingredients: ['Vibrant Peppers', 'Sun-ripened Tomatoes', 'Sweet Corn', 'Black Olives', 'Chili Flakes', 'Mozzarella'],
    nutrition: {
      calories: 250,
      protein: '12g',
      carbs: '29g',
      fat: '9g'
    }
  },
  {
    id: 'capricciosa-pizza',
    name: 'Capricciosa Pizza',
    description: 'A classic Italian specialty featuring a rich blend of dry-aged pepperoni, savory mushrooms, black olives, artichoke hearts, and aromatic basil.',
    price: 16.49,
    rating: 4.95,
    reviewsCount: 242,
    image: heroPizza, //cheif's beautiful pizza
    colorTheme: 'yellow',
    accentBg: 'bg-amber-500',
    tags: ['Premium', 'Chef’s Choice'],
    ingredients: ['Dry-aged Pepperoni', 'Mushrooms', 'Black Olives', 'Artichoke Hearts', 'San Marzano Sauce', 'Fresh Basil'],
    nutrition: {
      calories: 290,
      protein: '15g',
      carbs: '25g',
      fat: '12g'
    }
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Ayesha K.',
    role: 'Food Blogger [Member]',
    title: 'Best pizza in town!',
    text: 'I’ve tried many pizza places, but nothing compares to this. The crust is perfectly crispy, the cheese melts in your mouth, and the toppings are always fresh and flavourful!',
    rating: 5,
    bgTheme: 'green'
  },
  {
    id: 't2',
    name: 'Rahul Mishra',
    role: 'Pizza Enthusiast',
    title: 'Absolutely delicious!',
    text: 'Every bite feels like a trip to Italy. The ingredients are always fresh, the sauce is rich, and the flavors are just right. Plus, the delivery is super fast!',
    rating: 5,
    bgTheme: 'peach'
  },
  {
    id: 't3',
    name: 'Emily Robinson',
    role: 'Marketing Executive',
    title: 'My go-to pizza place!',
    text: 'I love the variety of options and how each pizza is crafted with care. The crust has the perfect balance of crunch and chew, and toppings are always generously spread.',
    rating: 5,
    bgTheme: 'yellow'
  }
];
