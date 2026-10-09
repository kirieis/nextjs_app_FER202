export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    price: 199.99,
    description: "Premium over-ear headphones with active noise cancellation and 30-hour battery life.",
    category: "Audio",
    image: "/products/headphones.jpg",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 149.5,
    description: "Water-resistant smartwatch with real-time heart rate monitoring, GPS, and OLED display.",
    category: "Wearables",
    image: "/products/smartwatch.jpg",
  },
  {
    id: 3,
    name: "Digital Mirrorless Camera",
    price: 799.0,
    description: "High-resolution 4K video recording with ultra-fast autofocus and interchangeable lenses.",
    category: "Photography",
    image: "/products/camera.jpg",
  },
  {
    id: 4,
    name: "RGB Mechanical Keyboard",
    price: 89.99,
    description: "Customizable hot-swappable switches with dynamic per-key backlighting and wrist rest.",
    category: "Accessories",
    image: "/products/keyboard.jpg",
  },
  {
    id: 5,
    name: "Ergonomic Wireless Mouse",
    price: 49.99,
    description: "Precision laser sensor with multi-device Bluetooth pairing and silent click buttons.",
    category: "Accessories",
    image: "/products/mouse.jpg",
  },
  {
    id: 6,
    name: "Waterproof Travel Backpack",
    price: 59.95,
    description: "Durable commuter backpack with dedicated padded 15.6-inch laptop compartment and USB port.",
    category: "Gear",
    image: "/products/backpack.jpg",
  },
];
