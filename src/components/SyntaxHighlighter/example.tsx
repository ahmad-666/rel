'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { type BundledLanguage as Lang } from 'shiki';
const SyntaxHighlighter = dynamic(() => import('.'), { ssr: false });

export type LangDetails = {
    lang: Lang;
    fileName: string;
    text: string;
    color: string;
    icon: string;
};
const langs: LangDetails[] = [
    {
        lang: 'bash',
        fileName: 'curl',
        text: 'cURL',
        color: 'neutral',
        icon: 'simple-icons:curl'
    },
    {
        lang: 'javascript',
        fileName: 'javascript',
        text: 'Javascript',
        color: 'warning',
        icon: 'simple-icons:javascript'
    }
];
const response = `{
    "query": "stripe",
    "url": "stripe.com",
    "credit_count": 939,
    "confidence_level": 97 
}`;

export default function SyntaxHighlighterExample() {
    const staticCode = `curl --location 'https://api.cufinder.io/v1/cuf' \\
     --header 'Content-Type: application/json' \\
     --data '{
       "apiKey": "api_key",
       "companyName": "stripe"
     }'
   `;
    const [lang, setLang] = useState<LangDetails>(langs[0]);
    const [dynamicCode, setDynamicCode] = useState('');
    const updateLang = async (newLang: LangDetails) => {
        //we lazy load each language file request
        setLang(newLang);
        // const fetchedCode = (
        //     await import(`@/data/api/enrichment/company-name-to-company-domain/post/${newLang.fileName}`)
        // ).default as string;
        setDynamicCode(`{
            "query-new": "stripe",
            "url-new": "stripe.com",
            "credit_count-new": 939,
            "confidence_level-new": 97 
        }`);
    };
    useEffect(() => {
        updateLang(langs[0]);
    }, []);

    return (
        <div>
            <div>
                <h1>#1: Statically set code:</h1>
                <SyntaxHighlighter
                    title='Request'
                    code={staticCode}
                    theme='aurora-x'
                    lang='bash'
                    color='surface-darken-4'
                    copyToClipboard
                />
            </div>
            <div>
                <h1>#2: Dynamically set code:</h1>
                <div>
                    {langs.map((l) => (
                        <button
                            key={l.text}
                            onClick={() => updateLang(l)}
                            className={`${l.text === lang.text ? 'text-primary' : 'text-neutral'}`}
                        >
                            {/* <Icon icon={l.icon} color={l.color} /> */}
                            {l.text}
                        </button>
                    ))}
                    <div className='mt-10'>
                        <SyntaxHighlighter title='Request' lang={lang.lang} code={dynamicCode} />
                    </div>
                    <div className='mt-10'>
                        <SyntaxHighlighter title='Response' lang='json' code={response} />
                    </div>
                </div>
            </div>
        </div>
    );
}
