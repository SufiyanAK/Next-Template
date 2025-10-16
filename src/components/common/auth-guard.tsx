'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { Box, Loader, Stack, Text } from '@mantine/core';
import { colors } from '@/utils/customStyles';

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, authToken } = useAppSelector((state) => state.authState);

    // Define route types
    const publicRoutes = ['/login'];
    const protectedRoutes = ['/dashboard', '/home', '/projects'];

    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    useEffect(() => {
        // Check localStorage for token if Redux doesn't have it
        const localToken = typeof window !== 'undefined' ? localStorage.getItem('RPAAuthToken') : null;
        const hasValidToken = authToken || localToken;

        console.log('AuthGuard - Path:', pathname);
        console.log('AuthGuard - Is Authenticated:', isAuthenticated);
        console.log('AuthGuard - Has Token:', !!hasValidToken);
        console.log('AuthGuard - Is Protected Route:', isProtectedRoute);
        console.log('AuthGuard - Is Public Route:', isPublicRoute);

        // If user is not authenticated and trying to access protected route
        if (!hasValidToken && isProtectedRoute) {
            console.log('AuthGuard - Redirecting to login (no token, accessing protected route)');
            router.push('/login');
            return;
        }

        // If user is authenticated and trying to access public route (like login)
        if (hasValidToken && isPublicRoute) {
            console.log('AuthGuard - Redirecting to home (authenticated, accessing public route)');
            router.push('/home');
            return;
        }

    }, [authToken, isAuthenticated, pathname, router, isProtectedRoute, isPublicRoute]);

    // Show loading if we're checking authentication
    const localToken = typeof window !== 'undefined' ? localStorage.getItem('RPAAuthToken') : null;
    const hasValidToken = authToken || localToken;

    // If no token and trying to access protected route, show loading while redirecting
    if (!hasValidToken && isProtectedRoute) {
        return (
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <Stack align="center" gap={16}>
                    <Loader size="md" color={colors.primary} />
                    <Text size="sm" c={colors.textSecondary}>
                        Checking authentication...
                    </Text>
                </Stack>
            </Box>
        );
    }

    // If authenticated and trying to access public route, show loading while redirecting
    if (hasValidToken && isPublicRoute) {
        return (
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <Stack align="center" gap={16}>
                    <Loader size="md" color={colors.primary} />
                    <Text size="sm" c={colors.textSecondary}>
                        Redirecting...
                    </Text>
                </Stack>
            </Box>
        );
    }

    // Otherwise, render the children
    return <>{children}</>;
};

export default AuthGuard;