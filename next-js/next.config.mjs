/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/webp', 'image/avif'],
    },
    compiler: {
        styledComponents: true,
    },
};

export default nextConfig;
