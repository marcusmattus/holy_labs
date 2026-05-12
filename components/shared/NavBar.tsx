'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Plus, Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function NavBar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="w-full border-b flex-shrink-0 border-border bg-background px-10 py-8 flex flex-col md:flex-row items-end justify-between min-h-[160px] transition-colors duration-300">
      <div className="flex-1 w-full md:w-auto mb-6 md:mb-0">
        <Link href="/" className="flex items-baseline space-x-4 cursor-pointer group">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none m-0 p-0 text-foreground">HOLY</h1>
          <span className="hidden md:inline-block text-accent text-xl font-normal tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">The Operating System for Value</span>
        </Link>
        <div className="flex space-x-6 text-sm font-mono mt-8 opacity-60 uppercase tracking-widest text-foreground">
          <Link href="/" className={cn("hover:text-accent transition-colors", pathname === '/' ? "text-accent" : "")}>[ 01 / Projects ]</Link>
          <Link href="/store" className={cn("hover:text-accent transition-colors", pathname?.startsWith('/store') ? "text-accent" : "")}>[ 02 / Store ]</Link>
          <Link href="/insights/1" className={cn("hover:text-accent transition-colors", pathname?.startsWith('/insights') ? "text-accent" : "")}>[ 03 / Insights ]</Link>
        </div>
      </div>
      <div className="flex items-end flex-col space-y-6 text-right">
        <p className="hidden md:block text-[11px] font-mono leading-relaxed opacity-60 uppercase tracking-tighter text-foreground">
          Est. MMXXIV / Holystic Labs<br/>
          Terminal Precision / Sacred Compute
        </p>
        <div className="flex items-center space-x-6">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 border border-border flex items-center justify-center cursor-pointer hover:border-accent transition-all bg-panel text-foreground"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          {pathname === '/' && (
            <button className="flex items-center bg-foreground text-background px-6 py-3 font-bold text-sm tracking-widest uppercase hover:bg-accent hover:text-foreground transition-colors">
              <Plus className="w-4 h-4 mr-2" /> New App
            </button>
          )}
          <div className="w-10 h-10 border border-border flex items-center justify-center cursor-pointer hover:border-accent transition-all bg-panel">
            <div className="w-3 h-3 bg-accent"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}
