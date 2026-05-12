'use client';

import { NavBar } from '@/components/shared/NavBar';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function StoreBrowse() {
  const listings = [
    { id: '1', title: 'Arbiter v2', price: '$49.00', desc: 'Financial dashboard templates' },
    { id: '2', title: 'Liturgy UI Kit', price: '$120.00', desc: 'Deep geometric configurations' },
    { id: '3', title: 'Neon Engine', price: 'FREE', desc: 'Core logic plugins' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#F0F0F0]">
      <NavBar />
      <main className="flex-1 grid grid-cols-12 w-full h-full">
        {/* Left column / Hero title */}
        <div className="col-span-12 lg:col-span-4 border-r border-[#1A1A1A] p-10 bg-[#0A0A0A] flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 border border-[#D4AF37]">02</span>
                <h2 className="text-xl font-serif italic text-white/60">Asset Registry</h2>
            </div>
            <h1 className="text-5xl font-sans font-bold uppercase tracking-tighter mb-6">The Store</h1>
            <p className="text-[11px] font-mono opacity-50 uppercase leading-relaxed tracking-widest border-l border-[#D4AF37] pl-4">
                Acquire UI blocks, state engines, and pure aesthetic components.
            </p>
            
            <div className="mt-auto border border-[#1A1A1A] bg-[#050505] p-2 flex items-center">
                <Search className="w-4 h-4 text-[#D4AF37] ml-2" />
                <input type="text" placeholder="QUERY INDEX..." className="bg-transparent border-none w-full p-2 text-[10px] font-mono focus:outline-none placeholder-[#1A1A1A] uppercase tracking-widest" />
            </div>
        </div>

        {/* Store Grid */}
        <div className="col-span-12 lg:col-span-8">
            <div className="h-16 border-b border-[#1A1A1A] flex items-center px-10 bg-[#050505] justify-between">
                <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Available Items</span>
                <span className="text-[10px] font-mono text-[#D4AF37]">3,104 ASSETS</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
                {listings.map(item => (
                    <div key={item.id} className="border-r border-b border-[#1A1A1A] p-10 flex flex-col h-72 hover:bg-[#0A0A0A] transition-colors group relative cursor-pointer">
                        <div className="absolute top-4 right-4 text-[10px] font-mono opacity-30 group-hover:opacity-100 transition-opacity uppercase border border-[#1A1A1A] group-hover:border-[#D4AF37] px-2 py-1">View_</div>
                        <div className="flex-1 mt-4">
                            <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">{item.title}</h3>
                            <p className="text-[11px] font-mono opacity-50 uppercase tracking-widest">{item.desc}</p>
                        </div>
                        <div className="flex justify-between items-end border-t border-[#1A1A1A] pt-6">
                            <span className="text-sm font-mono text-[#D4AF37]">{item.price}</span>
                            <button className="text-[10px] font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors">Acquire</button>
                        </div>
                    </div>
                ))}
                
                {/* Empty block to fill out grid */}
                <div className="border-r border-b border-[#1A1A1A] p-10 flex items-center justify-center opacity-10 bg-[#0A0A0A]">
                    <span className="font-mono text-4xl">+</span>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
