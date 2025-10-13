import { type Metadata } from 'next';
import Box from '@mui/material/Box';
import Login from '@auth/components/Login';

export const metadata: Metadata = {
    title: 'Login'
};

export default function LoginPage() {
    return (
        <Box width={330} maxWidth='90vw' mx='auto'>
            <Login />
        </Box>
    );
}
