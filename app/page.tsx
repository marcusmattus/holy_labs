import { NavBar } from '@/components/shared/NavBar';
import { Search, Settings, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function ProjectHub() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  let apps: any[] = [];
  
  if (user) {
    const { data } = await supabase
      .from('generated_apps')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(3);
    
    apps = data || [];
  }

  // Demo projects for non-authenticated users
  const demoProjects = [
    { id: 'demo-1', name: 'Stark Finance', status: 'Live', updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), app_type: 'Fintech Dashboard' },
    { id: 'demo-2', name: 'Lumina Portfolio', status: 'Draft', updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), app_type: 'Design System' },
    { id: 'demo-3', name: 'Vibe CRM', status: 'Building', updated_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(), app_type: 'AI SaaS' },
  ];

  const projects = user && apps.length > 0 ? apps : demoProjects;

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <>
      <NavBar />
      <main className="flex-1 flex flex-col w-full h-full text-foreground bg-background">
        
        {/* Header & Search */}
        <header className="p-10 border-b border-border flex flex-col md:flex-row justify-between md:items-end gap-6 bg-background">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-mono text-accent px-2 py-0.5 border border-accent">SYS</span>
              <h2 className="text-xl font-serif italic text-muted">Archives</h2>
            </div>
            <h1 className="text-4xl font-sans tracking-tight uppercase">Codebase <span className="font-bold">Matrix</span></h1>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-accent" />
            </div>
            <input 
              type="text" 
              placeholder="Search apps, components, or drafts..." 
              className="w-full bg-panel border border-border py-3 pl-12 pr-4 focus:outline-none focus:border-accent transition-colors text-foreground font-mono text-[11px] uppercase tracking-widest placeholder:text-muted"
            />
          </div>
        </header>

        {/* Projects Grid Series */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-border">
          
          {/* Create New Card */}
          <Link href={user ? "/studio/new" : "/auth/login?redirect=/studio/new"} className="flex flex-col items-center justify-center p-12 border-r border-b lg:border-b-0 border-border bg-background cursor-pointer hover:bg-panel hover:border-accent transition-all group">
            <div className="w-12 h-12 border border-border flex items-center justify-center mb-6 group-hover:border-accent transition-colors">
              <span className="text-2xl font-light text-accent">+</span>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">Execute Generation</p>
          </Link>

          {/* Project Cards Loop */}
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col border-r border-b lg:border-b-0 border-border bg-panel p-8 h-80 relative group hover:bg-background transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                  <Link 
                    href={user ? `/studio/${project.id}` : "/auth/login"} 
                    className="text-2xl font-bold tracking-tight hover:text-accent transition-colors leading-none block"
                  >
                    {project.name}
                  </Link>
                  <p className="text-[10px] font-mono uppercase tracking-widest opacity-40">{project.app_type || 'Application'}</p>
                </div>
                <div className="flex items-center space-x-2 border border-border px-2 py-1">
                  <div className="w-1.5 h-1.5" style={{ background: project.status === 'draft' || project.status === 'Draft' ? '#444' : 'var(--accent)' }}></div>
                  <span className="text-[9px] font-mono uppercase tracking-widest">{project.status}</span>
                </div>
              </div>
              
              {/* Preview Abstract Data Mock */}
              <div className="flex-grow my-4 border-t border-b border-border flex flex-col justify-center p-4">
                <div className="space-y-3">
                  <div className="h-1 bg-border w-3/4"></div>
                  <div className="h-1 bg-border w-full"></div>
                  <div className="h-1 border-t border-dashed border-border w-1/2"></div>
                  <div className="mt-4 text-[10px] font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity">SYS_READY</div>
                </div>
              </div>

              <div className="mt-auto flex justify-between items-center z-10 relative pt-4">
                <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">UPD_ {formatTime(project.updated_at)}</span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-3">
                  <Link href={user ? `/insights/${project.id}` : "/auth/login"} className="hover:text-accent transition-colors"><ExternalLink className="w-4 h-4" /></Link>
                  <Link href={user ? `/deploy/${project.id}` : "/auth/login"} className="hover:text-accent transition-colors"><Settings className="w-4 h-4" /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* Footer Area */}
      <footer className="h-12 border-t border-border flex items-center px-10 justify-between font-mono text-[10px] tracking-widest mt-auto bg-background">
        <div className="flex gap-6 opacity-40">
          <span>NODE: STABLE</span>
          <span>LATENCY: 14MS</span>
          <span>SECURITY: AA_SHIELD_ACTIVE</span>
        </div>
        <div className="flex gap-6">
          <span className="text-accent">HOLISTIC_ENGINE LIVE</span>
        </div>
      </footer>
    </>
  );
}
