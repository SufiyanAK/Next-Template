'use client';

import { colors } from '@/utils/customStyles';
import {
    Box,
    Group,
    Stack,
    Text
} from '@mantine/core';
import {
    Mail,
    Reply,
    StretchHorizontal
} from 'lucide-react';
import ReplyEmailProperties from './properties/reply-email-properties';
import ReadEmailProperties from './properties/read-email-properties';
import ERPConfigProperties from './properties/erp-config-properties';


interface SelectedNode {
    id: string;
    type: string;
    label: string;
    data: {
        label: string;
        activityType: string;
        [key: string]: any;
    };
}

interface DashboardRightPropertiesPanelComponentProps {
    selectedNode?: SelectedNode | null;
}

const DashboardRightPropertiesPanelComponent = ({ selectedNode }: DashboardRightPropertiesPanelComponentProps) => {
    const isReplyEmail = selectedNode?.data?.activityType === 'reply-email';
    const isReadEmail = selectedNode?.data?.activityType === 'read-email';
    const isERPConfig = selectedNode?.data?.activityType === 'erp-config';

    const getIcon = (node: string) => {
        switch (node) {
            case 'reply-email':
                return Reply;
            case 'read-email':
                return Mail;
            case 'erp-config':
                return StretchHorizontal;
        }
    }

    const Icon = getIcon(selectedNode?.data?.activityType || '');

    // Render nothing if no node is selected
    if (!selectedNode) {
        return (
            <Box
                style={{
                    width: '320px',
                    height: '100%',
                    borderLeft: `1px solid ${colors.tertiary}`,
                    backgroundColor: colors.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 16
                }}
            >
                <Text size="sm" c={colors.textSecondary} ta="center">
                    Select an activity to view properties
                </Text>
            </Box>
        );
    }

    return (
        <Box
            style={{
                width: '320px',
                height: '100%',
                borderLeft: `1px solid ${colors.tertiary}`,
                backgroundColor: colors.white,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Selected Activity Header */}
            <Box p={16} style={{ borderBottom: `1px solid ${colors.tertiary}` }}>
                <Group gap={12}>
                    <Box
                        style={{
                            padding: '8px',
                            backgroundColor: `${colors.primary}`,
                            borderRadius: '6px'
                        }}
                    >
                        {Icon && <Icon size={20} color={colors.white} />}
                    </Box>
                    <Stack gap={2}>
                        <Text fw={600} size="sm" c={colors.textPrimary}>
                            {selectedNode.data.label}
                        </Text>
                        <Text size="xs" c={colors.textSecondary}>
                            {selectedNode.data.description || 'Activity properties'}
                        </Text>
                    </Stack>
                </Group>
            </Box>

            {/* Properties Content */}
            <Box flex={1} style={{ overflowY: 'auto' }}>
                {isReplyEmail && <ReplyEmailProperties />}
                {isReadEmail && <ReadEmailProperties />}
                {isERPConfig && <ERPConfigProperties />}

                {!isReplyEmail && !isReadEmail && !isERPConfig && (
                    <Stack gap={16} p={16}>
                        <Text size="xs" c={colors.textSecondary}>
                            Properties for this activity type coming soon
                        </Text>
                    </Stack>
                )}
            </Box>
        </Box>
    );
};

export default DashboardRightPropertiesPanelComponent;