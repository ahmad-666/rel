import { type Metadata } from 'next';
import Box from '@mui/material/Box';
import ForgetPassword from '@auth/components/ForgetPassword';

export const metadata: Metadata = {
    title: 'Forget Password'
};

export default function ForgetPasswordPage() {
    return (
        <Box width={360} maxWidth='90vw' mx='auto'>
            <ForgetPassword />
        </Box>
    );
}
