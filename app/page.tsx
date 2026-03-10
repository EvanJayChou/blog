import { BlogHeader } from "@/components/blog-header";
import { BlogHero } from "@/components/blog-hero";
import { ArticlesSection } from "@/components/articles-section";
import { AboutSection } from "@/components/about-section";
import { BlogFooter } from "@/components/blog-footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <BlogHeader />
      <BlogHero />
      <ArticlesSection />
      <AboutSection />
      <BlogFooter />
    </main>
  );
}
