const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const config = {
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
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

module.exports = phase => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return config
  }
  else {
    return withPWA(config)
  }
}