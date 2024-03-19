export default ({ env }) => [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "default-src": ["'self'"],
          "img-src": ["'self'", "data:", "blob:", env("SUPABASE_API_URL")],
          "media-src": ["'self'", "data:", "blob:", env("SUPABASE_API_URL")],
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      origin: "*",
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
