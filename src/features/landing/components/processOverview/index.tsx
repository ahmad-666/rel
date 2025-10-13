import Button from '@/components/Button';
import Badge from '@/components/Badge';
import Card from '@landing/components/processOverview/Card';
import { type ProcessOverviewItem } from '@landing/types';

//* Types -------------------------
type Props = {
    title?: string;
    description?: string;
    items?: ProcessOverviewItem[];
    className?: string;
    cardClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
};

//* Constants -------------------------
export const defaultCardsItems: ProcessOverviewItem[] = [
    {
        title: 'Upload Your Inputs',
        imgSrc: '/imgs/home/process-1.png'
    },
    {
        title: 'Get Full Profiles',
        imgSrc: '/imgs/home/process-2.png',
        imgClassName: 'translate-x-5'
    },
    {
        title: 'Download Results',
        imgSrc: '/imgs/home/process-3.png',
        imgClassName: '!w-40 mx-auto mb-8'
    }
];

//* Component -------------------------
const ProcessOverview = ({
    title = 'Simple 3-Step Process',
    description,
    items = defaultCardsItems,
    className = '',
    cardClassName = '',
    titleClassName = '',
    descriptionClassName = ''
}: Props) => {
    return (
        <div className={`${className} `}>
            <div className='text-center'>
                <Badge text='How It Works' color='pastelPink-dark4' />
                <h2 className={`text-headline-lg text-neutral-dark4 mt-3 ${titleClassName}`}>{title}</h2>
                {!!description && (
                    <p className={`text-body-md text-neutral-dark2 mt-10 ${descriptionClassName}`}>{description}</p>
                )}
            </div>
            <ul className='mobile:grid-cols-2 laptop:grid-cols-4 mt-10 grid grid-cols-1 gap-4'>
                {items.map((item, index) => (
                    <li key={item.title} className='h-full !min-h-64'>
                        <Card index={index} {...item} className={cardClassName} />
                    </li>
                ))}
                <li
                    key='try-yourself-in-action'
                    className='desktop:p-12 mobile:p-4 from-neutral-dark4 to-brown relative flex flex-col items-center justify-center gap-4 rounded-xl bg-gradient-to-r p-12'
                >
                    <h4 className='text-headline-sm max-w-40 text-center text-white'>Try Yourself in Action</h4>
                    <Button
                        href='/signup'
                        queryParams={{ cta_widget: 'process-overview-section' }}
                        className='mt-11 text-center'
                    >
                        Try with 15 Free Credits
                    </Button>
                </li>
            </ul>
        </div>
    );
};

export default ProcessOverview;
