import type { ServiceApiDetails } from '@landing/types/service';

const endpoint: ServiceApiDetails = {
    method: 'post',
    route: '/cuf',
    externalRoute: 'https://apidoc.cufinder.io/apis/#company-website-finder-api',
    title: 'Company Website Finder API',
    label: 'Convert company name to domain',
    description:
        'The Company Website Finder API is a powerful tool that allows you to convert a company name into its corresponding domain name. With this API, you can effortlessly retrieve the website addresses of companies, enabling you to streamline your business processes and gather valuable information efficiently.',
    engine: 'enrichment',
    service: 'company-name-to-company-domain'
};

export default endpoint;
