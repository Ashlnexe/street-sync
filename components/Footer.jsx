"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 text-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-black tracking-tighter uppercase mb-6">
              Street<span className="text-green-600">Sync</span>
            </h2>
            <p className="text-gray-500 text-sm">
              Defining the new wave of Indian streetwear. Minimal. Clean. Sync with the streets.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 uppercase text-sm tracking-wider">Explore</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/shop" className="hover:text-green-600 transition-colors">All Products</Link></li>
              <li><Link href="/shipping" className="hover:text-green-600 transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 uppercase text-sm tracking-wider">Socials</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="https://www.instagram.com/streetsync.co" target="_blank" rel="noreferrer" className="hover:text-green-600 transition-colors">Instagram</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 uppercase text-sm tracking-wider">Location</h3>
            <p className="text-sm text-gray-500">
              India<br/>
              Operating Worldwide
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-100 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} StreetSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
