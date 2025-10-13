import { DurationType } from '@landing/types/plan';

//* Types -----------------------------
type Props = {
    value: DurationType;
    onChange: (newVal: DurationType) => void;
    className?: string;
};

//* Component -------------------------
const DurationButtons = ({ value, onChange, className = '' }: Props) => {
    const isAnnual = value === DurationType.YEARLY;
    return (
        <div className={`${className}`}>
            <div className='flex items-center justify-center gap-3'>
                <span className={`text-label-lg ${!isAnnual ? 'text-neutral-dark4' : 'text-neutral-dark1'}`}>
                    Monthly
                </span>
                <button
                    aria-label='Toggle duration'
                    type='button'
                    onClick={() => onChange(isAnnual ? DurationType.MONTHLY : DurationType.YEARLY)}
                    className={`bg-primary relative h-4 w-8 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none`}
                >
                    <span
                        className={`absolute top-0.5 left-0.5 size-3 rounded-full bg-white shadow transition-transform duration-200 ${isAnnual ? 'translate-x-4' : 'translate-x-0'}`}
                    />
                </button>
                <span className={`text-label-lg ${isAnnual ? 'text-neutral-dark4' : 'text-neutral-dark1'}`}>
                    Annual
                </span>
            </div>
            <p className='text-body-sm text-primary mt-3'>(Pay annual and save 30%)</p>
        </div>
    );
};
export default DurationButtons;
