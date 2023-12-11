/**
 * @type {import('next').NextConfig}
 */
const prefix =
  process.env.NODE_ENV === "production"
    ? "https://isc-exhibition.github.io/ischive/"
    : "";

const nextConfig = {
  output: "export",

  // images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        port: "",
      },
    ],
  },

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  distDir: "dist",

  // redirect /assignment to /archiving
  async redirects() {
    return [
      {
        source: "/assignment",
        destination: "/archiving",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
