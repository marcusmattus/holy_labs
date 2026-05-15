'use client';

import { NavBar } from '@/components/shared/NavBar';
import { useState, useEffect } from 'react';
import { Settings, Globe, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function DeploymentSettings() {
  const { id } = useParams();
  const router = useRouter();
  const [isDeploying, setIsDeploying] = useState(false);
  const [currentStep, setCurrentStep] = useState<'settings' | 'success'>('settings');
  const [appData, setAppData] = useState<any>(null);
  const [config, setConfig] = useState({
    domain: '',
    environment: 'Production',
    visibility: 'Public',
    autoDeploy: true
  });

  useEffect(() => {
    const supabase = createClient();
    
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/auth/login?redirect=/deploy/' + id);
        return;
      }
    });

    if (id && id !== 'new') {
      supabase
        .from('generated_apps')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data }) => {
          if (data) {
            setAppData(data);
            setConfig(prev => ({
              ...prev,
              domain: `${data.name.toLowerCase().replace(/\s+/g, '-')}.holy.app`
            }));
          }
        });
    }
  }, [id, router]);

  const handleDeploy = async () => {
    setIsDeploying(true);
    
    const supabase = createClient();
    
    // Update app status to live
    await supabase
      .from('generated_apps')
      .update({
        status: 'live',
        preview_url: `https://${config.domain}`,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    setTimeout(() => {
      setIsDeploying(false);
      setCurrentStep('success');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavBar />
      <main className="flex-1 flex w-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Side: Status & Navigation */}
          <div className="lg:col-span-4 border-r border-border p-10 bg-panel">
            <div className="space-y-12">
              <div>
                <h2 className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] mb-4">Instance Status</h2>
                <div className="flex items-center space-x-4 border border-border p-4 bg-background">
                  <div className="w-2 h-2 bg-accent"></div>
                  <span className="text-sm font-bold uppercase tracking-wider">Ready to Ship</span>
                </div>
              </div>

              <nav className="flex flex-col space-y-2">
                <button className="flex items-center justify-between p-4 border border-border bg-background text-sm font-bold uppercase tracking-widest text-accent">
                  <span className="flex items-center gap-4"><Settings className="w-4 h-4" /> General</span>
                  <span className="text-[10px] font-mono">_ACTIVE</span>
                </button>
                <button className="flex items-center justify-between p-4 border border-border text-sm font-bold uppercase tracking-widest text-muted hover:text-foreground hover:border-accent transition-all">
                  <span className="flex items-center gap-4"><Settings className="w-4 h-4" /> Environ_Vars</span>
                </button>
                <button className="flex items-center justify-between p-4 border border-border text-sm font-bold uppercase tracking-widest text-muted hover:text-foreground hover:border-accent transition-all">
                  <span className="flex items-center gap-4"><Globe className="w-4 h-4" /> Registry</span>
                </button>
              </nav>

              <div className="border-t border-border pt-6">
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
                <header className="mb-12 border-b border-border pb-6">
                  <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">Build Configuration</h1>
                  <p className="text-[11px] font-mono opacity-40 uppercase tracking-widest">
                    {appData?.name || 'Configure'} - Define routing schema and visibility
                  </p>
                </header>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-mono text-accent uppercase tracking-widest block border-l-2 border-accent pl-3">Target Domain</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={config.domain}
                        onChange={e => setConfig({...config, domain: e.target.value})}
                        className="w-full bg-panel border border-border p-5 text-sm font-mono text-foreground focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-mono text-muted uppercase tracking-widest block">Access Scope</label>
                      <div className="flex bg-panel border border-border p-1">
                        <button onClick={() => setConfig({...config, visibility: 'Private'})} className={cn("flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors", config.visibility === 'Private' ? 'bg-border text-foreground' : 'text-muted hover:text-foreground')}>_Private</button>
                        <button onClick={() => setConfig({...config, visibility: 'Public'})} className={cn("flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors", config.visibility === 'Public' ? 'bg-border text-foreground' : 'text-muted hover:text-foreground')}>_Public</button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-mono text-muted uppercase tracking-widest block">Node Env</label>
                      <div className="flex bg-panel border border-border p-1">
                        <button onClick={() => setConfig({...config, environment: 'Staging'})} className={cn("flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors", config.environment === 'Staging' ? 'bg-border text-foreground' : 'text-muted hover:text-foreground')}>Staging</button>
                        <button onClick={() => setConfig({...config, environment: 'Production'})} className={cn("flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors", config.environment === 'Production' ? 'bg-border text-foreground' : 'text-muted hover:text-foreground')}>Prod</button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-border">
                    <button 
                      onClick={handleDeploy}
                      className="w-full bg-foreground text-background py-5 text-sm font-bold uppercase tracking-widest hover:bg-accent transition-colors flex items-center justify-center space-x-4"
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
                <div className="border border-accent p-10 bg-panel text-center w-full max-w-md">
                  <div className="w-16 h-16 border-2 border-border border-t-accent rounded-full animate-spin mx-auto mb-8"></div>
                  <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Allocating Node</h2>
                  <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Building aesthetic matrices...</p>
                </div>
              </div>
            )}

            {currentStep === 'success' && !isDeploying && (
              <div className="w-full flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border border-border bg-panel p-12 text-center w-full max-w-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
                  
                  <div className="text-[10px] font-mono text-accent uppercase tracking-widest mb-8 border border-accent inline-block px-3 py-1">SYS_SUCCESS</div>
                  
                  <h2 className="text-3xl font-bold uppercase tracking-widest mb-6">Lineage Live.</h2>
                  
                  <div className="border border-border bg-background p-6 mb-10 text-[11px] font-mono break-all text-muted">
                    &gt; <span className="text-foreground">https://{config.domain}</span>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <a href={`https://${config.domain}`} target="_blank" className="w-full py-4 bg-accent text-background font-bold uppercase tracking-widest text-[10px] hover:opacity-90 transition-colors block">Enter Terminal</a>
                    <Link href="/dashboard" className="w-full py-4 border border-border text-foreground font-bold uppercase tracking-widest text-[10px] hover:border-accent transition-colors block">Back to Dashboard</Link>
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
