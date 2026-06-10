"use client";
import { X, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function QuickViewModal({ product, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const { addToCart } = useCart();
  
  useEffect(() => {
    if (product?.sizes?.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product, selectedSize || "OS", quantity);
    onClose(); // Optional: close modal on add, CartDrawer will open automatically
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Dark overlay backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white w-full h-full md:w-[800px] md:h-auto md:max-h-[90vh] md:rounded-xl overflow-y-auto flex flex-col md:flex-row shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex items-center justify-center min-w-[44px] min-h-[44px] bg-gray-100 rounded-full hover:bg-gray-200 transition"
        >
          <X className="w-5 h-5 text-black" />
        </button>

        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-200 min-h-[40vh]">
          {product.image ? (
            <div className="relative w-full aspect-square">
              <Image src={product.image} alt={product.title} fill className="object-contain" />
            </div>
          ) : (
            <span className="text-gray-400">Product Image</span>
          )}
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full md:w-1/2 bg-[#f9f9f9] p-6 md:p-10 flex flex-col">
          <h2 className="text-3xl font-black uppercase leading-tight mb-2 text-black">
            {product.title}
          </h2>
          
          {product.badges && product.badges.length > 0 && (
            <div className="bg-black text-white text-xs font-bold px-2 py-1 uppercase w-max mb-4">
              {product.badges[0]}
            </div>
          )}

          <div className="text-xl font-bold text-black mb-6">
            {product.salePrice}
          </div>

          <hr className="border-gray-300 mb-6" />

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-black">size: <strong className="uppercase">{selectedSize}</strong></span>
              <button className="text-xs font-bold underline underline-offset-4 text-black">SIZE CHART</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[3rem] px-2 h-8 flex items-center justify-center text-xs font-bold uppercase border border-gray-300 rounded-full transition-colors
                    ${selectedSize === size ? "bg-black text-white border-black" : "bg-transparent text-gray-500 hover:border-black"}
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buy Box Actions */}
          <div className="flex gap-3 mb-3">
            {/* Quantity */}
            <div className="flex items-center border border-gray-300 rounded-md bg-white">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-50">
                <Minus className="w-4 h-4 text-black" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-black">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-50">
                <Plus className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* Add to Cart */}
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-[#1a1a1a] hover:bg-black text-white font-bold text-sm uppercase rounded-md transition-colors"
            >
              Add to cart
            </button>
          </div>

          {/* Buy it Now */}
          <button className="w-full bg-[#1a1a1a] hover:bg-black text-white font-bold text-sm uppercase py-4 rounded-md transition-colors">
            Buy it now
          </button>
        </div>
      </div>
    </div>
  );
}
