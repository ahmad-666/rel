import { type ReactNode } from 'react';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import Mui from '@/providers/Mui';
import DashboardLayout from '@dashboard/layout';
import Logger from '@dashboard/components/Logger';
import checkUserAuth from '@auth/utils/check-auth';
// import envs from '@/configs/env';;
import './styles.css'; //? current layout specific styles(besides globals.css that we add in root layout)

type Props = {
    children: ReactNode;
};

export const metadata: Metadata = {
    title: {
        template: '%s | Reverse Email Lookup',
        default: 'Dashboard | Reverse Email Lookup'
    }
};

export default async function Layout({ children }: Props) {
    const isLogin = await checkUserAuth();
    if (!isLogin) redirect('/login');

    return (
        <div id='dashboard'>
            <Logger />
            <Mui>
                <DashboardLayout>{children}</DashboardLayout>
            </Mui>
        </div>
    );
}
