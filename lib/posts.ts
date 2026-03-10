// To add a new post: create a new file in lib/posts/, then import and add it to the array below.
// To remove a post: remove its import and entry from the array.
// The first post in the array (or the one with featured: true) will be shown as the hero on the homepage.

import journeyFromPCCtoUCSD from "./posts/pcc_to_ucsd";
import disneyBdx from "./posts/disney_bdx";

export interface Post {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  featured?: boolean;
  content: string;
  readingTime?: string;
}

export const posts: Post[] = [
  journeyFromPCCtoUCSD,
  disneyBdx
];

// Helper functions for working with posts
export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getFeaturedPost(): Post | undefined {
  return posts.find((post) => post.featured) || posts[0];
}

export function getRecentPosts(count: number = 5): Post[] {
  return posts.slice(0, count);
}
