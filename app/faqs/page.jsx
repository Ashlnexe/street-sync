"use client";
import Navbar from "@/components/Navbar";
import { ChevronDown } from "lucide-react";

export default function FaqPage() {
  const faqs = [
    {
      category: "Shipping & Orders",
      questions: [
        { q: "Do you ship worldwide?", a: "Yes. We are based in Jakarta, Indonesia, but we ship our pieces globally. Shipping costs are calculated at checkout." },
        { q: "How long does dispatch take?", a: "All in-stock orders are packed and shipped within 24-48 hours. Pre-order items will have specific shipping timelines listed on their product pages." },
        { q: "Can I track my order?", a: "Absolutely. Once your order is dispatched, you will receive an email with your tracking number and a link to monitor its progress." }
      ]
    },
    {
      category: "Sizing & Fit",
      questions: [
        { q: "Are your items oversized?", a: "Yes, most of our tees and hoodies feature a relaxed, dropped-shoulder oversized fit. We recommend ordering your true size for our intended aesthetic, or sizing down if you prefer a standard fit." },
        { q: "Do you restock sold-out items?", a: "We operate on a drop model. Most pieces are limited runs and rarely restock. Sign up for our newsletter or follow our socials to stay notified of upcoming drops." }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        { q: "Can I return my order?", a: "All sales are final. We only accept returns or exchanges for defective items or if the incorrect item was sent to you." },
        { q: "What if my item is defective?", a: "Reach out to our support team within 7 days of delivery with photos of the defect, and we will sort it out immediately." }
      ]
    },
    {
      category: "Garment Care",
      questions: [
        { q: "How should I wash my garments?", a: "To maintain the heavy weight feel and premium prints, machine wash cold inside out with like colors. Hang dry or tumble dry low. Do not iron directly on the prints." }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white pb-24">
      <Navbar />
      
      {/* Header */}
      <div className="pt-32 pb-12 px-4 md:px-8 border-b border-gray-200 text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black mb-4">
          FAQs
        </h1>
        <p className="text-sm font-medium text-gray-500 lowercase">everything you need to know.</p>
      </div>

      {/* Accordion Container */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        {faqs.map((section, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-xl font-black uppercase tracking-tight text-black mb-6">
              {section.category}
            </h2>
            
            <div className="border-t border-gray-200">
              {section.questions.map((faq, i) => (
                <details key={i} className="group cursor-pointer border-b border-gray-200">
                  <summary className="flex items-center justify-between py-5 text-sm font-bold uppercase tracking-wide text-black list-none [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <ChevronDown className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180 group-hover:text-black" />
                  </summary>
                  <div className="pb-6 text-sm text-gray-600 leading-relaxed pr-8">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        {/* Contact Support Block */}
        <div className="mt-16 p-8 bg-[#f9f9f9] border border-gray-200 text-center flex flex-col items-center">
          <h3 className="text-lg font-black uppercase tracking-tight text-black mb-2">Still need help?</h3>
          <p className="text-sm text-gray-500 mb-6">We're real people. Reach out and we'll sort it out.</p>
          <a href="mailto:support@mortic.id" className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition">
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
}
