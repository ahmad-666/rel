'use client';

import { useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import useStore from '@/store';
import type { UTM } from '@/types/UTM';

export default function UTMChecker() {
    //? Update global store utms whenever route changes base on current route url queries
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const updateUTMs = useStore((store) => store.updateUTMs);
    const getUTMQueries = useCallback(() => {
        const utmQueries: UTM = {};
        const queries: (keyof UTM)[] = [
            'cta_page',
            'cta_widget',
            'utm_source',
            'utm_medium',
            'utm_campaign',
            'source_name',
            'source_widget',
            'campaignid',
            'campaignname',
            'adgroupid',
            'gad_source',
            'matchtype',
            'device',
            'keyword'
        ];
        queries.forEach((query) => {
            const queryValue = searchParams.get(query);
            if (queryValue) utmQueries[query] = queryValue;
        });
        updateUTMs(utmQueries);
    }, [searchParams, updateUTMs]);
    useEffect(() => {
        getUTMQueries();
    }, [pathname, getUTMQueries]);

    return <></>;
}
