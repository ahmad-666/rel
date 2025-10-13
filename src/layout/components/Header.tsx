import { ReactNode } from 'react';
import Container from '@/components/Container';

//* Types --------------------------
type HeaderProps = {
    title: ReactNode;
    description?: ReactNode;
    topChildren?: ReactNode;
    bottomChildren?: ReactNode;
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
};

//* Component -------------------------
const Header = ({
    title,
    description,
    topChildren,
    bottomChildren,
    className = '',
    titleClassName = '',
    descriptionClassName = ''
}: HeaderProps) => {
    return (
        <header
            className={`bg-primary-light5 laptop:pt-60 relative bg-[url('/imgs/patterns/grid.png')] bg-contain pt-40 pb-8 text-center ${className}`}
        >
            <Container>
                {!!topChildren && <div>{topChildren}</div>}
                <h1
                    className={`text-display-md text-neutral-dark4 mx-auto max-w-[760px] ${topChildren && 'mt-4'} ${titleClassName}`}
                >
                    {title}
                </h1>
                {!!description && (
                    <p
                        className={`text-body-lg text-neutral mx-auto mt-8 max-w-[700px] text-center ${descriptionClassName}`}
                    >
                        {description}
                    </p>
                )}
                {!!bottomChildren && <div>{bottomChildren}</div>}
            </Container>
        </header>
    );
};

export default Header;
