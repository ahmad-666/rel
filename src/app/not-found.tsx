import { type Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import Navbar from '@/layout/components/Navbar';

export const metadata: Metadata = {
    title: 'Not Found | Reverse Email Lookup',
    description: 'Not Found | Reverse Email Lookup'
};

// not-found does not accept any props and by default its a server-component so we can use metadata on it
// We can go to this route if we enter invalid url or manually call --> notFound() from 'next/navigation'
export default function NotFound() {
    return (
        <div>
            <Navbar />
            <main>
                <div className='bg-primary-light5 flex min-h-screen w-full flex-col items-center justify-center bg-[url("/imgs/patterns/grid.png")] bg-contain bg-no-repeat'>
                    <h1 className='text-display-lg text-neutral-dark4 text-center'>404</h1>
                    <h3 className='text-neutral-dark4 text-headline-lg mt-3 text-center'>Page not found</h3>
                    <p className='text-neutral text-body-lg mt-8 text-center'>
                        Sorry, we can’t find the page you are looking for
                    </p>
                    <Link href='/' className='mx-auto mt-6'>
                        <Button
                            variant='fill'
                            size='sm'
                            color='white'
                            className='!text-neutral-dark4 !border-neutral-light2 border border-solid'
                        >
                            Go to Home
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
