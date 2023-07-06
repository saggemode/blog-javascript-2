/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "fa"],
    defaultLocale: "en",
    localeDetection: false,
  },
  images: {
    domains: [
      "cdn.sanity.io",
      "links.papareact.com",
      "www.iplace.com.br",
      "avatars.githubusercontent.com",
      "media.giphy.com",
      "github.com",
      "img.icons8.com",
      "fakestoreapi.com",
      "i.dummyjson.com",
      "res.cloudinary.com",
    ],
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "[name].[ext]",
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;
