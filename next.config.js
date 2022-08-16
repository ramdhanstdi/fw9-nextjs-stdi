/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    REACT_APP_BACK_END_URL:"https://fazzpay.herokuapp.com"
  },
  images: {
    domains: ["res.cloudinary.com"]
  },
    optimizeFonts: false,
}

module.exports = nextConfig
