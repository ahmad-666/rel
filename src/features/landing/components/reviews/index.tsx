import Image from 'next/image';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import Container from '@/components/Container';
import ReviewCard from '@landing/components/reviews/ReviewCard';
import { type ReviewItem } from '@landing/types';

//* Types -----------------------------
type Props = {
    title?: string;
    className?: string;
    reviews?: ReviewItem[];
    titleClassName?: string;
};

//* constants -------------------------
const defaultReviews: ReviewItem[] = [
    {
        username: 'Michael T.',
        description:
            'We integrated ReverseEmailLookup.net into our outbound sales process, and it instantly improved our lead quality. Getting company and job title from just an email saved us hours every week.',
        work: 'Head of Sales at GrowthForge',
        userImageSrc: '/imgs/avatars/reviews/user-1.png'
    },
    {
        username: 'Lindsey R.',
        description:
            'As a recruiter, identifying the right candidates quickly is critical. This tool gives me full professional profiles from an email, including LinkedIn links. It’s a game-changer. ',
        work: 'Technical Recruiter at TalentLink',
        userImageSrc: '/imgs/avatars/reviews/user-2.png'
    },
    {
        username: 'James C.',
        description:
            'We use ReverseEmailLookup.net for investigating suspicious sign-ups and verifying email legitimacy. It’s a reliable and fast tool for enriching emails with contextual business data.',
        work: 'Security Analyst at SecureLayer',
        userImageSrc: '/imgs/avatars/reviews/user-3.png'
    },
    {
        username: 'Anita S.',
        description:
            'The API is clean, fast, and well-documented. It plugged right into our CRM enrichment flow, and the support team helped us customize it for bulk workflows. Highly recommended!',
        work: 'Backend Developer at DataLoop.io',
        userImageSrc: '/imgs/avatars/reviews/user-4.png'
    }
];

//* Component -------------------------
const Reviews = ({
    reviews = defaultReviews,
    title = 'See How Our Customers Achieve Better Results',
    className = '',
    titleClassName = ''
}: Props) => {
    return (
        <div className={`bg-neutral-light5 py-16 ${className}`}>
            {/* for shadow card overflow visible */}
            <Container className='!overflow-visible'>
                <div className='flex flex-col items-center justify-center'>
                    <Badge text='Success Stories' color='warning-dark5' />
                    <h2
                        className={`text-headline-lg text-neutral-dark4 mt-2 max-w-[460px] text-center ${titleClassName}`}
                    >
                        {title}
                    </h2>
                </div>
                <ul className='tablet:grid-cols-2 mt-12 grid grid-cols-1 gap-3'>
                    {reviews.map((review) => (
                        <li key={review.username} className='min-h-[260px]'>
                            <ReviewCard {...review} />
                        </li>
                    ))}
                </ul>
                <div className='bg-primary/15 laptop:flex-row mt-3 flex h-full flex-col items-center justify-between gap-9 rounded-xl px-8 py-6'>
                    <div className='laptop:flex-row flex flex-col items-center gap-3'>
                        <Image
                            src='/imgs/avatars/defaults/fill-primary.png'
                            alt='book'
                            width={160}
                            height={160}
                            className='size-20'
                        />
                        <span className='text-headline-lg text-primary'>[Your Turn...]</span>
                        <p className='text-title-lg text-neutral-dark4 text-center'>
                            You Could Be Our Next Success Story
                        </p>
                    </div>
                    <Button
                        variant='fill'
                        color='neutral-dark4'
                        href='/signup'
                        size='md'
                        queryParams={{ cta_widget: 'reviews-section' }}
                    >
                        Try with 15 Free Credits
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default Reviews;
