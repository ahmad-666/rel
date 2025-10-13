import {
    Type,
    Status,
    type PlanResponse,
    type UserPlanResponse,
    type Plan,
    type UserPlan,
    type UserBillingResponse,
    type UserBilling,
    type CreditStatisticsResponse,
    type CreditHistoryResponse,
    type CreditStatistics,
    type CreditHistory
} from '@dashboard/types/Plan';
import { getPlanIcon } from '@dashboard/utils';

export const planResponseToClient = ({ price_id, period, name, price, credits_amount }: PlanResponse): Plan => {
    const { icon, color: iconColor } = getPlanIcon(name);
    return {
        id: price_id || name, //for free plan price_id is null
        type: name,
        duration: period,
        status: Status.ACTIVE, //only active plans will return from response
        name,
        price,
        totalCredits: credits_amount,
        isPopular: name === Type.GROWTH,
        features:
            name === Type.Free
                ? []
                : name === Type.STARTER
                  ? [
                        'Credit-Back Guarantee For Unmatched Data',
                        'Personal & Business Reverse Email Lookup',
                        'CSV, XLSX, XLS exports'
                    ]
                  : [
                        'Credit-Back Guarantee For Unmatched Data',
                        'Personal & Business Reverse Email Lookup',
                        'CSV, XLSX, XLS exports',
                        'API',
                        '100% GDPR & CCPA compliant',
                        'Support Priority'
                    ],
        icon,
        iconColor
    };
};
export const userPlanResponseToClient = ({ start_date, end_date, plan }: UserPlanResponse): UserPlan => {
    const { price_id, period, name, price, credits_amount } = plan;
    return {
        id: price_id || name, //for free plan price_id is null
        type: name,
        duration: period,
        status: Status.ACTIVE, //only active plans will return from response
        name,
        price,
        totalCredits: credits_amount,
        startDate: start_date,
        endDate: end_date
    };
};
export const billingResponseToClient = ({ customer, card, portal_url }: UserBillingResponse): UserBilling => {
    return {
        user: {
            name: customer?.name || '',
            address: customer?.address || ''
        },
        creditCard: {
            brand: card?.brand || '',
            value: card?.card_number || '',
            expirationDate: card?.expire_date || ''
        },
        portalUrl: portal_url || ''
    };
};
export const creditStatisticsResponseToClient = ({ month, count }: CreditStatisticsResponse): CreditStatistics => {
    return {
        id: crypto.randomUUID(),
        date: month,
        value: +count
    };
};
export const creditHistoryResponseToClient = ({
    type,
    query,
    credits,
    created_at
}: CreditHistoryResponse): CreditHistory => {
    return {
        id: crypto.randomUUID(),
        type,
        query,
        value: +credits,
        date: created_at
    };
};
