import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Design } from "@/data/designs";

export interface CartItem {
  design: Design;
  phoneModel: string;
  quantity: number;
}

export interface CustomCartItem {
  id: string;
  type: "custom";
  brand: string;
  model: string;
  color: string;
  theme: string;
  vibes: string[];
  price: number;
}

type AnyCartItem = CartItem | CustomCartItem;

interface CartContextType {
  items: CartItem[];
  customItems: CustomCartItem[];
  addItem: (design: Design, phoneModel: string) => void;
  addCustomItem: (item: Omit<CustomCartItem, "id">) => void;
  removeItem: (designId: string) => void;
  removeCustomItem: (id: string) => void;
  updateQuantity: (designId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cc-cart");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [customItems, setCustomItems] = useState<CustomCartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cc-custom-cart");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("cc-cart", JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem("cc-custom-cart", JSON.stringify(customItems)); }, [customItems]);

  const addItem = (design: Design, phoneModel: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.design.id === design.id && i.phoneModel === phoneModel);
      if (existing) return prev.map((i) => i.design.id === design.id && i.phoneModel === phoneModel ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { design, phoneModel, quantity: 1 }];
    });
  };

  const addCustomItem = (item: Omit<CustomCartItem, "id">) => {
    setCustomItems((prev) => [...prev, { ...item, id: crypto.randomUUID() }]);
  };

  const removeItem = (designId: string) => setItems((prev) => prev.filter((i) => i.design.id !== designId));
  const removeCustomItem = (id: string) => setCustomItems((prev) => prev.filter((i) => i.id !== id));
  const updateQuantity = (designId: string, qty: number) => {
    if (qty <= 0) return removeItem(designId);
    setItems((prev) => prev.map((i) => i.design.id === designId ? { ...i, quantity: qty } : i));
  };
  const clearCart = () => { setItems([]); setCustomItems([]); };

  const totalItems = items.reduce((s, i) => s + i.quantity, 0) + customItems.length;
  const totalPrice = items.reduce((s, i) => s + i.design.price * i.quantity, 0) + customItems.reduce((s, i) => s + i.price, 0);

  return (
    <CartContext.Provider value={{ items, customItems, addItem, addCustomItem, removeItem, removeCustomItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
