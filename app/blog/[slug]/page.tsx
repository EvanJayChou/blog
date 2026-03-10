import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { BlogHeader } from "@/components/blog-header";
import { BlogFooter } from "@/components/blog-footer";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Evan Chou Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Simple markdown-like parsing for the content
  const formatContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(" ").trim();
        if (text) {
          elements.push(
            <p key={elements.length} className="text-foreground/80 leading-relaxed mb-6">
              {formatInlineText(text)}
            </p>
          );
        }
        currentParagraph = [];
      }
    };

    const formatInlineText = (text: string) => {
      // Handle bold (**text**) and italic (*text*) text
      const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={i}>
              {part.slice(1, -1)}
            </em>
          );
        }
        return part;
      });
    };

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (trimmedLine === "") {
        flushParagraph();
      } else if (trimmedLine.startsWith("## ")) {
        flushParagraph();
        elements.push(
          <h2 key={elements.length} className="font-serif text-2xl font-medium text-foreground mt-12 mb-6">
            {trimmedLine.slice(3)}
          </h2>
        );
      } else if (trimmedLine.startsWith("1. ") || trimmedLine.startsWith("2. ") || trimmedLine.startsWith("3. ") || trimmedLine.startsWith("4. ") || trimmedLine.startsWith("5. ")) {
        flushParagraph();
        elements.push(
          <li key={elements.length} className="text-foreground/80 leading-relaxed ml-6 mb-2 list-decimal">
            {formatInlineText(trimmedLine.slice(3))}
          </li>
        );
      } else if (trimmedLine.startsWith("- ")) {
        flushParagraph();
        elements.push(
          <li key={elements.length} className="text-foreground/80 leading-relaxed ml-6 mb-2 list-disc">
            {formatInlineText(trimmedLine.slice(2))}
          </li>
        );
      } else if (/^!\[.*\]\(.*\)$/.test(trimmedLine)) {
        flushParagraph();
        const match = trimmedLine.match(/^!\[(.*)\]\((.*)\)$/);
        if (match) {
          const [, caption, src] = match;
          elements.push(
            <figure key={elements.length} className="my-8">
              <div className="relative w-full overflow-hidden rounded-lg">
                <Image
                  src={src}
                  alt={caption}
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
              {caption && (
                <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        }
      } else {
        currentParagraph.push(trimmedLine);
      }
    }

    flushParagraph();
    return elements;
  };

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      
      <main className="pt-32 pb-20 px-6">
        <article className="max-w-3xl mx-auto">
          {/* Back button */}
          <Link 
            href="/#articles" 
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to articles
          </Link>

          {/* Article header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-muted-foreground">{post.date}</span>
              {post.readingTime && (
                <>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-sm text-muted-foreground">{post.readingTime}</span>
                </>
              )}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Divider */}
          <div className="w-16 h-px bg-border mb-12" />

          {/* Article content */}
          <div className="prose-custom">
            {formatContent(post.content)}
          </div>

          {/* Article footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <Link 
              href="/#articles" 
              className="group inline-flex items-center gap-2 text-accent font-medium hover:underline"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Read more articles
            </Link>
          </footer>
        </article>
      </main>

      <BlogFooter />
    </div>
  );
}
