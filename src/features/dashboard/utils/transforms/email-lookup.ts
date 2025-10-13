import { transformURL } from '@/utils/transforms';
import envs from '@/configs/env';
import type { EmailLookupResponse, EmailLookup } from '@dashboard/types/Email-Lookup';

export const emailLookupResponseToClient = ({ exists, person }: EmailLookupResponse): EmailLookup => {
    const {
        first_name,
        last_name,
        full_name,
        is_ceo,
        is_company_investor,
        avatar,
        location_country,
        location_state,
        location_city,
        headline,
        job_title,
        job_title_role,
        job_title_levels,
        job_title_categories,
        skills,
        interests,
        certifications,
        email_hosting_name,
        email_is_accept_all,
        twitter_url,
        facebook_url,
        github_url,
        linkedin_url,
        linkedin_username,
        company_name,
        company_industry,
        company_size,
        company_founded_year,
        company_technologies,
        company_organization_type,
        company_products_services,
        company_location_country,
        company_location_state,
        company_location_city,
        company_annual_revenue,
        company_funding_last_round_type,
        company_funding_number_of_rounds,
        company_funding_last_round_amount,
        company_funding_last_round_amount_currency_code,
        company_website,
        company_twitter_x_url,
        company_facebook_url,
        company_linkedin_id,
        company_linkedin_url
    } = person || {};

    return {
        isExist: exists,
        user: !exists
            ? null
            : {
                  firstName: first_name || '',
                  lastName: last_name || '',
                  fullName: full_name || '',
                  isCEO: is_ceo || false,
                  imgSrc: avatar
                      ? transformURL(avatar)
                      : linkedin_url
                        ? `${envs.mediaUrl}/person_profile/${linkedin_url.split('/').at(-1)}`
                        : '',
                  location: {
                      country: location_country || '',
                      state: location_state || '',
                      city: location_city || ''
                  },
                  headline: headline || '',
                  job: {
                      title: job_title || '',
                      role: job_title_role || '',
                      levels: job_title_levels || '',
                      categories: job_title_categories || []
                  },
                  skills: skills || [],
                  interests: interests || [],
                  certifications: certifications || [],
                  socials: {
                      website: '',
                      twitter: transformURL(twitter_url || ''),
                      facebook: transformURL(facebook_url || ''),
                      github: transformURL(github_url || ''),
                      linkedinId: '',
                      linkedinUserName: linkedin_username || '',
                      linkedinURL: transformURL(linkedin_url || '')
                  }
              },
        company: !exists
            ? null
            : {
                  name: company_name || '',
                  industry: company_industry || '',
                  isInvestor: is_company_investor || false,
                  imgSrc: company_linkedin_url
                      ? `${envs.mediaUrl}/company_profile/${company_linkedin_url.split('/').at(-1)}`
                      : '',
                  size: company_size || '',
                  foundedYear: company_founded_year || '',
                  technologies: company_technologies || [],
                  organizationType: company_organization_type || '',
                  productsServices: company_products_services || [],
                  location: {
                      country: company_location_country || '',
                      state: company_location_state || '',
                      city: company_location_city || ''
                  },
                  emailHostingName: email_hosting_name || '',
                  emailIsAcceptAll: email_is_accept_all || false,
                  funding: {
                      annualRevenue: company_annual_revenue || '',
                      lastRoundType: company_funding_last_round_type || '',
                      numberOfRounds: company_funding_number_of_rounds || '',
                      lastRoundAmount: company_funding_last_round_amount || '',
                      lastRoundAmountCurrencyCode: company_funding_last_round_amount_currency_code || ''
                  },
                  socials: {
                      website: transformURL(company_website || ''),
                      twitter: transformURL(company_twitter_x_url || ''),
                      facebook: transformURL(company_facebook_url || ''),
                      github: '',
                      linkedinId: company_linkedin_id || '',
                      linkedinUserName: '',
                      linkedinURL: transformURL(company_linkedin_url || '')
                  }
              }
    };
};
