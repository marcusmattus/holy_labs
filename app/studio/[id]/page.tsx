'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, Code, Monitor, Smartphone, LayoutGrid, Check, Settings, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';

export default function Studio() {
    const { id } = useParams();
    const isNew = id === 'new';
    
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile' | 'code'>('desktop');
    const [isGenerating, setIsGenerating] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [history, setHistory] = useState([
        { role: 'user', text: 'Create a minimal neobank dashboard with dark gold accents.' },
        { role: 'ai', text: 'Generated high-fidelity financial hub.' }
    ]);

    const startGeneration = () => {
        if (!prompt) return;
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setStreaming(true);
            setHistory(prev => [...prev, { role: 'user', text: prompt }]);
            setPrompt('');
            setTimeout(() => { 
                setStreaming(false); 
                setHistory(prev => [...prev, { role: 'ai', text: 'Layout adjusted. Applied aesthetic tokens.' }]);
            }, 2000);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col overflow-hidden bg-[#050505] text-[#F0F0F0]">
            {/* Top Navigation / Branding */}
            <nav className="h-20 border-b border-[#1A1A1A] flex items-center justify-between px-10 z-50 shrink-0 bg-[#0A0A0A]">
                <div className="flex items-center space-x-8">
                    <Link href="/" className="flex items-center space-x-4">
                        <div className="w-8 h-8 border border-[#D4AF37] rotate-45 flex items-center justify-center">
                            <div className="w-2 h-2 bg-[#D4AF37]"></div>
                        </div>
                        <span className="font-bold tracking-tighter text-2xl uppercase">Holy</span>
                    </Link>
                    <div className="h-6 w-px bg-[#1A1A1A]"></div>
                    <div className="flex items-center space-x-3 text-[10px] font-mono uppercase tracking-widest">
                        <span className="opacity-40">Target Instance:</span>
                        <span className="text-[#D4AF37]">{isNew ? 'New Generation' : 'Stark Finance'}</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center border border-[#1A1A1A] p-0.5 bg-[#050505]">
                        <button onClick={() => setViewMode('desktop')} className={cn("p-2 transition-colors", viewMode === 'desktop' ? "bg-[#1A1A1A] text-white" : "text-white/40 hover:text-white")}>
                            <Monitor className="w-4 h-4" />
                        </button>
                        <button onClick={() => setViewMode('mobile')} className={cn("p-2 transition-colors", viewMode === 'mobile' ? "bg-[#1A1A1A] text-white" : "text-white/40 hover:text-white")}>
                            <Smartphone className="w-4 h-4" />
                        </button>
                        <button onClick={() => setViewMode('code')} className={cn("p-2 transition-colors", viewMode === 'code' ? "bg-[#1A1A1A] text-white" : "text-white/40 hover:text-white")}>
                            <Code className="w-4 h-4" />
                        </button>
                    </div>
                    <Link href={`/deploy/${id}`} className="bg-[#F0F0F0] text-[#050505] px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-colors">
                        Execute Deploy
                    </Link>
                </div>
            </nav>

            {/* Builder Workspace Container using Grid */}
            <main className="flex-1 grid grid-cols-12 overflow-hidden">
                
                {/* Left Panel: AI Control / Studio Menu */}
                <aside className="col-span-12 lg:col-span-4 border-r border-[#1A1A1A] flex flex-col bg-[#050505] overflow-hidden">
                    <div className="p-8 border-b border-[#1A1A1A] flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-mono text-[#D4AF37] px-2 py-0.5 border border-[#D4AF37]">01</span>
                        <h2 className="text-xl font-serif italic text-white/80">Command Terminal</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 font-mono text-sm">
                        {/* History Stack */}
                        <div className="space-y-6">
                            {history.map((item, idx) => (
                                <div key={idx} className="group">
                                    <div className="flex items-center gap-3 mb-2 text-[10px] uppercase tracking-[0.2em]">
                                        <span className={cn(item.role === 'user' ? "text-[#F0F0F0] opacity-50" : "text-[#D4AF37]")}>
                                            {item.role === 'user' ? 'USER_INPUT' : 'SYS_RESPONSE'}
                                        </span>
                                    </div>
                                    <p className={cn("pl-4 py-1 border-l", item.role === 'user' ? "border-[#1A1A1A] opacity-80" : "border-[#D4AF37] text-white")}>
                                        {item.text}
                                    </p>
                                </div>
                            ))}

                            {/* Streaming UI */}
                            {streaming && (
                                <div className="border-l border-[#D4AF37] pl-4 py-2 space-y-2">
                                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#D4AF37]">
                                        <div className="w-2 h-2 bg-[#D4AF37]"></div>
                                        <span>Executing...</span>
                                    </div>
                                    <p className="text-sm border-[#1A1A1A] opacity-80 animate-pulse">
                                        &gt; Injecting protocol layers...<br/>
                                        &gt; Scaffolding aesthetic parameters...
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Fixed Bottom Input Area */}
                    <div className="p-8 border-t border-[#1A1A1A] bg-[#0A0A0A]">
                        <div className="border border-[#1A1A1A] bg-[#050505] p-1 relative flex flex-col focus-within:border-[#D4AF37] transition-colors">
                            <textarea 
                                value={prompt}
                                onChange={e => setPrompt(e.target.value)}
                                onKeyDown={e => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); startGeneration(); } }}
                                placeholder="&gt; INPUT PARAMETERS..." 
                                className="w-full bg-transparent border-none p-4 focus:outline-none focus:ring-0 text-xs font-mono placeholder-[#1A1A1A] resize-none min-h-[80px]"
                            />
                            <div className="bg-[#0A0A0A] border-t border-[#1A1A1A] flex justify-between items-center p-2">
                                <button className="p-2 opacity-50 hover:opacity-100 hover:text-[#D4AF37] transition-colors">
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={startGeneration}
                                    disabled={isGenerating || !prompt}
                                    className="bg-white text-black px-4 py-2 text-[10px] uppercase font-bold tracking-widest hover:bg-[#D4AF37] transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {!isGenerating ? <span>Generate</span> : <Sparkles className="animate-spin w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2 text-[9px] font-mono uppercase">
                            <button onClick={() => setPrompt('Initialize stark components')} className="border border-[#1A1A1A] px-3 py-1.5 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">INIT STARK</button>
                            <button onClick={() => setPrompt('Apply monolithic theme')} className="border border-[#1A1A1A] px-3 py-1.5 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">MONOLITH THEME</button>
                        </div>
                    </div>
                </aside>

                {/* Right Panel: Canvas & Preview */}
                <section className="col-span-12 lg:col-span-8 flex flex-col bg-[#0A0A0A] relative overflow-hidden">
                    
                    {/* View Options bar */}
                    <div className="h-12 border-b border-[#1A1A1A] flex justify-between items-center px-8 bg-[#050505]">
                        <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase">
                            <span className="text-[#D4AF37] mr-1">■</span> LIVE Render
                        </div>
                        <span className="text-[10px] font-mono opacity-30 uppercase tracking-widest">W/1024_H/768</span>
                    </div>

                    {/* Canvas Simulation */}
                    <div className="flex-1 p-8 flex items-center justify-center overflow-auto custom-scroll">
                        <div className={cn(
                            "bg-[#050505] overflow-hidden transition-all duration-500 relative border border-[#1A1A1A]",
                            viewMode === 'mobile' ? 'w-[320px] h-[640px]' : viewMode === 'desktop' ? 'w-full max-w-4xl h-[700px]' : 'w-full max-w-4xl h-full bg-[#0A0A0A] border-none'
                        )}>
                            {viewMode === 'code' ? (
                                <div className="p-8 font-mono text-xs text-[#F0F0F0] overflow-y-auto h-full opacity-80">
                                    <p className="text-[#D4AF37] mb-4">// MVP_LIVE_AT: holy.sh/v/39f2a</p>
                                    <p>import {"{"} Header {"}"} from '@holy/ui';</p>
                                    <br/>
                                    <p>export default function Frame() {"{"}</p>
                                    <div className="pl-6 border-l border-[#1A1A1A] ml-2 my-2">
                                        <p>return (</p>
                                        <div className="pl-6">
                                            <p>&lt;main className="border border-[#1A1A1A] flex"&gt;</p>
                                            <p className="pl-6 text-[#999]">/* Executed GUI Content */</p>
                                            <p>&lt;/main&gt;</p>
                                        </div>
                                        <p>);</p>
                                    </div>
                                    <p>{"}"}</p>
                                </div>
                            ) : (
                                <div className="w-full h-full text-white overflow-y-auto custom-scroll flex flex-col">
                                    <div className="p-10 border-b border-[#1A1A1A] flex justify-between items-end">
                                        <span className="text-4xl font-sans tracking-tight">CHRONOS</span>
                                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40">Vault Layer</span>
                                    </div>
                                    <div className="p-10 flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[1, 2].map((i) => (
                                            <div key={i} className="border border-[#1A1A1A] p-6 flex flex-col justify-end aspect-[4/5] hover:border-[#D4AF37] transition-colors relative group">
                                                <div className="absolute top-4 right-4 text-[10px] font-mono text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity uppercase border border-[#D4AF37] px-2 py-1">Edit_</div>
                                                <div className="space-y-2">
                                                    <div className="text-[10px] font-mono text-[#D4AF37] tracking-widest">IDX / 0{i}</div>
                                                    <div className="text-xl font-sans">Asset {5270 + i}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
