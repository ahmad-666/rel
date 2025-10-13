import axios from '@dashboard/libs/axios';
import {
    planResponseToClient,
    userPlanResponseToClient,
    billingResponseToClient,
    creditStatisticsResponseToClient,
    creditHistoryResponseToClient
} from '@dashboard/utils/transforms/plan';
import type { Response } from '@/types/Common';
import type {
    GetPlansResponse,
    GetPlans,
    GetUserPlanResponse,
    UserPlan,
    UserBillingResponse,
    UserBilling,
    GetCreditFilters,
    GetCreditUsageResponse,
    GetCreditUsage
} from '@dashboard/types/Plan';

export const getPlans = async (): Promise<GetPlans> => {
    const { data } = await axios.get<Response<GetPlansResponse>>('/plans');
    return {
        items: data.data.plans.map((plan) => planResponseToClient(plan))
    };
};
export const getActivePlan = async (): Promise<UserPlan> => {
    const { data } = await axios.get<Response<GetUserPlanResponse>>('/subscriptions');
    return userPlanResponseToClient(data.data.subscription);
};

export const getBillingInfo = async (): Promise<UserBilling> => {
    const { data } = await axios.get<Response<UserBillingResponse>>('/subscriptions/billing');
    return billingResponseToClient(data.data);
};
export const getCreditUsage = async ({ page, page_size, all }: GetCreditFilters): Promise<GetCreditUsage> => {
    const { data } = await axios.get<Response<GetCreditUsageResponse>>('user/credit_usage_history', {
        params: {
            page: typeof page === 'number' ? page - 1 : undefined,
            page_size,
            all
        }
    });
    return {
        statistics: {
            items: data.data.statistics.map((statistic) => creditStatisticsResponseToClient(statistic))
        },
        history: {
            items: data.data.history.map((history) => creditHistoryResponseToClient(history)),
            totalCount: data.data.total_count
        }
    };
};
