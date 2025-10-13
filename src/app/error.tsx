'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Navbar from '@/layout/components/Navbar';

type Props = {
    error: Error & { digest?: string };
    reset: () => void;
};

// Must be client component so we cannot use metadata on it
// Get error as prop
// We can go to this route if having any runtime error or if we manually throw error --> throw new Error('...')
// Not handle errors in root layout and for root layout errors we can create /app/global-error file
export default function Error({ error, reset }: Props) {
    const router = useRouter();
    const goBack = () => {
        router.back();
    };
    useEffect(() => {
        document.title = 'Error | Reverse Email Lookup';
    }, []);

    return (
        <div>
            <Navbar />
            <main>
                <div className='bg-primary-light5 flex min-h-screen w-full flex-col items-center justify-center bg-[url("/imgs/patterns/grid.png")] bg-contain bg-no-repeat'>
                    <h1 className='text-body-lg text-neutral text-center'>500 — error</h1>
                    <h3 className='text-headline-lg tablet:text-display-lg text-neutral-dark4 mt-6 text-center'>
                        oops! something went wrong.
                    </h3>
                    <p className='text-neutral-dark4 text-title-lg tablet:text-headline-lg mt-6 text-center'>
                        We apologize and are fixing the problem
                    </p>
                    <div className='mt-8 flex justify-center'>
                        <Button
                            variant='fill'
                            size='sm'
                            color='white'
                            className='!text-neutral-dark4 !border-neutral-light2 border border-solid px-6'
                            onClick={goBack}
                        >
                            Go Back
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
