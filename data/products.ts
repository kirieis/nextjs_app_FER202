export interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Canceling Headphones",
    image: "/products/headphones.svg",
    description: "Premium over-ear headphones with active noise cancellation and 30-hour battery life.",
    price: "$199.99",
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    image: "/products/smartwatch.svg",
    description: "Water-resistant smartwatch with real-time heart rate monitoring, GPS, and OLED display.",
    price: "$149.50",
  },
  {
    id: "3",
    name: "Digital Mirrorless Camera",
    image: "/products/camera.svg",
    description: "High-resolution 4K video recording with ultra-fast autofocus and interchangeable lenses.",
    price: "$799.00",
  },
  {
    id: "4",
    name: "RGB Mechanical Keyboard",
    image: "/products/keyboard.svg",
    description: "Customizable hot-swappable switches with dynamic per-key backlighting and wrist rest.",
    price: "$89.99",
  },
  {
    id: "5",
    name: "Ergonomic Wireless Mouse",
    image: "/products/mouse.svg",
    description: "Precision laser sensor with multi-device Bluetooth pairing and silent click buttons.",
    price: "$49.99",
  },
  {
    id: "6",
    name: "Waterproof Travel Backpack",
    image: "/products/backpack.svg",
    description: "Durable commuter backpack with dedicated padded 15.6-inch laptop compartment and USB port.",
    price: "$59.95",
  },
];
