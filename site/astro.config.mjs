import { defineConfig } from "astro/config";

const defaultSiteUrl = "https://seonwook61.github.io/llmObsidianWiki/";
const siteUrl = process.env.PUBLIC_SITE_URL || defaultSiteUrl;
const parsedSiteUrl = new URL(siteUrl);
const normalizedPath = parsedSiteUrl.pathname.replace(/\/$/, "");

export default defineConfig({
  site: parsedSiteUrl.toString(),
  base: normalizedPath || undefined,
  output: "static",
  trailingSlash: "always"
});
