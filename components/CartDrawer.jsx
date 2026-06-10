"use client";

import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();

  if (!isCartOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace("Rp", "Rp ");
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-black uppercase tracking-widest text-black">Your Cart</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <p className="mb-4">Your cart is currently empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={`${item.product.id}-${item.size}-${idx}`} className="flex gap-4">
                {/* Product Image */}
                <div className="relative w-24 h-24 bg-[#f9f9f9] border border-gray-200 shrink-0">
                  <Image 
                    src={item.product.image} 
                    alt={item.product.title} 
                    fill 
                    className="object-cover" 
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start">
                    <Link 
                      href={`/product/${item.product.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="text-sm font-bold text-black uppercase hover:underline leading-tight"
                    >
                      {item.product.title}
                    </Link>
                    <button 
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-1 uppercase">
                    Size: {item.size}
                  </div>
                  
                  <div className="text-sm font-bold text-black mt-2">
                    {formatPrice(item.product.price)}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-300 w-max mt-auto bg-white rounded-md">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                      className="p-1.5 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-3 h-3 text-black" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-black">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                      className="p-1.5 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-3 h-3 text-black" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-[#f9f9f9]">
            <div className="flex justify-between items-center mb-6 text-black">
              <span className="text-sm font-bold uppercase tracking-widest">Subtotal</span>
              <span className="text-xl font-black">{formatPrice(cartTotal)}</span>
            </div>
            <p className="text-xs text-gray-500 mb-6 text-center">
              Taxes and shipping calculated at checkout
            </p>
            <button 
              onClick={() => {
                let message = "Hi StreetSync! I would like to place an order:\n\n";
                cartItems.forEach((item, index) => {
                  message += `${index + 1}. ${item.product.title} (Size: ${item.size})\n`;
                  message += `   Qty: ${item.quantity} x ${formatPrice(item.product.price)}\n`;
                });
                message += `\n*Total: ${formatPrice(cartTotal)}*\n`;
                message += "\nPlease let me know how to proceed with payment.";
                
                const encodedMessage = encodeURIComponent(message);
                // using a placeholder Indonesian phone number
                window.open(`https://wa.me/6281234567890?text=${encodedMessage}`, "_blank");
              }}
              className="w-full bg-[#1a1a1a] hover:bg-black text-white font-bold text-sm tracking-wide uppercase py-4 transition-colors"
            >
              Checkout via WhatsApp
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}
