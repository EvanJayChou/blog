"use client";

export function BlogHero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6">
          Welcome to Evan Chou's Blog
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-medium leading-[1.1] tracking-tight text-foreground mb-8 text-balance">
          My Journey into
          <br />
          Science, Engineering, and Technology
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A collection of my writings on design, technology, creativity, and the 
          things that inspire me along the way.
        </p>
      </div>
    </section>
  );
}
