const envs = {
    appType: process.env.NEXT_PUBLIC_APP_TYPE!,
    frontUrl: process.env.NEXT_PUBLIC_FRONT_URL!,
    frontApiUrl: process.env.NEXT_PUBLIC_FRONT_API_URL!,
    mediaUrl: process.env.NEXT_PUBLIC_MEDIA_URL!,
    apiUrl: process.env.NEXT_PUBLIC_API_URL!,
    apiSubdomainUrl: process.env.NEXT_PUBLIC_API_SUBDOMAIN_URL!,
    cloudFlareCaptchaSiteKey: process.env.NEXT_PUBLIC_CLOUDFLARE_CAPTCHA_SITE_KEY!,
    googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    muiProLicenseKey: process.env.NEXT_PUBLIC_MUI_PRO_LICENSE_KEY!,
    crispWebsiteId: process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID!,
    zohoClientId: process.env.NEXT_PUBLIC_ZOHO_CLIENT_ID!,
    hubspotClientId: process.env.NEXT_PUBLIC_HUBSPOT_CLIENT_ID!,
    gtmKey: process.env.NEXT_PUBLIC_GTM_KEY!
};

export default envs;
