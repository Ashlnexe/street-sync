"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Step B: INSERT a new row into the Supabase orders table
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            email: formData.email,
            total_amount: cartTotal,
            status: "pending",
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderId = orderData.id;
      // Extract a short tracking number from the UUID
      const shortOrderId = orderId.substring(0, 8).toUpperCase();

      // Step C: Map over the cart items and INSERT each item into order_items
      const orderItemsToInsert = cartItems.map((item) => ({
        order_id: orderId,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.sale_price || item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItemsToInsert);

      if (itemsError) throw itemsError;

      // Step D: Construct WhatsApp message string
      const itemsText = cartItems
        .map((item) => {
          const price = item.product.sale_price || item.product.price;
          const sizeStr = item.size ? ` (${item.size})` : "";
          return `- ${item.quantity}x ${item.product.title}${sizeStr} - ₹${price}`;
        })
        .join("\n");

      const message = `Street Sync™ Order # ${shortOrderId}
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}

Items:
${itemsText}

Total: ₹${cartTotal}`;

      // Step E: URL-encode message and redirect
      const encodedMessage = encodeURIComponent(message);
      // Place your phone number variable here
      const whatsappPhoneNumber = "+919074245581"; 
      const whatsappUrl = `https://wa.me/${whatsappPhoneNumber}?text=${encodedMessage}`;
      
      // Step F: Clear the cart
      clearCart();
      
      // Redirect to WhatsApp
      window.location.href = whatsappUrl;
      
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Failed to place order. Please try again or contact support.");
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] p-4">
        <Card className="w-full max-w-md text-center border-0 shadow-xl rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-black uppercase tracking-widest text-black">Your cart is empty</CardTitle>
            <CardDescription>Add some items to your cart to proceed with checkout.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full bg-[#1a1a1a] hover:bg-black text-white font-bold tracking-wide uppercase py-6 rounded-none">
                Continue Shopping
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <h1 className="text-3xl font-black uppercase tracking-widest text-black mb-8">Checkout</h1>
          <Card className="border-0 shadow-xl rounded-xl overflow-hidden bg-black text-white">
            <CardHeader className="border-b border-gray-800 px-8 py-6">
              <CardTitle className="text-xl font-bold uppercase tracking-wide">Shipping Details</CardTitle>
              <CardDescription className="text-gray-400">Enter your details to complete the order via WhatsApp.</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-xs font-bold uppercase text-gray-400 tracking-wider">Full Name</Label>
                  <Input 
                    id="name" name="name" placeholder="John Doe" required 
                    value={formData.name} onChange={handleChange}
                    className="bg-zinc-900 border-zinc-800 focus:border-white focus:ring-0 rounded-md py-6 px-4 text-white placeholder:text-gray-600"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-xs font-bold uppercase text-gray-400 tracking-wider">Email Address</Label>
                  <Input 
                    id="email" name="email" type="email" placeholder="john@example.com" required 
                    value={formData.email} onChange={handleChange}
                    className="bg-zinc-900 border-zinc-800 focus:border-white focus:ring-0 rounded-md py-6 px-4 text-white placeholder:text-gray-600"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-xs font-bold uppercase text-gray-400 tracking-wider">Phone Number</Label>
                  <Input 
                    id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required 
                    value={formData.phone} onChange={handleChange}
                    className="bg-zinc-900 border-zinc-800 focus:border-white focus:ring-0 rounded-md py-6 px-4 text-white placeholder:text-gray-600"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="address" className="text-xs font-bold uppercase text-gray-400 tracking-wider">Complete Shipping Address</Label>
                  <Textarea 
                    id="address" name="address" placeholder="123 Street Name, Apartment 4B, City, State, ZIP" rows={4} required 
                    value={formData.address} onChange={handleChange}
                    className="bg-zinc-900 border-zinc-800 focus:border-white focus:ring-0 rounded-md p-4 resize-none text-white placeholder:text-gray-600"
                  />
                </div>
                
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-white hover:bg-gray-200 text-black font-bold text-sm tracking-widest uppercase py-7 rounded-none transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Place Order via WhatsApp"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5">
          <Card className="sticky top-8 border-0 shadow-xl rounded-xl overflow-hidden bg-black text-white">
            <CardHeader className="border-b border-gray-800 px-8 py-6">
              <CardTitle className="text-xl font-bold uppercase tracking-wide">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {cartItems.map((item, index) => {
                  const price = item.product.sale_price || item.product.price;
                  return (
                    <div key={index} className="flex gap-4 items-center group">
                      <div className="relative h-20 w-20 bg-zinc-900 rounded-md overflow-hidden shrink-0 border border-zinc-800">
                        <Image 
                          src={item.product.image || item.product.images?.[0] || "/placeholder.jpg"} 
                          alt={item.product.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm uppercase truncate text-white">{item.product.title}</h4>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                          Qty: {item.quantity} {item.size && `| Size: ${item.size}`}
                        </p>
                      </div>
                      <div className="font-black text-sm text-white whitespace-nowrap">
                        ₹ {price * item.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <Separator className="my-8 border-gray-800" />
              
              <div className="flex items-center justify-between font-black text-xl text-white">
                <span className="uppercase tracking-widest text-sm text-gray-400">Total</span>
                <span>₹ {cartTotal}</span>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
