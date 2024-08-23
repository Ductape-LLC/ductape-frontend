/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "rc-util",
    "@ant-design",
    "antd",
    "rc-pagination",
    "rc-picker",
    "@babel",
  ],
  images: {
    domains: ["ductape-public.s3.us-east-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
