'use client';

import DashboardToolbarComponent from '@/components/features/dashboard/dashboard-toolbar';
import { DashboardProvider, useDashboard } from '@/contexts/dashboard-context';
import { Box } from '@mantine/core';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const DashboardLayoutContent = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const { onSaveProcess, isSaving, onPublishProcess, isPublishing } = useDashboard();

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
                onSave={onSaveProcess}
                isSaving={isSaving}
                onPublish={onPublishProcess}
                isPublishing={isPublishing}
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
        <DashboardProvider>
            <DashboardLayoutContent>
                {children}
            </DashboardLayoutContent>
        </DashboardProvider>
    );
};

export default DashboardRootLayout;