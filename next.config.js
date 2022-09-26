/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    REACT_APP_BACK_END_URL:"https://fazzpay-bagusth15.vercel.app/"
  },
  images: {
    domains: ["res.cloudinary.com"]
  },
    optimizeFonts: false,
}

module.exports = nextConfig
