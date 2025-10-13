import { type ReactNode } from 'react';
import Icon from '@/components/Icon';

//* Title -----------------------------
type TitleProps = {
    children: ReactNode;
    className?: string;
};
const Title = ({ children, className = '' }: TitleProps) => {
    return (
        <div className={`mb-4 ${className}`}>
            <h2 className='text-headline-lg text-neutral-dark4'>{children}</h2>
        </div>
    );
};

//* Text Lg ---------------------------
type TextProps = {
    children: ReactNode;
    className?: string;
};
const Text = ({ children, className = '' }: TextProps) => {
    return (
        <div className={`${className}`}>
            <p className='text-body-lg text-neutral'>{children}</p>
        </div>
    );
};

//* Text Md Light ---------------------
type TextMdLightProps = {
    children: ReactNode;
    className?: string;
};
const TextMdLight = ({ children, className = '' }: TextMdLightProps) => {
    return (
        <div className={`${className}`}>
            <p className='text-body-md text-neutral'>{children}</p>
        </div>
    );
};

//* Text Md Dark ----------------------
type TextMdDarkProps = {
    children: ReactNode;
    className?: string;
};
const TextMdDark = ({ children, className = '' }: TextMdDarkProps) => {
    return (
        <div className={`${className}`}>
            <p className='text-body-md text-neutral-dark4 font-bold'>{children}</p>
        </div>
    );
};

//* List ------------------------------
type ListProps = {
    title?: string;
    items?: ReactNode[];
    icon?: string;
    className?: string;
    listClassName?: string;
};
const List = ({
    title = '',
    items = [],
    icon = 'streamline:check-square-solid',
    className = '',
    listClassName = ''
}: ListProps) => {
    return (
        <div className={`${title ? 'mt-6' : 'mt-4'} ${className}`}>
            {title && (
                <div className='mb-4 flex items-center gap-2'>
                    <Icon icon={icon} size='md' color='success' />
                    <h5 className='text-body-lg text-neutral font-bold'>{title}</h5>
                </div>
            )}
            {items.length > 0 && (
                <ul className={`${listClassName}`}>
                    {items.map((item, i) => (
                        <li
                            key={i}
                            className='text-body-lg text-neutral my-2 flex items-center pl-2 first:mt-0 last:mb-0'
                        >
                            <Icon icon='mdi:circle' size={7} color='neutral' className='me-3 shrink-0' />
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

//* Content ---------------------------
type ContentProps = {
    children: ReactNode;
    className?: string;
};
const Content = ({ children, className = '' }: ContentProps) => {
    return <div className={` ${className}`}>{children}</div>;
};

//* Exports ---------------------------
Content.List = List;
Content.Text = Text;
Content.Title = Title;
Content.TextMdDark = TextMdDark;
Content.TextMdLight = TextMdLight;
export default Content;
