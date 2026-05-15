'use client';

import { NavBar } from '@/components/shared/NavBar';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { LayoutTemplate, BarChart3, Activity, Clock } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface HistoryItem {
  version: string;
  prompt: string;
  timestamp: string;
  author: string;
}

export default function Insights() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'generations' | 'traffic' | 'logs'>('generations');
  const [appData, setAppData] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);
  
  const history: HistoryItem[] = [
    { version: 'v1.4', prompt: 'Add real-time candle charts to the portfolio view', timestamp: '12m ago', author: 'AI Agent' },
    { version: 'v1.3', prompt: 'Implement dark mode toggle with obsidian theme', timestamp: '2h ago', author: 'User' },
    { version: 'v1.2', prompt: 'Style the navigation bar to be glassmorphic', timestamp: '1d ago', author: 'AI Agent' },
    { version: 'v1.1', prompt: 'Initial structural layout for fintech dashboard', timestamp: '2d ago', author: 'System' }
  ];

  useEffect(() => {
    const supabase = createClient();
    
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/auth/login?redirect=/insights/' + id);
        return;
      }
    });

    if (id) {
      // Fetch app data
      supabase
        .from('generated_apps')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data }) => {
          if (data) {
            setAppData(data);
          }
        });

      // Fetch insights
      supabase
        .from('app_insights')
        .select('*')
        .eq('app_id', id)
        .single()
        .then(({ data }) => {
          if (data) {
            setInsights(data);
          }
        });
    }
  }, [id, router]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="flex-1 grid grid-cols-12 w-full h-full">
        
        {/* Sidebar: Navigation & Metrics */}
        <div className="col-span-12 lg:col-span-3 border-r border-border p-10 bg-panel flex flex-col">
          <div className="mb-12">
            <h4 className="text-[10px] font-mono text-muted uppercase tracking-[0.2em] mb-4">Nav_Routes</h4>
            <div className="space-y-1">
              <button onClick={() => setActiveTab('generations')} className={cn("w-full text-left px-4 py-3 text-[11px] font-mono uppercase tracking-widest transition-colors", activeTab === 'generations' ? 'bg-border text-foreground' : 'text-muted hover:text-foreground hover:bg-background')}>01_Generation History</button>
              <button onClick={() => setActiveTab('traffic')} className={cn("w-full text-left px-4 py-3 text-[11px] font-mono uppercase tracking-widest transition-colors", activeTab === 'traffic' ? 'bg-border text-foreground' : 'text-muted hover:text-foreground hover:bg-background')}>02_Edge Traffic</button>
              <button onClick={() => setActiveTab('logs')} className={cn("w-full text-left px-4 py-3 text-[11px] font-mono uppercase tracking-widest transition-colors", activeTab === 'logs' ? 'bg-border text-foreground' : 'text-muted hover:text-foreground hover:bg-background')}>03_Build Logs</button>
            </div>
          </div>

          <div className="pt-8 border-t border-border">
            <h4 className="text-[10px] font-mono text-muted uppercase tracking-[0.2em] mb-4">Telemetry Stream</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-[10px] font-mono text-muted tracking-widest uppercase">Views</span>
                <span className="text-xs font-mono">{insights?.views || 0}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-[10px] font-mono text-muted tracking-widest uppercase">Latency</span>
                <span className="text-xs font-mono text-accent">42ms</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-[10px] font-mono text-muted tracking-widest uppercase">Deployments</span>
                <span className="text-xs font-mono">{insights?.deployments || 0}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-[10px] font-mono text-muted tracking-widest uppercase">Performance</span>
                <span className="text-xs font-mono text-accent">{insights?.performance_score || 95}%</span>
              </div>
            </div>
          </div>

          {/* Build Health Card */}
          <div className="mt-auto pt-8">
            <div className="border border-accent p-6 bg-background">
              <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-2">Build Health</p>
              <p className="text-[11px] font-mono opacity-60 leading-relaxed uppercase">Optimal structural integrity.</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="col-span-12 lg:col-span-9 p-10 lg:p-16 overflow-y-auto">
          <header className="mb-12 pb-8 border-b border-border flex justify-between items-end">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-mono text-accent px-2 py-0.5 border border-accent">SYS_DATA</span>
                <h1 className="text-xl font-serif italic text-muted">Insight Module</h1>
              </div>
              <h2 className="text-5xl font-sans tracking-tighter uppercase font-bold">{appData?.name || 'Loading...'}</h2>
            </div>
            <div className="flex gap-4">
              <Link href={`/studio/${id}`} className="px-6 py-3 border border-border text-[10px] font-bold uppercase tracking-widest hover:border-accent transition-colors bg-panel">Modify Source</Link>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Total Views', value: insights?.views || 0, icon: BarChart3 },
              { label: 'Deployments', value: insights?.deployments || 0, icon: Activity },
              { label: 'Performance', value: `${insights?.performance_score || 95}%`, icon: LayoutTemplate },
              { label: 'Uptime', value: '99.9%', icon: Clock },
            ].map((stat, idx) => (
              <div key={idx} className="border border-border p-6 bg-panel hover:border-accent transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-[10px] font-mono text-muted uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Version History */}
          <div className="border border-border bg-panel mb-12">
            <div className="px-8 py-6 border-b border-border flex justify-between items-center bg-background">
              <h3 className="text-[11px] font-mono uppercase tracking-widest">Version Lineage</h3>
              <div className="text-[10px] font-mono text-accent">{history.length} COMMITS_</div>
            </div>

            <div className="divide-y divide-border">
              {history.map((item, i) => (
                <div key={i} className="p-8 hover:bg-background transition-colors relative group flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex items-start gap-6 md:w-1/4">
                    <div className="w-12 h-12 border border-border flex items-center justify-center text-[10px] font-mono text-accent bg-background">{item.version}</div>
                    <div className="flex flex-col gap-1 pt-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest">{item.author}</span>
                      <span className="text-[9px] font-mono opacity-40 uppercase">{item.timestamp}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 pt-2">
                    <p className="text-xs font-mono opacity-80 uppercase leading-relaxed text-accent">&gt; {item.prompt}</p>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity pt-2">
                    <button className="border border-accent px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-accent hover:bg-accent hover:text-background transition-colors">Revert</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-border p-8 flex flex-col justify-between h-56 bg-panel">
              <div className="flex justify-between items-center border-b border-border pb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">Memory Stack</span>
                <span className="text-[10px] font-mono opacity-40">4.2 / 5.0 GB</span>
              </div>
              <div>
                <div className="text-4xl font-sans tracking-tighter mb-4">84% <span className="text-xs font-mono opacity-40 uppercase tracking-widest ml-2">Allocated</span></div>
                <div className="w-full h-[2px] bg-border">
                  <div className="h-full bg-accent" style={{ width: '84%' }}></div>
                </div>
              </div>
            </div>
            <div className="border border-border p-8 flex flex-col justify-between h-56 bg-background relative overflow-hidden">
              <div className="absolute top-8 right-8 opacity-10">
                <LayoutTemplate className="w-32 h-32 text-accent" strokeWidth={1} />
              </div>
              <div className="flex justify-between items-center border-b border-border pb-4 relative z-10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent">Topology</span>
              </div>
              <div className="relative z-10">
                <h4 className="text-3xl font-sans font-bold tracking-tighter uppercase mb-2">Global <span className="text-accent">Node</span></h4>
                <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Routing via 42 POPs</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
