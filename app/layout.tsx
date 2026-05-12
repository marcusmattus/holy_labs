import type {Metadata} from 'next';
import './globals.css';
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', style: ['normal', 'italic'] });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Holy',
  description: 'An AI-native operating system for building, distributing, and monetizing internet products.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("dark", inter.variable, playfair.variable, jetbrains.variable)}>
      <body suppressHydrationWarning className="bg-background text-foreground font-sans antialiased selection:bg-accent selection:text-black flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
