'use client';

import DashboardToolbarComponent from '@/components/features/dashboard/dashboard-toolbar';
import DashboardLeftSidebarComponent from '@/components/features/dashboard/left-sidebar';
import MainCanvasComponent from '@/components/features/dashboard/main-canvas';
import DashboardRightPropertiesPanelComponent from '@/components/features/dashboard/right-properties-panel';
import ReadEmailActivityComponent from '@/components/features/dashboard/read-email-activity-component';
import {
    Box,
    Group
} from '@mantine/core';
import { useState } from 'react';

const DashboardComponent = () => {
    const [readEmailModalOpened, setReadEmailModalOpened] = useState(false);

    const handleActivityConfig = (nodeId: string, activityType: string) => {
        if (activityType === 'read-email') {
            setReadEmailModalOpened(true);
        }
    };

    return (
        <Box style={{ height: 'calc(100vh - 66px)', display: 'flex', flexDirection: 'column' }}>
            {/* Dashboard Toolbar */}
            <DashboardToolbarComponent />

            {/* Main Dashboard Layout */}
            <Group
                gap={0}
                style={{
                    flex: 1,
                    height: '100%',
                    overflow: 'hidden'
                }}
            >
                {/* Left Sidebar - Activities */}
                <DashboardLeftSidebarComponent />

                {/* Main Canvas Area */}
                <MainCanvasComponent onActivityConfig={handleActivityConfig} />

                {/* Right Properties Panel */}
                <DashboardRightPropertiesPanelComponent />
            </Group>

            {/* Read Email Activity Modal */}
            <ReadEmailActivityComponent
                opened={readEmailModalOpened}
                onClose={() => setReadEmailModalOpened(false)}
            />
        </Box>
    );
};

export default DashboardComponent;