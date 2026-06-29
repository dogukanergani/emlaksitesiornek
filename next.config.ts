import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Mock görsellerini Unsplash'ten çekiyoruz. Veritabanına geçildiğinde
    // kendi CDN / storage domain'inizi buraya ekleyin.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
