import fg from "fast-glob";
import matter from "gray-matter";
import { marked } from "marked";
import fs from "node:fs/promises";
import path from "node:path";

export type Domain = "it" | "english" | "travel" | "reading" | "economy";

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  domain: Domain;
  category: string;
  tags: string[];
  status: "draft" | "review" | "published";
  summary: string;
  canonical_channel: string;
  source_notes: string[];
  related_journal_notes: string[];
  adsense_ready: boolean;
  series?: string;
}

export interface Post extends PostFrontmatter {
  body: string;
  html: string;
  url: string;
  sourcePath: string;
}

const postsRoot = path.resolve(process.cwd(), "..", "publish", "posts");

marked.setOptions({
  gfm: true,
  breaks: false
});

function normalizeFrontmatter(raw: Record<string, unknown>, sourcePath: string): PostFrontmatter {
  const tags = Array.isArray(raw.tags) ? raw.tags.map(String) : [];
  const sourceNotes = Array.isArray(raw.source_notes) ? raw.source_notes.map(String) : [];
  const relatedJournalNotes = Array.isArray(raw.related_journal_notes) ? raw.related_journal_notes.map(String) : [];

  const frontmatter: PostFrontmatter = {
    title: String(raw.title || ""),
    slug: String(raw.slug || path.basename(sourcePath, path.extname(sourcePath))),
    date: String(raw.date || ""),
    domain: String(raw.domain || "it") as Domain,
    category: String(raw.category || "notes"),
    tags,
    status: String(raw.status || "draft") as PostFrontmatter["status"],
    summary: String(raw.summary || ""),
    canonical_channel: String(raw.canonical_channel || "github-pages"),
    source_notes: sourceNotes,
    related_journal_notes: relatedJournalNotes,
    adsense_ready: Boolean(raw.adsense_ready),
    series: raw.series ? String(raw.series) : undefined
  };

  return frontmatter;
}

export async function getAllPosts(): Promise<Post[]> {
  const files = await fg("**/*.md", {
    cwd: postsRoot,
    absolute: true
  });

  const posts = await Promise.all(
    files.map(async (filePath) => {
      const source = await fs.readFile(filePath, "utf8");
      const parsed = matter(source);
      const frontmatter = normalizeFrontmatter(parsed.data, filePath);
      const html = await marked.parse(parsed.content);
      const url = `/posts/${frontmatter.slug}/`;

      return {
        ...frontmatter,
        body: parsed.content,
        html,
        url,
        sourcePath: path.relative(path.resolve(process.cwd(), ".."), filePath).replaceAll("\\", "/")
      } satisfies Post;
    })
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.status === "published");
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug);
}

export function groupByCategory(posts: Post[]) {
  return Array.from(
    posts.reduce((map, post) => {
      const bucket = map.get(post.category) || [];
      bucket.push(post);
      map.set(post.category, bucket);
      return map;
    }, new Map<string, Post[]>())
  ).sort((a, b) => a[0].localeCompare(b[0]));
}

export function groupByTag(posts: Post[]) {
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    for (const tag of post.tags) {
      const bucket = map.get(tag) || [];
      bucket.push(post);
      map.set(tag, bucket);
    }
  }
  return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}

export function groupBySeries(posts: Post[]) {
  return Array.from(
    posts.reduce((map, post) => {
      if (!post.series) {
        return map;
      }
      const bucket = map.get(post.series) || [];
      bucket.push(post);
      map.set(post.series, bucket);
      return map;
    }, new Map<string, Post[]>())
  ).sort((a, b) => a[0].localeCompare(b[0]));
}

export function groupByMonth(posts: Post[]) {
  return Array.from(
    posts.reduce((map, post) => {
      const month = post.date.slice(0, 7);
      const bucket = map.get(month) || [];
      bucket.push(post);
      map.set(month, bucket);
      return map;
    }, new Map<string, Post[]>())
  ).sort((a, b) => b[0].localeCompare(a[0]));
}
