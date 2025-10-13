import Image from 'next/image';
import { EmailLookup } from '@landing/types/service';
import { type EmailLookupInfo } from '@landing/types/form';

//* Types -----------------------------
type Props = {
    data: EmailLookup;
    infoItems: EmailLookupInfo;
};

//* Component -------------------------
const InfoGrid = ({ data, infoItems }: Props) => (
    <div className='mobile:grid-cols-2 laptop:grid-cols-3 grid grid-cols-1 gap-x-12 gap-y-7 pt-5'>
        {Object.entries(infoItems).map(([key, { title, get }]) => {
            const value = get(data);
            return (
                <div key={key} className='flex flex-col items-start gap-y-1'>
                    <p className='text-body-sm text-neutral'>{title}</p>
                    {value ? (
                        Array.isArray(value) ? (
                            <p className='text-label-lg text-neutral-dark4 line-clamp-3 pb-[1.5px]'>
                                {value.join(', ')}
                            </p>
                        ) : (
                            <p className='text-label-lg text-neutral-dark4 line-clamp-3 pb-[1.5px]'>{value}</p>
                        )
                    ) : (
                        <Image
                            src='/imgs/others/no-result-blur.png'
                            alt='no-result-blur'
                            width={100}
                            height={30}
                            className='-ml-2 h-8 w-32'
                            loading='lazy'
                            priority={false}
                        />
                    )}
                </div>
            );
        })}
    </div>
);

export default InfoGrid;
