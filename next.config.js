/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    REACT_APP_BACK_END_URL:"https://fazzpay.herokuapp.com"
  }
}

module.exports = nextConfig
