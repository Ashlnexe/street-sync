"use client";
import Navbar from "@/components/Navbar";
import { ChevronDown } from "lucide-react";

export default function FaqPage() {
  const faqs = [
    {
      category: "Shipping & Orders",
      questions: [
        { q: "Do you ship worldwide?", a: "Yes. We are based in Jakarta, Indonesia, but we ship our pieces globally. Shipping costs are calculated at checkout." },
        { q: "How long does dispatch take?", a: "All in-stock orders are packed and shipped within 24-48 hours. Custom orders require additional build time." },
        { q: "Can I track my order?", a: "Absolutely. Once your order is dispatched, you will receive an email with your tracking number and a link to monitor its progress." }
      ]
    },
    {
      category: "Customs & Blister Packs",
      questions: [
        { q: "How do I order a custom Hot Wheels keychain?", a: "For 1-of-1 bespoke pieces, click the 'Customs' link in our navigation or reach out to us directly via Instagram DM (@mortic.id). We will source the car and design the custom blister pack artwork for you." },
        { q: "Can I open the blister pack?", a: "You can, but the blister pack is designed as a collectible display piece. If you open it, the packaging cannot be resealed, and the item is no longer eligible for exchange." }
      ]
    },
    {
      category: "Jewelry Care",
      questions: [
        { q: "Will the rings turn my finger green?", a: "No. Our rings are crafted from premium stainless steel and finished with high-quality plating. They are hypoallergenic and designed not to tarnish or turn your skin green." },
        { q: "Can I wear my ring in the shower?", a: "While our rings are highly durable, we recommend keeping them away from harsh chemicals, perfumes, and prolonged water exposure to maintain their maximum shine." }
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
