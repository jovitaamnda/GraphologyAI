// next.config.js   ← nama file HARUS .js
/** @type {import('next').NextConfig} 
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "http://localhost:3001/api/auth/:path*",
      },
    ];
  },
};

module.exports = nextConfig;*/
