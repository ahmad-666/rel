import Image from 'next/image';

//* Types -----------------------------
type Props = {
    work?: string;
    title?: string;
    userImageSrc?: string;
    username: string;
    description: string;
    avatarBgClassName?: string;
    className?: string;
};

//* Component -------------------------
const ReviewCard = ({
    work,
    username,
    avatarBgClassName = 'bg-primary-light5',
    description,
    userImageSrc,
    className = ''
}: Props) => {
    return (
        <div className={`flex h-full flex-col rounded-xl bg-white p-5 shadow-md ${className}`}>
            <div className='flex items-center gap-x-3'>
                {!!userImageSrc ? (
                    <Image
                        src={userImageSrc}
                        alt={username}
                        width={160}
                        height={160}
                        loading='lazy'
                        className='rounded-circle tablet:size-20 size-14'
                    />
                ) : (
                    <div
                        className={`rounded-circle text-title-lg text-neutral-dark4 tablet:size-20 flex size-14 items-center justify-center ${avatarBgClassName}`}
                    >
                        {username.charAt(0)}
                    </div>
                )}
                <div>
                    <p className='text-title-lg text-neutral-dark4'>{username}</p>
                    {!!work && <p className='text-label-lg text-neutral mt-2'>{work}</p>}
                </div>
            </div>
            <p className='text-body-md text-neutral mt-9'>{description}</p>
        </div>
    );
};

export default ReviewCard;
