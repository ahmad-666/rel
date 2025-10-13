import { type ReactNode } from 'react';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import Mui from '@/providers/Mui';
import AuthLayout from '@auth/layout';
import checkUserAuth from '@auth/utils/check-auth';
import './styles.css'; //? current layout specific styles(besides globals.css that we add in root layout)

type Props = {
    children: ReactNode;
};
export const metadata: Metadata = {
    title: {
        template: '%s | Reverse Email Lookup',
        default: 'Authentication | Reverse Email Lookup'
    }
};

export default async function Layout({ children }: Props) {
    const isLogin = await checkUserAuth();
    if (isLogin) redirect('/dashboard');

    return (
        <div id='auth'>
            <Mui>
                <AuthLayout>{children}</AuthLayout>
            </Mui>
        </div>
    );
}
