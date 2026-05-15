'use client';

import { NavBar } from '@/components/shared/NavBar';
import { PRODUCTS } from '@/lib/products';
import { createCheckoutSession } from '@/app/actions/stripe';
import { Check, Sparkles, Zap, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const icons: Record<string, React.ElementType> = {
  Sparkles,
  Zap,
  Building,
};

export default function StorePage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (productId: string) => {
    setLoading(productId);
    try {
      const result = await createCheckoutSession(productId, window.location.origin);
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavBar />
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <div className="border-b border-border p-10 bg-panel">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-mono text-accent px-2 py-0.5 border border-accent">02</span>
              <h2 className="text-xl font-serif italic text-muted">Subscription Plans</h2>
            </div>
            <h1 className="text-5xl font-sans font-bold uppercase tracking-tighter mb-6">Choose Your Plan</h1>
            <p className="text-[11px] font-mono opacity-50 uppercase leading-relaxed tracking-widest border-l border-accent pl-4 max-w-xl">
              Unlock the full potential of Holy AI. Build, deploy, and scale your applications with powerful AI assistance.
            </p>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="max-w-6xl mx-auto p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => {
              const Icon = product.icon ? icons[product.icon] : Sparkles;
              return (
                <div
                  key={product.id}
                  className={cn(
                    "border border-border p-8 flex flex-col hover:border-accent transition-colors relative",
                    product.popular && "border-accent"
                  )}
                >
                  {product.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-background px-4 py-1 text-[10px] font-mono uppercase tracking-widest">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 border border-border flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight">{product.name}</h3>
                      <p className="text-[10px] font-mono text-muted uppercase">{product.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      {product.priceInCents === 0 ? 'Free' : `$${(product.priceInCents / 100).toFixed(0)}`}
                    </span>
                    {product.priceInCents > 0 && (
                      <span className="text-muted text-sm font-mono">/month</span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(product.id)}
                    disabled={loading === product.id}
                    className={cn(
                      "w-full py-3 font-bold text-sm tracking-widest uppercase transition-colors disabled:opacity-50",
                      product.popular
                        ? "bg-accent text-background hover:bg-accent/90"
                        : "bg-foreground text-background hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {loading === product.id ? 'Processing...' : product.priceInCents === 0 ? 'Get Started' : 'Subscribe'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="border-t border-border p-10 bg-panel">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">All Plans Include</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: 'AI Generation', desc: 'Powered by cutting-edge models' },
                { title: 'Live Preview', desc: 'See changes in real-time' },
                { title: 'Code Export', desc: 'Download production-ready code' },
                { title: 'Cloud Hosting', desc: 'Deploy with one click' },
              ].map((item, idx) => (
                <div key={idx} className="border border-border p-6">
                  <h3 className="font-bold uppercase tracking-tight mb-2">{item.title}</h3>
                  <p className="text-[11px] font-mono text-muted uppercase">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-12 border-t border-border flex items-center px-10 justify-between font-mono text-[10px] tracking-widest bg-background">
        <div className="flex gap-6 opacity-40">
          <span>PAYMENTS: STRIPE</span>
          <span>SECURITY: PCI_COMPLIANT</span>
        </div>
        <div className="flex gap-6">
          <span className="text-accent">HOLY_COMMERCE ACTIVE</span>
        </div>
      </footer>
    </div>
  );
}
