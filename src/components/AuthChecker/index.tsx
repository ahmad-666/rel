'use client';

import { useQuery } from '@tanstack/react-query';
import useStore from '@/store';
import { getUserInfo } from '@dashboard/services/user';
import { getActivePlan } from '@dashboard/services/plan';

type Props = {};

export default function AuthChecker({}: Props) {
    const storeUserToken = useStore((store) => store.user.token);
    const updateUser = useStore((store) => store.updateUser);
    const logout = useStore((store) => store.logout);
    const { isError } = useQuery({
        //each time user opens our app for first time we fetch its latest data/active plan and store it in global store/cookies
        enabled: !!storeUserToken, //only send this req if we have logged-in user
        refetchOnMount: true,
        gcTime: 0, //no cache time
        staleTime: 0, //never consider this data as fresh data
        queryKey: ['get-user', storeUserToken], //anytime token changes e.g  user signin/signup ,  token updates , ... we update user data
        queryFn: async () => {
            const user = await getUserInfo();
            const plan = await getActivePlan();
            updateUser({
                ...user,
                activePlan: { ...plan }
            });
            return null;
        }
    });
    if (isError) {
        //if we send getUserInfo,getUserPlan requests and we get error then we logout ... we don't redirect from here and we redirect from axios onError interceptor or auth/dashboard layouts base on user logged-in state
        logout();
    }

    return <></>;
}
