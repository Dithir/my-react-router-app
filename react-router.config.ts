import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  prerender: true,
  // The base path for the application, useful for deployment in subdirectories
  // This should match the `base` option in your Vite config
  // For example, if your app is deployed at `https://example.com/my-react-router     
  basename: "/my-react-router-app/",
} satisfies Config;
