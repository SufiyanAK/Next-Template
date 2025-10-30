'use client';

import DashboardToolbarComponent from '@/components/features/dashboard/dashboard-toolbar';
import { Box } from '@mantine/core';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const DashboardLayoutContent = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();

    // Determine active tab from pathname
    const getActiveTab = () => {
        if (pathname.includes('/accounts')) return 'accounts';
        if (pathname.includes('/process')) return 'process';
        return 'accounts'; // default
    };

    const activeTab = getActiveTab();

    return (
        <Box style={{ height: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column' }}>
            {/* Dashboard Toolbar with Tabs */}
            <DashboardToolbarComponent
                activeTab={activeTab}
            />

            {/* Tab Content */}
            <Box style={{ flex: 1, minHeight: 0 }}>
                {children}
            </Box>
        </Box>
    );
};

const DashboardRootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <DashboardLayoutContent>
            {children}
        </DashboardLayoutContent>
    );
};

export default DashboardRootLayout;