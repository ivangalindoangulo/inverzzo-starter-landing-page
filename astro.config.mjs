// @ts-check
import { defineConfig } from "astro/config";
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: "https://ivangalindoangulo.github.io",
  base: "/inverzzo-starter-landing-page",
  output: "static",
  integrations: [tailwind()],
});
