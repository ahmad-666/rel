import { type Metadata } from 'next';
import Box from '@mui/material/Box';
import Signup from '@auth/components/Signup';

export const metadata: Metadata = {
    title: 'Signup'
};

export default function SignupPage() {
    return (
        <Box width={360} maxWidth='90vw' mx='auto'>
            <Signup />
        </Box>
    );
}
