import Image from 'next/image';
import { type StatisticsItem } from '@landing/types';

//* Types ----------------------------
type Props = {
    items?: StatisticsItem[];
    className?: string;
    titleClassName?: string;
    valueClassName?: string;
};

//* Constants ------------------------
const defaultItems: StatisticsItem[] = [
    {
        title: 'Year Founded',
        value: '2018',
        icon: '/imgs/other-pages/about-us/statistic-1.svg',
        className: 'tablet:-rotate-4'
    },
    {
        title: 'Team Members',
        value: '+30',
        icon: '/imgs/other-pages/about-us/statistic-2.svg',
        className: 'tablet:rotate-4'
    },
    {
        title: 'Happy Customers',
        value: '5K',
        icon: '/imgs/other-pages/about-us/statistic-3.svg',
        className: 'tablet:-rotate-4'
    }
];

//* Component -------------------------
const Statistics = ({ items = defaultItems, className = '', titleClassName = '', valueClassName = '' }: Props) => {
    const iconBgColor = ['bg-pastelPink-light3', 'bg-info-light2 ', 'bg-warning-light2'];
    return (
        <div className={`flex flex-col items-center ${className}`}>
            <ul className='mobile:flex-row tablet:gap-5 flex w-full max-w-[720px] flex-col gap-3'>
                {items.map((item, index) => (
                    <li key={item.title} className={`w-full ${item.className}`}>
                        <div className='flex h-full w-full flex-col items-center rounded-xl bg-white p-7 shadow-sm'>
                            <div className={`rounded-xl p-2.5 ${iconBgColor[index % iconBgColor.length]}`}>
                                <Image src={item.icon} alt={item.title} width={24} height={24} />
                            </div>
                            <p className={`text-headline-sm text-neutral-dark4 mt-2 text-center ${valueClassName}`}>
                                {item.value}
                            </p>
                            <p className={`text-body-sm text-neutral text-center ${titleClassName}`}>{item.title}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className='mt-16 max-w-[620px]'>
                <div className='relative mx-auto w-fit'>
                    <Image
                        src='/imgs/others/arrow.png'
                        alt='arrow-icon'
                        width={160}
                        height={160}
                        quality={100}
                        loading='lazy'
                        className='absolute -top-7 -left-10 h-auto w-22 scale-y-[-1] object-cover'
                    />
                    <p className='text-title-lg text-neutral-dark5'>🚀 Our Mission 🚀</p>
                </div>
                <p className='text-headline-sm text-neutral-dark4 mt-12 text-start'>
                    “ Help businesses of all sizes access reliable contact data without wasting credits or budget “
                </p>
                <p className='text-body-md text-neutral mt-6 text-start'>
                    At Reverse Email Lookup, we believe that finding out who’s behind an email address shouldn’t be
                    complicated, expensive, or risky. We’re a small, focused team with a big mission.
                </p>
            </div>
        </div>
    );
};

export default Statistics;
