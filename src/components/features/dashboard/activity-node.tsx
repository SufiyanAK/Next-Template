'use client';

import { colors } from '@/utils/customStyles';
import { Box, Group, Text, ActionIcon } from '@mantine/core';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Mail, Settings, X } from 'lucide-react';

export interface ActivityNodeData extends Record<string, unknown> {
    label: string;
    description?: string;
    activityType: string;
    config?: any;
    onConfigClick?: () => void;
    onDeleteClick?: () => void;
}

const ActivityNode = (props: NodeProps) => {
    const { data, selected } = props;
    const nodeData = data as ActivityNodeData;
    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'read-email':
                return Mail;
            default:
                return Mail;
        }
    };

    const getActivityColor = (type: string) => {
        switch (type) {
            case 'read-email':
                return colors.primary;
            default:
                return colors.primary;
        }
    };

    const Icon = getActivityIcon(nodeData.activityType);
    const activityColor = getActivityColor(nodeData.activityType);

    return (
        <Box
            style={{
                backgroundColor: colors.white,
                border: selected
                    ? `2px solid ${activityColor}`
                    : `1px solid ${colors.tertiary}`,
                borderRadius: '8px',
                padding: '12px',
                minWidth: '200px',
                boxShadow: selected
                    ? `0 4px 12px ${activityColor}20`
                    : '0 2px 8px rgba(0,0,0,0.1)',
                position: 'relative'
            }}
        >
            {/* Input Handle */}
            <Handle
                type="target"
                position={Position.Top}
                style={{
                    background: colors.tertiary,
                    border: `2px solid ${colors.white}`,
                    width: '12px',
                    height: '12px'
                }}
            />

            {/* Node Header */}
            <Group justify="space-between" align="flex-start" mb={8}>
                <Group gap={8}>
                    <Box
                        style={{
                            padding: '6px',
                            backgroundColor: `${activityColor}15`,
                            borderRadius: '4px'
                        }}
                    >
                        <Icon size={16} color={activityColor} />
                    </Box>
                    <Box>
                        <Text size="sm" fw={500} c={colors.textPrimary}>
                            {nodeData.label}
                        </Text>
                        {nodeData.description && (
                            <Text size="xs" c={colors.textSecondary} lineClamp={1}>
                                {nodeData.description}
                            </Text>
                        )}
                    </Box>
                </Group>

                {/* Action Buttons */}
                <Group gap={4}>
                    {nodeData.onConfigClick && (
                        <ActionIcon
                            size="xs"
                            variant="subtle"
                            color="gray"
                            onClick={(e) => {
                                e.stopPropagation();
                                nodeData.onConfigClick?.();
                            }}
                        >
                            <Settings size={12} />
                        </ActionIcon>
                    )}
                    {nodeData.onDeleteClick && (
                        <ActionIcon
                            size="xs"
                            variant="subtle"
                            color="red"
                            onClick={(e) => {
                                e.stopPropagation();
                                nodeData.onDeleteClick?.();
                            }}
                        >
                            <X size={12} />
                        </ActionIcon>
                    )}
                </Group>
            </Group>

            {/* Configuration Status */}
            {nodeData.config && Object.keys(nodeData.config).length > 0 && (
                <Box
                    style={{
                        backgroundColor: colors.background,
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: `1px solid ${colors.tertiary}`
                    }}
                >
                    <Text size="xs" c={colors.textSecondary}>
                        Configured
                    </Text>
                </Box>
            )}

            {/* Output Handle */}
            <Handle
                type="source"
                position={Position.Bottom}

                style={{
                    background: activityColor,
                    border: `2px solid ${colors.white}`,
                    width: '12px',
                    height: '12px'
                }}
            />
        </Box>
    );
};

export default ActivityNode;