import { type MetadataRoute } from 'next';
import palette from '@/themes/mui/palette';
import envs from '@/configs/env';

//for static manifest.json we can use /public/manifest.json or /app/manifest.json
export default function manifest(): MetadataRoute.Manifest {
    return {
        id: envs.frontUrl,
        name: 'Reverse Email Lookup',
        short_name: 'Email Lookup',
        description:
            "Reverse Email Lookup helps you turn a single email address into a complete contact profile. Perfect for outreach  — all without overpaying or guessing who's behind the inbox.",
        theme_color: palette.primary.main,
        background_color: '#fff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        lang: 'en',
        dir: 'ltr',
        orientation: 'portrait',
        display_override: ['standalone', 'minimal-ui', 'fullscreen', 'browser'],
        icons: [
            {
                src: '/imgs/logos/icons/icon-36x36.png',
                type: 'image/png',
                sizes: '36x36'
            },
            {
                src: '/imgs/logos/icons/icon-48x48.png',
                type: 'image/png',
                sizes: '48x48'
            },
            {
                src: '/imgs/logos/icons/icon-72x72.png',
                type: 'image/png',
                sizes: '72x72'
            },
            {
                src: '/imgs/logos/icons/icon-96x96.png',
                type: 'image/png',
                sizes: '96x96'
            },
            {
                src: '/imgs/logos/icons/icon-128x128.png',
                type: 'image/png',
                sizes: '128x128'
            },
            {
                src: '/imgs/logos/icons/icon-144x144.png',
                type: 'image/png',
                sizes: '144x144'
            },
            {
                src: '/imgs/logos/icons/icon-192x192.png',
                type: 'image/png',
                sizes: '192x192'
            },
            {
                src: '/imgs/logos/icons/icon-256x256.png',
                type: 'image/png',
                sizes: '256x256'
            },
            {
                src: '/imgs/logos/icons/icon-512x512.png',
                type: 'image/png',
                sizes: '512x512'
            },
            {
                src: '/imgs/logos/icons/apple-icon-precomposed.png',
                type: 'image/png',
                sizes: '192x192',
                purpose: 'maskable'
            }
        ],
        screenshots: [
            {
                src: '/imgs/screenshots/home.png',
                sizes: '1280x720',
                type: 'image/png',
                form_factor: 'wide',
                label: ''
            },
            {
                src: '/imgs/screenshots/reviews.png',
                sizes: '1280x720',
                type: 'image/png',
                form_factor: 'wide',
                label: ''
            },
            {
                src: '/imgs/screenshots/about-us.png',
                sizes: '550x700',
                type: 'image/png',
                form_factor: 'narrow',
                label: ''
            }
        ]
    };
}
