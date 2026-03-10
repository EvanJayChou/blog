"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-card border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-border" />
              <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                About Me
              </h2>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6 leading-tight">
              Exploring ideas at the intersection of design and technology
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I&apos;m a growing student and engineer focused on STEM, leadership, and personal growth. This blog is where I share my thoughts on design, technology, 
              and the creative process, along with insights and perspectives from my experiences.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              When I&apos;m not designing or writing, you can find me exploring new places, 
              reading, or working on side projects that spark my curiosity.
            </p>
            <Link
              href="https://evanjaychou.github.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium transition-all duration-300 hover:bg-accent hover:scale-105 hover:shadow-xl"
            >
              Visit my personal website
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          
          <div className="relative">
            <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden">
              <Image
                src="./profile.jpg"
                alt="Evan Chou"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-2xl -z-10" />
            <div className="mt-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <span className="font-serif text-sm text-accent">E</span>
              </div>
              <div>
                <p className="font-serif text-sm font-medium text-foreground">Evan Chou</p>
                <p className="text-xs text-muted-foreground">Electrical Engineering Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
