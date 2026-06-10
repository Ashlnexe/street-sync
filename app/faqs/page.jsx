"use client";
import Navbar from "@/components/Navbar";

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <div className="pt-24 pb-6 px-4 md:px-8 border-b border-gray-200 sticky top-0 bg-white z-30">
        <div className="flex flex-col items-start">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-black">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-neutral-500 text-xs md:text-sm font-normal mt-2 tracking-wide lowercase">
            culture observed. signal received.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold uppercase mb-2">When will my order ship?</h3>
            <p className="text-gray-600">Orders are typically processed within 2-3 business days. You will receive a tracking number once your order has shipped.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold uppercase mb-2">Do you ship internationally?</h3>
            <p className="text-gray-600">Yes, we ship worldwide. Shipping costs will apply, and will be added at checkout.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold uppercase mb-2">What is your return policy?</h3>
            <p className="text-gray-600">We accept exchanges within 7 days of delivery on unworn, unwashed items with tags attached.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
