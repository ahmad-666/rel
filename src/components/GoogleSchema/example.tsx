import type { WithContext, AboutPage, Graph } from 'schema-dts';
import GoogleSchema from '.';

//* #1: for single google schema(AboutPage) --> WithContent<AboutPage>
const jsonLd1: WithContext<AboutPage> = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Reverse Email Lookup',
    url: 'https://reverseemaillookup.com/about-us',
    description:
        'Reverse Email Lookup provides access to a vast global database of over 262 million companies and 419 million contacts across more than 5,000 industries, with a remarkable 98% data accuracy. Our robust engines enable you to identify targeted leads, decision-makers, managers, and any specific information you need.'
};
//* #2: for multiple google schema --> Graph
const jsonLd2: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Corporation',
            name: 'Reverse Email Lookup',
            alternateName: ['REU', 'reverse email lookup', 'reverse email lookup'],
            legalName: 'Boobranda GMBH'
        },
        {
            '@type': 'WebSite',
            name: 'Reverse Email Lookup',
            url: 'https://reverseemaillookup.com',
            creator: {
                '@type': 'Corporation',
                name: 'Reverse Email Lookup'
            }
        }
    ]
};

export default function GoogleSchemaExample() {
    return (
        <div>
            <GoogleSchema jsonLd={jsonLd1} />
            <GoogleSchema jsonLd={jsonLd2} />
        </div>
    );
}
