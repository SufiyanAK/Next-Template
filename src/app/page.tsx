'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { Box, Loader, Stack } from '@mantine/core';
import { colors } from '@/utils/customStyles';

export default function RootPage() {
    const router = useRouter();
    const { isAuthenticated, authToken } = useAppSelector((state) => state.authState);

    useEffect(() => {
        // Check for token in localStorage (for client-side)
        const storedToken = typeof window !== 'undefined'
            ? localStorage.getItem('QBotzAuthToken')
            : null;

        // If authenticated or has token, redirect to home
        if (isAuthenticated || authToken || storedToken) {
            router.replace('/home');
        } else {
            // Otherwise, redirect to login
            router.replace('/login');
        }
    }, [isAuthenticated, authToken, router]);

    // Show a loading spinner while redirecting
    return (
        <Box style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw'
        }}>
            <Stack align="center" gap={16}>
                <Loader size="lg" color={colors.primary} />
            </Stack>
        </Box>
    );
}
