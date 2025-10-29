'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DashboardScreen = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to accounts by default
        router.replace('/dashboard/accounts');
    }, [router]);

    return null; // This component just redirects
};

export default DashboardScreen;