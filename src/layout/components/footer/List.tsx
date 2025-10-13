import Link from 'next/link';
import { type LinkItemType } from '@layout/components/footer/index';

//* Types -----------------------------
type Props = {
    title: string;
    description?: string;
    links?: LinkItemType[];
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
};

//* Component -------------------------
const FooterList = ({
    title,
    links,
    description,
    className = '',
    titleClassName = '',
    descriptionClassName = ''
}: Props) => {
    return (
        <div className={`${className}`}>
            <h5 className={`text-title-md text-neutral ${titleClassName}`}>{title}</h5>
            {!!description && (
                <p className={`text-body-sm tablet:mt-5 mt-3 text-white ${descriptionClassName}`}>{description}</p>
            )}
            {links && (
                <ul className='tablet:mt-5 tablet:gap-6 mt-3 flex flex-col gap-3'>
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                target={link.target}
                                href={link.href}
                                className='text-label-lg hover:text-neutral-light1 text-white transition-colors duration-150'
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FooterList;
