/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
}

module.exports = nextConfig,{
  async rewrites(){
    return [
      {
        source: '/api/',
        destination: 'http://localhost:5000/'
      }
    ]
  
  }
}
