/**
 * @type {import('next').NextConfig}
 */
const prefix =
  process.env.NODE_ENV === "production"
    ? "https://isc-exhibition.github.io/ischive/"
    : "";

const nextConfig = {
  // output: "export",

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  distDir: "dist",
};

module.exports = nextConfig;
