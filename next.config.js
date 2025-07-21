const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const imageHostnames = process.env.NEXT_PUBLIC_IMAGE_HOSTNAMES.split(",");

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    remotePatterns: imageHostnames.map((hostname) => ({
      protocol: "https",
      hostname: hostname,
      port: "",
      pathname: "/**",
    })),
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
