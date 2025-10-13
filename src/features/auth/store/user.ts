import { type StateCreator } from 'zustand';
import Cookie from 'js-cookie';
import { getUserInfo } from '@dashboard/services/user';
import { getActivePlan } from '@dashboard/services/plan';
import { COOKIE_KEY } from '@auth/configs';
import { type User } from '@auth/types';
import { Type as PlanType } from '@dashboard/types/Plan';

export type States = {
    user: User;
};
export type Getters = {
    isLoggedIn: () => boolean;
    isFreePlan: () => boolean;
};
export type Actions = {
    setUser: (user: User) => void;
    updateUser: (user: Partial<User>) => void;
    updateCreditBy: (amount: number) => void;
    fetchUser: () => Promise<void>;
    fetchActivePlan: () => Promise<void>;
    logout: () => void;
};
export type Slice = States & Getters & Actions;

const sliceName = 'user';
const defaultUser: User = {
    isVerified: false,
    name: '',
    email: '',
    imgSrc: '',
    credits: 0,
    activePlan: null,
    registerDate: '',
    apiKey: '',
    token: ''
};

const createUserSlice: StateCreator<Slice, [['zustand/devtools', unknown]], [], Slice> = (set, get) => ({
    //* States .........................
    user: defaultUser,
    //* Getters .........................
    isLoggedIn: () => {
        const token = get().user.token;
        return !!token;
    },
    isFreePlan: () => {
        const plan = get().user.activePlan;
        return plan?.type === PlanType.Free;
    },
    //* Setters,Mutations,Actions .........................
    //? for login,updateUser no need to use cookies because we have defined separate persist storage ... for logout we need to manually clear cookie
    setUser: (user) => {
        set({ user }, undefined, `${sliceName}/login`);
    },
    updateUser: (newUser) => {
        set(
            (state) => ({
                user: {
                    ...state.user, //keep the old values
                    ...newUser //update with the new values
                }
            }),
            undefined,
            `${sliceName}/updateUser`
        );
    },
    updateCreditBy: (amount: number) => {
        set(
            (state) => ({
                user: {
                    ...state.user,
                    credits: (state.user.credits || 0) + amount
                }
            }),
            undefined,
            `${sliceName}/updateCreditBy`
        );
    },
    fetchUser: async () => {
        const user = await getUserInfo();
        set(
            (state) => ({
                user: {
                    ...state.user,
                    ...user
                }
            }),
            undefined,
            `${sliceName}/fetchUser`
        );
    },
    fetchActivePlan: async () => {
        const plan = await getActivePlan();
        set(
            (state) => ({
                user: {
                    ...state.user,
                    activePlan: {
                        ...plan
                    }
                }
            }),
            undefined,
            `${sliceName}/fetchActivePlan`
        );
    },
    logout: () => {
        set(
            {
                user: defaultUser
            },
            undefined,
            `${sliceName}/logout`
        );
        Cookie.remove(COOKIE_KEY);
    }
});

export default createUserSlice;
