'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { sendLog } from '@dashboard/services/logger';
import routeMapper from '@dashboard/utils/route-mapper';

export default function Logger() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useQuery({
        queryKey: ['send-logger', pathname],
        queryFn: async () => {
            const mappedRouted = routeMapper(pathname);
            const queries: Record<string, unknown> = {};
            searchParams.forEach((val, key) => (queries[key] = val));
            await sendLog({
                event: `view-${mappedRouted}`,
                meta_data: { ...queries }
            });
            return null;
        }
    });

    return <></>;
}
