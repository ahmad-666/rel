import { Suspense, type ReactNode } from 'react';
import Script from 'next/script';
import { type Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';
import GoogleOAuthProvider from '@/providers/GoogleOAuth';
import ReactQueryProvider from '@/providers/ReactQuery';
import SnackbarProvider from '@/providers/Snackbar';
import UTMChecker from '@/components/UTMChecker';
import AuthChecker from '@/components/AuthChecker';
import AfterInteractive from '@/components/AfterInteractive';
import { manrope } from '@/themes/font';
import envs from '@/configs/env';
import './globals.css';

//* Metadata -------------------------
export const metadata: Metadata = {
    title: {
        template: '%s',
        default: ''
    },
    description: '',
    icons: {
        icon: '/imgs/logos/logo.png'
    },
    metadataBase: new URL(envs.frontUrl),
    alternates: {
        canonical: envs.frontUrl
    },
    robots:
        envs.appType === 'test'
            ? {
                  index: false,
                  follow: false
              }
            : {
                  index: true,
                  follow: true
              }
};

//* Root Layout -----------------------
export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html dir='ltr' lang='en-US'>
            {/* <head>
              
            </head> */}
            <body className={`antialiased ${manrope.className} ${manrope.variable}`}>
                {/* <SpeedInsights /> */}
                <GoogleOAuthProvider>
                    <ReactQueryProvider>
                        <SnackbarProvider>
                            <Suspense>
                                <UTMChecker />
                            </Suspense>
                            <AuthChecker />
                            <div id='app'>{children}</div>
                            <div id='portals' />
                        </SnackbarProvider>
                    </ReactQueryProvider>
                </GoogleOAuthProvider>
                <AfterInteractive>
                    <Script
                        id='crisp-chat'
                        strategy='lazyOnload' //scripts with 'beforeInteractive' will always inject inside of <head> tag
                        dangerouslySetInnerHTML={{
                            __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="${envs.crispWebsiteId}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`
                        }}
                    />
                    <Script
                        id='microsoft-clarity'
                        strategy='lazyOnload'
                        dangerouslySetInnerHTML={{
                            __html: `(function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "rs2cefhfd6");`
                        }}
                    />
                    <Script
                        id='optin-monster'
                        strategy='lazyOnload'
                        dangerouslySetInnerHTML={{
                            __html: `(function(d,u,ac){var s=d.createElement('script');s.type='text/javascript';s.src='https://a.omappapi.com/app/js/api.min.js';s.async=true;s.dataset.user=u;s.dataset.account=ac;d.getElementsByTagName('head')[0].appendChild(s);})(document,374739,397342);`
                        }}
                    />
                    <GoogleTagManager gtmId={envs.gtmKey} />
                </AfterInteractive>
            </body>
        </html>
    );
}
