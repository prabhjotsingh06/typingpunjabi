/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
    return [
      {
        source: '/',
        destination: '/lesson',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
