//* Plan --------------------------------------
//* Plan --------------------------------------
//* Plan --------------------------------------
export enum Type {
    Free = 'free',
    STARTER = 'starter',
    GROWTH = 'growth',
    SCALE = 'scale'
}
export enum Duration {
    MONTHLY = 'monthly',
    YEARLY = 'annual'
}
export enum Status {
    ACTIVE,
    DEACTIVATE,
    CANCEL
}
export enum PaymentStatus {
    SUCCESS = 'success',
    FAILED = 'failed'
}

export type Plan = {
    id: string;
    type: Type;
    duration: Duration;
    status?: Status;
    name: string;
    price: number;
    /** total credits of plan that user can spends */
    totalCredits: number;
    isPopular?: boolean;
    features?: string[];
    icon?: string;
    iconColor?: string;
};
export type GetPlans = {
    items: Plan[];
};
export type PlanResponse = {
    price_id: null | string;
    period: Duration;
    name: Type;
    price: number;
    credits_amount: number;
    is_custom: boolean;
};
export type GetPlansResponse = {
    plans: PlanResponse[];
};
export type UserPlan = Omit<Plan, 'features'> & {
    //remainingCredits(remaining of user credits) is not here and we get if from getUserInfo http req
    startDate: string;
    endDate: string;
};
export type UserPlanResponse = {
    start_date: string;
    end_date: string;
    plan: {
        price_id: null | string;
        name: Type;
        period: Duration;
        price: 0;
        credits_amount: 15;
    };
};
export type GetUserPlanResponse = {
    subscription: UserPlanResponse;
};
//* Billing --------------------------------------
//* Billing --------------------------------------
//* Billing --------------------------------------
export type UserBilling = {
    user: {
        name: string;
        address: string;
    };
    creditCard: {
        brand: string;
        value: string;
        expirationDate: string;
    };
    portalUrl: string;
};
export type UserBillingResponse = {
    portal_url: null | string;
    customer: null | {
        name: null | string;
        address: null | string;
    };
    card: null | {
        brand: string;
        card_number: string;
        expire_date: string;
    };
};
//* Credit Usage --------------------------------------
//* Credit Usage --------------------------------------
//* Credit Usage --------------------------------------
export enum CreditUsageType {
    API = 'api',
    BULK = 'bulk',
    DASHBOARD = 'dashboard'
}
export type CreditStatistics = {
    id: string;
    date: string;
    value: number;
};
export type CreditHistory = {
    id: string;
    type: CreditUsageType;
    query: string;
    value: number;
    date: string;
};
export type CreditStatisticsResponse = {
    /** something like 2025-01 and its only consist of year,month */
    month: string;
    count: string;
};
export type CreditHistoryResponse = {
    type: CreditUsageType;
    query: string;
    credits: number;
    created_at: string;
};
export type GetCreditUsage = {
    statistics: {
        items: CreditStatistics[];
    };
    history: {
        items: CreditHistory[];
        totalCount: number;
    };
};
export type GetCreditUsageResponse = {
    statistics: CreditStatisticsResponse[];
    history: CreditHistoryResponse[];
    /** total_count of history */
    total_count: number;
};
export type GetCreditFilters = {
    /** filter for history */
    page?: number;
    /** filter for history */
    page_size?: number;
    /** filter for history */
    all?: boolean;
};
