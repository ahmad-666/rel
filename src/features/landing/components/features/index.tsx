import Button from '@/components/Button';
import Badge from '@/components/Badge';
import FeatureCard from '@landing/components/features/FeatureCard';
import { type FeatureItem } from '@landing/types';

//* Types -----------------------------
type Props = {
    title: string;
    description?: string;
    featuresCardsItems?: FeatureItem[];
    showButton?: boolean;
    layout?: 'row' | 'col';
    showBadge?: boolean;
    badgeText: string;
    badgeColor: string;
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    listContainerClassName?: string;
};

//* Constants -------------------------
const defaultFeaturesCardsItems: FeatureItem[] = [
    {
        title: 'AI-Enhanced Matching',
        description: 'The best enrichment engine for finding domains with over 98% data accuracy. ',
        imageSrc: '/imgs/home/feature-1.png'
    },
    {
        title: 'Good for Small Businesses',
        description: 'Unlike other tools, we don’t price you out — our plans are startup-friendly, with zero fluff.',
        imageSrc: '/imgs/home/feature-2.png'
    },
    {
        title: ' No Credits Lost on Bad Data',
        description: 'If we can’t match the email, you don’t lose credits. Fair and square.',
        imageSrc: '/imgs/home/feature-3.png'
    },
    {
        title: 'Fast & Accurate',
        description: 'See results in seconds with high match rates and verified sources.',
        imageSrc: '/imgs/home/feature-4.png'
    }
];

//* Component -------------------------
const Features = ({
    title,
    description,
    featuresCardsItems = defaultFeaturesCardsItems,
    badgeText,
    badgeColor,
    layout = 'row',
    className = '',
    titleClassName = '',
    descriptionClassName = '',
    showButton = true,
    showBadge = true,
    listContainerClassName = ''
}: Props) => {
    const iconBgColorsClasses = ['bg-pastelPink-light3', 'bg-success-light2', 'bg-warning-light2', 'bg-info-light2'];
    return (
        <div className={`${className}`}>
            <div
                className={`flex flex-col justify-between gap-x-3 ${layout === 'row' ? 'laptop:flex-row laptop:items-center' : 'items-center'}`}
            >
                <div className='tablet:w-1/3 w-full'>
                    {showBadge && <Badge text={badgeText} color={badgeColor} />}
                    <h2
                        className={`text-headline-lg text-neutral-dark4 ${showBadge ? 'mt-3' : ''} ${layout === 'col' ? 'text-center' : ''} ${titleClassName}`}
                    >
                        {title}
                    </h2>
                    {!!description && (
                        <p className={`text-body-lg text-neutral mt-10 max-w-[360px] ${descriptionClassName}`}>
                            {description}
                        </p>
                    )}
                    {showButton && (
                        <Button
                            color='neutral-dark4'
                            href='/signup'
                            size='md'
                            queryParams={{
                                cta_widget: 'features-section'
                            }}
                            className='mt-10'
                        >
                            Try with 15 Free Credits
                        </Button>
                    )}
                </div>
                <ul
                    className={`${listContainerClassName} tablet:grid-cols-2 grid w-full grid-cols-1 ${layout === 'row' ? 'laptop:max-w-[660px] laptop:mt-0 mt-12 gap-6' : 'laptop:grid-cols-4 mt-12 gap-4'}`}
                >
                    {featuresCardsItems.map((item, index) => (
                        <li key={item.title}>
                            <FeatureCard
                                {...item}
                                iconContainerClassName={`${iconBgColorsClasses[index % iconBgColorsClasses.length]}`}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Features;
