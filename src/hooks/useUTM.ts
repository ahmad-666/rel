import { useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import useStore from '@/store';
import type { UTM } from '@/types/UTM';

type Args = {
    initialUTMs: UTM;
};

const useUTM = ({ initialUTMs }: Args) => {
    //? Generate utm keys base on passed 'initialUTMs' arg, current url queries , stored utms in global store
    const [utms, setUTMs] = useState<UTM>({});
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const storeUTMs = useStore((store) => store.utms);
    const generateUtms = useCallback(() => {
        const finalUTMs: UTM = {};
        const utmKeys: (keyof UTM)[] = [
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
        utmKeys.forEach((utmKey) => {
            //for cta_page utm we check pathname and return 'main' for index page and return last section of route for others
            //for other utms highest priority is initialUTMs arg then url queries utms and then utms in global store
            if (utmKey === 'cta_page') finalUTMs.cta_page = pathname === '/' ? 'main' : pathname.split('/').at(-1);
            else finalUTMs[utmKey] = initialUTMs[utmKey] || searchParams.get(utmKey) || storeUTMs[utmKey];
            if (!finalUTMs[utmKey]) delete finalUTMs[utmKey];
        });
        setUTMs(finalUTMs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(initialUTMs), searchParams, storeUTMs]); //! passing initialUTMs to dependencies list will cause infinite re-renders so we pass its serialize version
    useEffect(() => {
        generateUtms();
    }, [generateUtms]);

    return {
        utms: new URLSearchParams(utms) //can be used on <Link href={{pathname:'',query:{...query,...utmSearchParams}}} />
    };
};

export default useUTM;

//? Description:
//* #1: Use zustand store for store utms
//* #2: Use UTMChecker component on root layout for update utms in global store whenever route changes
//* #3: Use useUTM hook for get latest utms base on hook arg,current url queries,utms in store
//* #4: Use 'utms' prop on Button component for set utms in url queries of links
