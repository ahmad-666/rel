export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type ServiceApiDetails = {
    method: Method;
    route: string;
    externalRoute?: string;
    title: string;
    label?: string;
    description: string;
    engine: string;
    service: string;
};

export type EmailLookup = {
    exists: boolean;
    person: NullablePerson;
};

type NullablePerson = Partial<{
    first_name: string;
    last_name: string;
    full_name: string;
    linkedin_url: string;
    linkedin_username: string;
    facebook_url: string;
    twitter_url: string;
    github_url: string;
    job_title: string;
    job_title_role: string;
    job_title_levels: string;
    job_title_categories: string[];
    is_ceo: boolean;
    location_country: string;
    location_state: string;
    location_city: string;
    headline: string;
    interests: string[];
    skills: string[];
    certifications: string[];
    company_name: string;
    company_website: string;
    company_size: string;
    company_founded_year: string;
    company_industry: string;
    company_linkedin_id: string;
    company_linkedin_url: string;
    company_facebook_url: string;
    company_twitter_x_url: string;
    company_location_city: string;
    company_location_state: string;
    company_location_country: string;
    company_products_services: string[];
    company_funding_last_round_type: string;
    company_funding_last_round_amount: string;
    company_funding_last_round_amount_currency_code: string;
    company_funding_number_of_rounds: string;
    company_annual_revenue: string;
    is_company_investor: boolean;
    company_organization_type: string;
    company_technologies: string[];
    email_hosting_name: string;
    email_is_accept_all: boolean;
    avatar: string;
}>;
