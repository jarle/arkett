module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'error'
          }
        ],
        destination: '/error',
        permanent: true
      }
    ]
  }

}
