export enum Type {
    Free = 'free',
    STARTER = 'starter',
    GROWTH = 'growth',
    SCALE = 'scale'
}

export enum DurationType {
    MONTHLY = 'monthly',
    YEARLY = 'annual'
}

export type DurationItemType = {
    value: DurationType;
    label: string;
    discount?: number;
};

export type PlanResponse = {
    name: Type;
    price: number;
    period: DurationType;
    credits_amount: number;
    price_id: null | string;
};

export type GetPlansResponse = {
    plans: PlanResponse[];
};
