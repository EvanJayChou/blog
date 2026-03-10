"use client";

import { ArticleCard } from "./article-card";
import { getAllPosts } from "@/lib/posts";

export function ArticlesSection() {
  const posts = getAllPosts();
  const featuredArticle = posts.find((post) => post.featured) || posts[0];
  const regularArticles = posts.filter((post) => post.slug !== featuredArticle.slug);

  return (
    <section id="articles" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="w-12 h-px bg-border" />
          <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Latest Articles
          </h2>
        </div>

        <div className="mb-8">
          <ArticleCard {...featuredArticle} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
