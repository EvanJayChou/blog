"use client";

import Link from "next/link";
import { ArrowUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function BlogHeader() {
  const { theme, toggle } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="group">
          <h1 className="font-serif text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
            Evan Chou's Blog
          </h1>
        </Link>
        
        <nav className="flex items-center gap-8">
          <Link 
            href="#articles" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Articles
          </Link>
          <Link 
            href="#about" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            href="https://evanjaychou.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium transition-all duration-300 hover:bg-accent hover:scale-105 hover:shadow-lg"
          >
            My Website
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
