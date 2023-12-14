/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  // images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
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
