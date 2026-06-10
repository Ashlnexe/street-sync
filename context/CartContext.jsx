"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load cart from local storage on mount
  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem("mortic_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from local storage", e);
      }
    }
  }, []);

  // Save cart to local storage on change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("mortic_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, mounted]);

  const addToCart = (product, size, quantity) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItemIndex >= 0) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prev, { product, size, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, size) => {
    setCartItems((prev) => 
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    
    setCartItems((prev) => {
      const newCart = [...prev];
      const itemIndex = newCart.findIndex(
        (item) => item.product.id === productId && item.size === size
      );
      if (itemIndex >= 0) {
        newCart[itemIndex].quantity = quantity;
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
