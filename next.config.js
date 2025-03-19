const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cybertise-backend-mmppce625q-de.a.run.app",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cybertise-storage.s3.us-east-005.backblazeb2.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/base-api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
