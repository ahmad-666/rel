import Link from 'next/link';
import Icon from '@/components/Icon';
import { EmailLookup } from '@landing/types/service';
import { type EmailLookupSocialMedia } from '@landing/types/form';

//* Types -----------------------------
type Props = {
    data: EmailLookup;
    socialMedia: EmailLookupSocialMedia;
};

//* Component -------------------------
const SocialMediaLinks = ({ data, socialMedia }: Props) => (
    <div className='flex items-center gap-x-3'>
        {Object.entries(socialMedia).map(([key, { get, icon }]) => {
            const value = get(data);
            if (!value) return null;
            return (
                <Link
                    target='_blank'
                    href={
                        key === 'website' ? (value.startsWith('http') ? value : `https://${value}`) : `https://${value}`
                    }
                    rel='noopener noreferrer'
                    key={key}
                >
                    <Icon icon={icon} width={20} height={20} color='neutral-dark4' />
                </Link>
            );
        })}
    </div>
);
export default SocialMediaLinks;
