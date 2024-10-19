/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['lucide-react'],
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
