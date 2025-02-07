// next.config.js
module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            // Add your api here
            destination: 'https://example.com/api/:path*',
          },
        ]
      },
  };