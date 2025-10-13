import { type ReactNode } from 'react';
import { type Metadata } from 'next';
import Landing from '@/layout/Root';
import './styles.css'; //? current layout specific styles(besides globals.css that we add in root layout)

//
export const metadata: Metadata = {
    title: {
        template: '%s',
        default: ''
    }
};

const LandingLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div id='landing'>
            <Landing>{children}</Landing>
        </div>
    );
};

export default LandingLayout;