'use client';

import { useState } from 'react';
import DashboardLeftSidebarComponent from './processes/left-sidebar';
import MainCanvasComponent from './processes/main-canvas';
import DashboardRightPropertiesPanelComponent from './processes/right-properties-panel';
import { Group } from '@mantine/core';
import { ProcessActivityDetail } from '@/types/process.types';

interface ProcessTabComponentProps {
    onActivityConfig: (nodeId: string, activityType: string) => void;
    onNodesChange?: (nodes: any[]) => void;
    initialActivities?: ProcessActivityDetail[];
}

const ProcessTabComponent = ({ onActivityConfig, onNodesChange, initialActivities }: ProcessTabComponentProps) => {
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
            <MainCanvasComponent
                onActivityConfig={onActivityConfig}
                onNodeSelect={setSelectedNode}
                onNodesChange={onNodesChange}
                initialActivities={initialActivities}
            />

            {/* Right Properties Panel */}
            <DashboardRightPropertiesPanelComponent selectedNode={selectedNode} />
        </Group>
    );
};

export default ProcessTabComponent;