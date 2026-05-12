'use client';

import { NavBar } from '@/components/shared/NavBar';
import { useState } from 'react';
import { ChevronRight, Settings, Globe, CheckCircle2, Rocket } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DeploymentSettings() {
    const [isDeploying, setIsDeploying] = useState(false);
    const [currentStep, setCurrentStep] = useState<'settings' | 'success'>('settings');
    const [config, setConfig] = useState({
        domain: 'stark-finance.holy.app',
        environment: 'Production',
        visibility: 'Public',
        autoDeploy: true
    });

    const handleDeploy = () => {
        setIsDeploying(true);
        setTimeout(() => {
            setIsDeploying(false);
            setCurrentStep('success');
        }, 4000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#050505]">
            <NavBar />
            <main className="flex-1 flex w-full">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0">
                    
                    {/* Left Side: Status & Navigation */}
                    <div className="lg:col-span-4 border-r border-[#1A1A1A] p-10 bg-[#0A0A0A]">
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.2em] mb-4">Instance Status</h2>
                                <div className="flex items-center space-x-4 border border-[#1A1A1A] p-4 bg-[#050505]">
                                    <div className="w-2 h-2 bg-[#D4AF37]"></div>
                                    <span className="text-sm font-bold uppercase tracking-wider">Ready to Ship</span>
                                </div>
                            </div>

                            <nav className="flex flex-col space-y-2">
                                <button className="flex items-center justify-between p-4 border border-[#1A1A1A] bg-[#050505] text-sm font-bold uppercase tracking-widest text-[#D4AF37]">
                                    <span className="flex items-center gap-4"><Settings className="w-4 h-4" /> General</span>
                                    <span className="text-[10px] font-mono">_ACTIVE</span>
                                </button>
                                <button className="flex items-center justify-between p-4 border border-[#1A1A1A] text-sm font-bold uppercase tracking-widest text-white/40 hover:text-white hover:border-white/20 transition-all">
                                    <span className="flex items-center gap-4"><Settings className="w-4 h-4" /> Environ_Vars</span>
                                </button>
                                <button className="flex items-center justify-between p-4 border border-[#1A1A1A] text-sm font-bold uppercase tracking-widest text-white/40 hover:text-white hover:border-white/20 transition-all">
                                    <span className="flex items-center gap-4"><Globe className="w-4 h-4" /> Registry</span>
                                </button>
                            </nav>

                            <div className="border-t border-[#1A1A1A] pt-6">
                                <p className="text-[10px] font-mono opacity-40 leading-relaxed uppercase tracking-widest">
                                    HOLY DEPLOYS YOUR LOGIC<br/>INTO EDGE CLUSTERS.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Settings Content */}
                    <div className="lg:col-span-8 p-12 lg:p-20 flex flex-col justify-center">
                        {!isDeploying && currentStep === 'settings' && (
                            <div className="max-w-2xl w-full animate-in fade-in duration-500">
                                <header className="mb-12 border-b border-[#1A1A1A] pb-6">
                                    <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">Build Configuration</h1>
                                    <p className="text-[11px] font-mono opacity-40 uppercase tracking-widest">Define routing schema and visibility</p>
                                </header>

                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block border-l-2 border-[#D4AF37] pl-3">Target Domain</label>
                                        <div className="relative">
                                            <input 
                                                type="text" 
                                                value={config.domain}
                                                onChange={e => setConfig({...config, domain: e.target.value})}
                                                className="w-full bg-[#0A0A0A] border border-[#1A1A1A] p-5 text-sm font-mono text-[#F0F0F0] focus:outline-none focus:border-[#D4AF37] transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Access Scope</label>
                                            <div className="flex bg-[#0A0A0A] border border-[#1A1A1A] p-1">
                                                <button onClick={() => setConfig({...config, visibility: 'Private'})} className={cn("flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors", config.visibility === 'Private' ? 'bg-[#1A1A1A] text-white' : 'text-white/40 hover:text-white')}>_Private</button>
                                                <button onClick={() => setConfig({...config, visibility: 'Public'})} className={cn("flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors", config.visibility === 'Public' ? 'bg-[#1A1A1A] text-white' : 'text-white/40 hover:text-white')}>_Public</button>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">Node Env</label>
                                            <div className="flex bg-[#0A0A0A] border border-[#1A1A1A] p-1">
                                                <button onClick={() => setConfig({...config, environment: 'Staging'})} className={cn("flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors", config.environment === 'Staging' ? 'bg-[#1A1A1A] text-white' : 'text-white/40 hover:text-white')}>Staging</button>
                                                <button onClick={() => setConfig({...config, environment: 'Production'})} className={cn("flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors", config.environment === 'Production' ? 'bg-[#1A1A1A] text-white' : 'text-white/40 hover:text-white')}>Prod</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-10 border-t border-[#1A1A1A]">
                                        <button 
                                            onClick={handleDeploy}
                                            className="w-full bg-white text-black py-5 text-sm font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-colors flex items-center justify-center space-x-4"
                                        >
                                            <span>Execute Push</span>
                                            <span className="text-[10px] opacity-40">→</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isDeploying && (
                            <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in duration-300">
                                <div className="border border-[#D4AF37] p-10 bg-[#0A0A0A] text-center w-full max-w-md">
                                    <div className="w-16 h-16 border-2 border-[#1A1A1A] border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-8"></div>
                                    <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Allocating Node</h2>
                                    <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Building aesthetic matrices...</p>
                                </div>
                            </div>
                        )}

                        {currentStep === 'success' && !isDeploying && (
                            <div className="w-full flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-12 text-center w-full max-w-lg relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-[#D4AF37]"></div>
                                    
                                    <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mb-8 border border-[#D4AF37] inline-block px-3 py-1">SYS_SUCCESS</div>
                                    
                                    <h2 className="text-3xl font-bold uppercase tracking-widest mb-6">Lineage Live.</h2>
                                    
                                    <div className="border border-[#1A1A1A] bg-[#050505] p-6 mb-10 text-[11px] font-mono break-all text-white/60">
                                        &gt; <span className="text-white">https://{config.domain}</span>
                                    </div>
                                    
                                    <div className="flex flex-col gap-4">
                                        <a href={`https://${config.domain}`} target="_blank" className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-colors block">Enter Terminal</a>
                                        <button onClick={() => setCurrentStep('settings')} className="w-full py-4 border border-[#1A1A1A] text-white font-bold uppercase tracking-widest text-[10px] hover:border-[#D4AF37] transition-colors">Revise Output</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
