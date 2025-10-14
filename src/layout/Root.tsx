import { type ReactNode } from 'react';
import Navbar from '@layout/components/Navbar';
import Footer from '@layout/components/footer/index';

//* Types -----------------------------
type LandingProps = {
    children: ReactNode;
    className?: string;
};

//* Component -------------------------
const Landing = ({ children, className = '' }: LandingProps) => {
    return (
        <div className={`${className}`}>
            {/* <Navbar /> */}
            <main className='mt-0 min-h-screen'>{children}</main>
            {/* <Footer /> */}
        </div>
    );
};

export default Landing;
