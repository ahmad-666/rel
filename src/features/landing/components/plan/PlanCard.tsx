import Image from 'next/image';
import Icon from '@/components/Icon';
import Button from '@/components/Button';
import { Type, DurationType } from '@landing/types/plan';

//* Types -----------------------------
type Props = {
    name: Type;
    price: number;
    period: DurationType;
    credits_amount: number;
    price_id: string | null;
    iconClassName?: string;
    disabled?: boolean;
    className?: string;
};

//* Utils -----------------------------
const intl = new Intl.NumberFormat('en-US');

//* Constants -------------------------
const features: string[] = [
    'Credit back guarantee for unmatched data',
    'Personal & business reverse email lookup',
    'CSV, XLSX, XLS exports',
    'API',
    '100 GDPR & CCPA compliant',
    'Support priority'
];

//* Component -------------------------
const PlanCard = ({ name, price, period, credits_amount, disabled = false, className = '' }: Props) => {
    const isFree = name === Type.Free;

    return (
        <div
            className={`shrink-0 rounded-lg border bg-white p-5 text-start ${name === Type.GROWTH ? 'border-primary border-2' : 'border-neutral-light3'} ${className}`}
        >
            <div>
                <h3 className='text-headline-sm text-neutral-dark4 capitalize'>{name}</h3>
                <div className='mt-12 flex flex-col'>
                    <p className='text-headline-lg text-neutral-dark4'>
                        {isFree ? '' : '$'}
                        {intl.format(price)}
                    </p>
                    <span className='text-body-md text-neutral capitalize'>{period}</span>
                </div>
                <div className='mt-9 flex items-center justify-center gap-x-0.5'>
                    <Image
                        src='/imgs/others/triangle.png'
                        alt='triangle-icon'
                        width={30}
                        height={40}
                        className='h-5 w-4'
                    />
                    <p className='text-body-sm text-neutral-dark4'>{intl.format(credits_amount)} monthly credits</p>
                </div>
                <Button
                    variant={isFree ? 'outline' : 'fill'}
                    size='md'
                    textSize='md'
                    href='/signup'
                    queryParams={{ cta_widget: 'plan-list-section' }}
                    color={isFree ? 'white' : 'primary'}
                    className={`mt-5 w-full ${
                        isFree ? 'text-neutral-dark4 border-neutral-light3' : ''
                    } ${disabled ? 'pointer-events-none' : ''}`}
                >
                    Select Plan
                </Button>
            </div>
            <div className='bg-neutral-light4 my-9 h-[1px] w-full' />
            <ul className='flex flex-col gap-4'>
                {features.map((feature) => (
                    <li key={feature} className='text-label-md text-neutral-dark4 flex items-start gap-2'>
                        <Icon icon='solar:check-circle-outline' color='neutral-dark4' className='size-5 shrink-0' />
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlanCard;
