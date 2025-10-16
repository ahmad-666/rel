import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.cufinder.io'
            },
            {
                protocol: 'https',
                hostname: 'media.reverseemaillookup.net'
            }
        ],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    },
    async headers() {
        return [
            {
                //source: '/about','/products/:id' , '/products/:path*'
                source: '/api/:path*', // matching all API route handlers
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: `${process.env.NEXT_PUBLIC_FRONT_URL}` //could use '*' too
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'Content-Type, Accept, Authorization'
                    },
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin'
                    },
                    {
                        key: 'Cross-Origin-Resource-Policy',
                        value: 'same-origin'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'no-referrer'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-Download-Options',
                        value: 'noopen'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Permitted-Cross-Domain-Policies',
                        value: 'none'
                    }
                ]
            }
        ];
    },
    experimental: {
        //largePageDataBytes: 20 * 128 * 1000 //2mb(default is 128kb) , tweak nextjs max allow size for props of pages
        optimizePackageImports: ['@mui/material', 'swiper', 'shiki', 'framer-motion']
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production'
    }
};

export default nextConfig;
