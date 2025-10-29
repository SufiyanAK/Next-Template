'use client';

import { useState } from 'react';
import DashboardLeftSidebarComponent from './processes/left-sidebar';
import MainCanvasComponent from './processes/main-canvas';
import DashboardRightPropertiesPanelComponent from './processes/right-properties-panel';
import { Group } from '@mantine/core';

interface ProcessTabComponentProps {
    onActivityConfig: (nodeId: string, activityType: string) => void;
}

const ProcessTabComponent = ({ onActivityConfig }: ProcessTabComponentProps) => {
    const [selectedNode, setSelectedNode] = useState<{ id: string; type: string; label: string; data: any } | null>(null);

    return (
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
            <MainCanvasComponent onActivityConfig={onActivityConfig} onNodeSelect={setSelectedNode} />

            {/* Right Properties Panel */}
            <DashboardRightPropertiesPanelComponent selectedNode={selectedNode} />
        </Group>
    );
};

export default ProcessTabComponent;