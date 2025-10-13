import landingPublicAxios from '@landing/libs/axios';
import { type Response } from '@/types/Common';
import type { GetPlansResponse, PlanResponse } from '@landing/types/plan';

//* Get plans
export const getPlans = async (): Promise<PlanResponse[]> => {
    const { data } = await landingPublicAxios.get<Response<GetPlansResponse>>('/public/plans');
    return data.data.plans;
};
