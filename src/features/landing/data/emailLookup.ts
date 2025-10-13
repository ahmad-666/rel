import { type EmailLookup } from '@landing/types/service';
import { type EmailLookupSocialMedia, type EmailLookupInfo } from '@landing/types/form';

//* User Info -----------------------------
export const userInfo: EmailLookupInfo = {
    job_title_levels: {
        title: 'Job Title Level',
        get: (data: EmailLookup) => data?.person.job_title_levels
    },
    job_title_role: {
        title: 'Job Title Role',
        get: (data: EmailLookup) => data?.person.job_title_role
    },
    job_title_categories: {
        title: 'Job Title Category',
        get: (data: EmailLookup) => {
            const categories = data?.person?.job_title_categories;
            return categories && categories.length > 0 ? categories.join(', ') : null;
        }
    },
    headline: {
        title: 'Headline',
        get: (data: EmailLookup) => data?.person.headline
    },
    linkedin_username: {
        title: 'LinkedIn Username',
        get: (data: EmailLookup) => data?.person.linkedin_username
    },
    location: {
        title: 'Location',
        get: (data: EmailLookup) => {
            const { location_country, location_state, location_city } = data?.person || {};
            return [location_country, location_state, location_city].filter(Boolean).join(', ');
        }
    },
    interests: {
        title: 'Interest',
        get: (data: EmailLookup) => {
            const interests = data?.person.interests;
            return interests && interests.length > 0 ? interests.join(', ') : null;
        }
    },
    skills: {
        title: 'Skill',
        get: (data: EmailLookup) => {
            const skills = data?.person.skills;
            return skills && skills.length > 0 ? skills.join(', ') : null;
        }
    },
    certifications: {
        title: 'Certifications',
        get: (data: EmailLookup) => {
            const certs = data?.person?.certifications;
            return certs && certs.length > 0 ? certs.join(', ') : null;
        }
    }
};

//* Person Social Media -----------------------------
export const personSocialMedia: EmailLookupSocialMedia = {
    linkedin: {
        icon: 'ph:linkedin-logo-fill',
        get: (data: EmailLookup) => data?.person.linkedin_url ?? null
    },
    facebook: {
        icon: 'ph:facebook-logo-fill',
        get: (data: EmailLookup) => data?.person.facebook_url ?? null
    },
    twitter: {
        icon: 'ph:x-logo-fill',
        get: (data: EmailLookup) => data?.person.twitter_url ?? null
    },
    github: {
        icon: 'ph:github-logo-fill',
        get: (data: EmailLookup) => data?.person.github_url ?? null
    }
};

//* Company Info -----------------------------
export const companyInfo: EmailLookupInfo = {
    industry: {
        title: 'Industry',
        get: (data: EmailLookup) => data?.person.company_industry
    },
    size: {
        title: 'Size',
        get: (data: EmailLookup) => data?.person.company_size
    },
    location: {
        title: 'Location',
        get: (data: EmailLookup) => {
            const { company_location_city, company_location_state, company_location_country } = data?.person || {};
            return [company_location_country, company_location_state, company_location_city].filter(Boolean).join(', ');
        }
    },
    founded_year: {
        title: 'Founded Year',
        get: (data: EmailLookup) => data?.person.company_founded_year
    },
    type: {
        title: 'Type',
        get: (data: EmailLookup) => data?.person.company_organization_type
    },
    technologies: {
        title: 'Technologies',
        get: (data: EmailLookup) => {
            const tech = data?.person?.company_technologies;
            return tech && tech.length > 0 ? tech.join(', ') : null;
        }
    },
    product_services: {
        title: 'Product Services',
        get: (data: EmailLookup) => {
            const products = data?.person?.company_products_services;
            return products && products.length > 0 ? products.join(', ') : null;
        }
    },
    annual_revenue: {
        title: 'Annual Revenue',
        get: (data: EmailLookup) => data?.person.company_annual_revenue
    },
    last_funding_type: {
        title: 'Last Funding Type',
        get: (data: EmailLookup) => data?.person.company_funding_last_round_type
    },
    last_funding_amount: {
        title: 'Last Funding Amount',
        get: (data: EmailLookup) => data?.person.company_funding_last_round_amount
    },
    last_funding_currency: {
        title: 'Last Funding Currency',
        get: (data: EmailLookup) => data?.person.company_funding_last_round_amount_currency_code
    },
    funding_rounds_count: {
        title: 'Funding Rounds Count',
        get: (data: EmailLookup) => data?.person.company_funding_number_of_rounds
    },
    company_investor: {
        title: 'Company Investor',
        get: (data: EmailLookup) => (data?.person.is_company_investor ? 'Yes' : 'No')
    },
    email_hosting_provider: {
        title: 'Email Hosting Provider',
        get: (data: EmailLookup) => data?.person.email_hosting_name
    },
    email_accepts_all: {
        title: 'Email Accepts All',
        get: (data: EmailLookup) => (data?.person.email_is_accept_all ? 'Yes' : 'No')
    }
};

//* Company Social Media -----------------------------
export const companySocialMedia: EmailLookupSocialMedia = {
    website: {
        icon: 'ph:globe-simple-fill',
        get: (data: EmailLookup) => data?.person.company_website ?? null
    },
    linkedin: {
        icon: 'ph:linkedin-logo-fill',
        get: (data: EmailLookup) => data?.person.company_linkedin_url ?? null
    },
    facebook: {
        icon: 'ph:facebook-logo-fill',
        get: (data: EmailLookup) => data?.person.company_facebook_url ?? null
    },
    twitter: {
        icon: 'ph:x-logo-fill',
        get: (data: EmailLookup) => data?.person.company_twitter_x_url ?? null
    }
};
