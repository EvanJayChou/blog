"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  featured?: boolean;
}

export function ArticleCard({ title, excerpt, date, category, slug, featured }: ArticleCardProps) {
  if (featured) {
    return (
      <Link href={`/blog/${slug}`} className="group block">
        <article className="relative p-8 md:p-12 bg-card rounded-2xl border border-border transition-all duration-500 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                  {category}
                </span>
                <span className="text-sm text-muted-foreground">{date}</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                {title}
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl">
                {excerpt}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Read article
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <article className="h-full p-6 bg-card rounded-xl border border-border transition-all duration-500 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1 flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <span className="px-3 py-1 bg-secondary text-muted-foreground text-xs font-medium rounded-full">
            {category}
          </span>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
        <h3 className="font-serif text-xl font-medium text-foreground mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
          {excerpt}
        </p>
        <div className="flex items-center gap-2 text-sm font-medium text-accent mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Read more
          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </article>
    </Link>
  );
}
