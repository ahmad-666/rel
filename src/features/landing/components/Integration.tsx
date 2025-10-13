import Image from 'next/image';
import Badge from '@/components/Badge';

//* Types -----------------------------
type Props = {
    title?: string;
    description?: string;
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
};

//* Component -------------------------
const Integration = ({
    title = 'Complete Integration, No Exceptions',
    description = 'Reverse Email Lookup empowers you with seamless CRM and MAP integrations that are not only efficient but also exceptionally quick',
    className = '',
    titleClassName = '',
    descriptionClassName = ''
}: Props) => {
    return (
        <div className={`text-center ${className}`}>
            <Badge text='Integration' color='error-dark4' />
            <h2 className={`text-headline-lg text-neutral-dark5 mx-auto mt-3 max-w-[400px] ${titleClassName}`}>
                {title}
            </h2>
            <p className={`text-body-md text-neutral mx-auto mt-8 max-w-[570px] ${descriptionClassName}`}>
                {description}
            </p>
            <Image
                src='/imgs/home/integrations.png'
                alt='integration'
                width={2200}
                height={1000}
                loading='lazy'
                className='laptop:-mt-50 tablet:-mt-36 mx-auto mt-8 h-auto w-full'
            />
        </div>
    );
};

export default Integration;
