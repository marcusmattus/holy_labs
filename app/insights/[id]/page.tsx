'use client';

import { NavBar } from '@/components/shared/NavBar';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { RefreshCcw, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Insights() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<'generations' | 'traffic' | 'logs'>('generations');
    
    const history = [
        { version: 'v1.4', prompt: 'Add real-time candle charts to the portfolio view', timestamp: '12m ago', author: 'AI Agent' },
        { version: 'v1.3', prompt: 'Implement dark mode toggle with obsidian theme', timestamp: '2h ago', author: 'User' },
        { version: 'v1.2', prompt: 'Style the navigation bar to be glassmorphic', timestamp: '1d ago', author: 'AI Agent' },
        { version: 'v1.1', prompt: 'Initial structural layout for fintech dashboard', timestamp: '2d ago', author: 'System' }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#050505] text-[#F0F0F0]">
            <NavBar />
            <main className="flex-1 grid grid-cols-12 w-full h-full">
                
                {/* Sidebar: Navigation & Metrics */}
                <div className="col-span-12 lg:col-span-3 border-r border-[#1A1A1A] p-10 bg-[#0A0A0A] flex flex-col">
                    <div className="mb-12">
                        <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-4">Nav_Routes</h4>
                        <div className="space-y-1">
                            <button onClick={() => setActiveTab('generations')} className={cn("w-full text-left px-4 py-3 text-[11px] font-mono uppercase tracking-widest transition-colors", activeTab === 'generations' ? 'bg-[#1A1A1A] text-white' : 'text-white/40 hover:text-white hover:bg-[#050505]')}>01_Generation History</button>
                            <button onClick={() => setActiveTab('traffic')} className={cn("w-full text-left px-4 py-3 text-[11px] font-mono uppercase tracking-widest transition-colors", activeTab === 'traffic' ? 'bg-[#1A1A1A] text-white' : 'text-white/40 hover:text-white hover:bg-[#050505]')}>02_Edge Traffic</button>
                            <button onClick={() => setActiveTab('logs')} className={cn("w-full text-left px-4 py-3 text-[11px] font-mono uppercase tracking-widest transition-colors", activeTab === 'logs' ? 'bg-[#1A1A1A] text-white' : 'text-white/40 hover:text-white hover:bg-[#050505]')}>03_Build Logs</button>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-[#1A1A1A]">
                        <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-4">Telemetry Stream</h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
                                <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Active Users</span>
                                <span className="text-xs font-mono">1,204</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
                                <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">Latency</span>
                                <span className="text-xs font-mono text-[#D4AF37]">42ms</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
                                <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase">AI Tokens</span>
                                <span className="text-xs font-mono">12.4k</span>
                            </div>
                        </div>
                    </div>

                    {/* Ghost Build Card */}
                    <div className="mt-auto pt-8">
                        <div className="border border-[#D4AF37] p-6 bg-[#050505]">
                            <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mb-2">Build Health</p>
                            <p className="text-[11px] font-mono opacity-60 leading-relaxed uppercase">Optimal structural integrity.</p>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="col-span-12 lg:col-span-9 p-10 lg:p-16 overflow-y-auto">
                    <header className="mb-12 pb-8 border-b border-[#1A1A1A] flex justify-between items-end">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 border border-[#D4AF37]">SYS_DATA</span>
                                <h1 className="text-xl font-serif italic text-white/60">Insight Module</h1>
                            </div>
                            <h2 className="text-5xl font-sans tracking-tighter uppercase font-bold">Stark Finance</h2>
                        </div>
                        <div className="flex gap-4">
                            <Link href={`/studio/${id}`} className="px-6 py-3 border border-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest hover:border-[#D4AF37] transition-colors bg-[#0A0A0A]">Modify Source</Link>
                        </div>
                    </header>

                    <div className="border border-[#1A1A1A] bg-[#0A0A0A] mb-12">
                        <div className="px-8 py-6 border-b border-[#1A1A1A] flex justify-between items-center bg-[#050505]">
                            <h3 className="text-[11px] font-mono uppercase tracking-widest">Version Lineage</h3>
                            <div className="text-[10px] font-mono text-[#D4AF37]">14 COMMITS_</div>
                        </div>

                        <div className="divide-y divide-[#1A1A1A]">
                            {history.map((item, i) => (
                                <div key={i} className="p-8 hover:bg-[#050505] transition-colors relative group flex flex-col md:flex-row gap-8 items-start">
                                    <div className="flex items-start gap-6 md:w-1/4">
                                        <div className="w-12 h-12 border border-[#1A1A1A] flex items-center justify-center text-[10px] font-mono text-[#D4AF37] bg-[#050505]">{item.version}</div>
                                        <div className="flex flex-col gap-1 pt-1">
                                            <span className="text-[10px] font-mono uppercase tracking-widest">{item.author}</span>
                                            <span className="text-[9px] font-mono opacity-40 uppercase">{item.timestamp}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 pt-2">
                                        <p className="text-xs font-mono opacity-80 uppercase leading-relaxed text-[#D4AF37]">&gt; {item.prompt}</p>
                                    </div>

                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity pt-2">
                                        <button className="border border-[#D4AF37] px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors">Revert</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="border border-[#1A1A1A] p-8 flex flex-col justify-between h-56 bg-[#0A0A0A]">
                            <div className="flex justify-between items-center border-b border-[#1A1A1A] pb-4">
                                <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">Memory Stack</span>
                                <span className="text-[10px] font-mono opacity-40">4.2 / 5.0 GB</span>
                            </div>
                            <div>
                                <div className="text-4xl font-sans tracking-tighter mb-4">84% <span className="text-xs font-mono opacity-40 uppercase tracking-widest ml-2">Allocated</span></div>
                                <div className="w-full h-[1px] bg-[#1A1A1A]">
                                    <div className="h-full bg-[#D4AF37]" style={{ width: '84%' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="border border-[#1A1A1A] p-8 flex flex-col justify-between h-56 bg-[#050505] relative overflow-hidden">
                            <div className="absolute top-8 right-8 opacity-10">
                                <LayoutTemplate className="w-32 h-32 text-[#D4AF37]" strokeWidth={1} />
                            </div>
                            <div className="flex justify-between items-center border-b border-[#1A1A1A] pb-4 relative z-10">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">Topology</span>
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-3xl font-sans font-bold tracking-tighter uppercase mb-2">Global <span className="text-[#D4AF37]">Node</span></h4>
                                <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Routing via 42 POPs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
