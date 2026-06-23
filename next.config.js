/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  allowedDevOrigins: ['*.replit.dev', '*.kirk.replit.dev', '*.repl.co'],
}

module.exports = nextConfig
