export type EmailLookupReqBody = {
    email: string;
    apiKey?: string;
};
export type Location = {
    country: string;
    state: string;
    city: string;
};
export type Job = {
    title: string;
    role: string;
    levels: string;
    categories: string[];
};
export type Funding = {
    annualRevenue: string;
    lastRoundType: string;
    numberOfRounds: string;
    lastRoundAmount: string;
    lastRoundAmountCurrencyCode: string;
};
export type Social = {
    website: string;
    twitter: string;
    facebook: string;
    github: string;
    linkedinId: string;
    linkedinUserName: string;
    linkedinURL: string;
};
export type User = {
    firstName: string;
    lastName: string;
    fullName: string;
    isCEO: boolean;
    imgSrc: string;
    location: Location;
    headline: string;
    job: Job;
    skills: string[];
    interests: string[];
    certifications: string[];
    socials: Social;
};
export type Company = {
    name: string;
    industry: string;
    isInvestor: boolean;
    imgSrc: string;
    size: string;
    foundedYear: string;
    technologies: string[];
    organizationType: string;
    productsServices: string[];
    location: Location;
    funding: Funding;
    emailHostingName: string;
    emailIsAcceptAll: boolean;
    socials: Social;
};
export type EmailLookup = {
    isExist: boolean;
    user: null | User;
    company: null | Company;
};
export type EmailLookupResponse = {
    exists: boolean;
    person: null | {
        //* contact info --------------------
        first_name: null | string;
        last_name: null | string;
        full_name: null | string;
        is_ceo: boolean;
        avatar: null | string;
        location_country: null | string;
        location_state: null | string;
        location_city: null | string;
        headline: null | string;
        job_title: null | string;
        job_title_role: null | string;
        job_title_levels: null | string;
        job_title_categories: string[];
        skills: string[];
        interests: string[];
        certifications: string[];
        twitter_url: null | string;
        facebook_url: null | string;
        github_url: null | string;
        linkedin_url: null | string;
        linkedin_username: null | string;
        //* company info --------------------
        company_name: null | string;
        company_industry: null | string;
        is_company_investor: boolean;
        company_size: null | string;
        company_founded_year: null | string;
        company_technologies: string[];
        company_organization_type: null | string;
        company_products_services: string[];
        company_location_country: null | string;
        company_location_state: null | string;
        company_location_city: null | string;
        email_hosting_name: null | string;
        email_is_accept_all: boolean;
        company_annual_revenue: null | string;
        company_funding_last_round_type: null | string;
        company_funding_number_of_rounds: null | string;
        company_funding_last_round_amount: null | string;
        company_funding_last_round_amount_currency_code: null | string;
        company_website: null | string;
        company_twitter_x_url: null | string;
        company_facebook_url: null | string;
        company_linkedin_id: null | string;
        company_linkedin_url: null | string;
    };
};
