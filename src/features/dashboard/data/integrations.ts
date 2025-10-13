import { Type, Company, Integration } from '@dashboard/types/Integration';

const integrations: Integration[] = [
    {
        type: Type.AUTOMATION,
        company: Company.ZAPIER,
        title: 'Zapier',
        description: 'Integrate with Zapier for seamless and automated data workflow management.',
        fillImgSrc: '/imgs/integrations/zapier.png',
        transparentImgSrc: '/imgs/integrations/zapier-2.png'
    },
    {
        type: Type.CRM,
        company: Company.ZOHO,
        title: 'Zoho CRM',
        description: 'Enhance Zoho CRM to enriching customer interactions for smarter decisions.',
        fillImgSrc: '/imgs/integrations/zoho.png',
        transparentImgSrc: '/imgs/integrations/zoho-2.png'
    },
    {
        type: Type.CRM,
        company: Company.HUBSPOT,
        title: 'HubSpot',
        description: 'Enhance customer management with HubSpot CRM integration for streamlined interactions.',
        fillImgSrc: '/imgs/integrations/hubspot.png',
        transparentImgSrc: '/imgs/integrations/hubspot-2.png'
    },
    {
        type: Type.CRM,
        company: Company.SALESFORCE,
        title: 'Salesforce',
        description: 'Enhance your CRM with Salesforce, improving customer data and streamlining sales.',
        fillImgSrc: '/imgs/integrations/salesforce.png',
        transparentImgSrc: '/imgs/integrations/salesforce.png'
    }
];

export default integrations;
