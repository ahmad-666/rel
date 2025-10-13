'use client';

import Button from '@/components/Button';

//* Types -----------------------------
type Props = {
    capCreditsCount?: number;
    className?: string;
};

//* Helpers ---------------------------
const formatNumberShort = (num: number): string => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toString();
};

//* Component -------------------------
const PlanSpecialCard = ({ capCreditsCount = 50_000, className = '' }: Props) => {
    return (
        <div
            className={`from-neutral-dark4 to-brown relative flex flex-col items-center justify-between gap-6 rounded-xl bg-gradient-to-r p-8 ${className}`}
        >
            <p className='text-headline-md text-white'>Need More than {formatNumberShort(capCreditsCount)} credits?</p>
            <Button
                size='lg'
                color='white'
                className='!text-neutral-dark4 border-neutral-light2 border border-solid'
                onClick={() => {
                    ////@ts-expect-error '$crisp is added via its script'
                    window?.$crisp?.push(['do', 'chat:open']);
                }}
            >
                Contact Sales
            </Button>
        </div>
    );
};

export default PlanSpecialCard;
