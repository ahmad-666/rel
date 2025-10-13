import { type MetadataRoute } from 'next';
import envs from '@/configs/env';

//for static robots.txt we can use /public/robots.txt or /app/robots.txt
export default function robots(): MetadataRoute.Robots {
    if (envs.appType === 'main') {
        //? Main Live Version
        return {
            rules: [
                {
                    userAgent: '*',
                    disallow: ['/blog/wp-content/plugins/', '/blog/wp-admin/', '/_next/*.js$']
                }
            ],
            sitemap: ['https://reverseemaillookup.net/blog/sitemap.xml', 'https://reverseemaillookup.net/sitemap.xml']
        };
    }
    //? Test(develop,beta) Version
    return {
        rules: [
            {
                //? each key can be string|string[]
                userAgent: '*',
                //allow: '/',
                disallow: '/'
            }
        ]
        //sitemap: `${envs.frontUrl}/sitemap.xml`
    };
}
