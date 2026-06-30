export interface PizzaItem {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  colorTheme: 'green' | 'orange' | 'pink' | 'yellow';
  accentBg: string;
  tags: string[];
  ingredients: string[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export interface CartItem {
  id: string; // unique key combining pizza.id, size, and selected toppings
  pizza: PizzaItem;
  quantity: number;
  selectedSize: 'Small' | 'Medium' | 'Large';
  selectedToppings: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  title: string;
  text: string;
  rating: number;
  bgTheme: 'green' | 'peach' | 'yellow';
}
