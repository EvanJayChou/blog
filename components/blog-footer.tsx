"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BlogFooter() {
  return (
    <footer className="py-16 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <Link href="/" className="group">
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent mb-2">
                Evan Chou's Blog
              </h2>
            </Link>
            <p className="text-sm text-muted-foreground">
              My Journey into Science, Engineering, and Technology
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <Link 
              href="#articles" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Articles
            </Link>
            <Link 
              href="#about" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="https://evanjaychou.github.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors"
            >
              Website
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Evan Chou's Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
