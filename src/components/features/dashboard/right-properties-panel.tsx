'use client';

import { colors } from '@/utils/customStyles';
import {
    Box,
    Collapse,
    Group,
    NumberInput,
    Select,
    Stack,
    Switch,
    Text,
    UnstyledButton
} from '@mantine/core';
import {
    ChevronDown,
    Code,
    FileText,
    Mail,
    User
} from 'lucide-react';
import { useState } from 'react';

const DashboardRightPropertiesPanelComponent = () => {
    const [configExpanded, setConfigExpanded] = useState(true);
    const [outputExpanded, setOutputExpanded] = useState(true);

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
                        <Mail size={20} color={colors.white} />
                    </Box>
                    <Stack gap={2}>
                        <Text fw={600} size="sm" c={colors.textPrimary}>
                            Read Email
                        </Text>
                        <Text size="xs" c={colors.textSecondary}>
                            Process emails from inbox
                        </Text>
                    </Stack>
                </Group>
            </Box>

            {/* Properties Content */}
            <Box flex={1} style={{ overflowY: 'auto' }}>
                <Stack gap={24} p={16}>
                    {/* Configuration Properties */}
                    <Box style={{ border: `1px solid ${colors.tertiary}`, borderRadius: '6px' }}>
                        <UnstyledButton
                            onClick={() => setConfigExpanded(!configExpanded)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderBottom: configExpanded ? `1px solid ${colors.tertiary}` : 'none',
                            }}
                        >
                            <Group justify="space-between">
                                <Text fw={500} size="sm" c={colors.textPrimary}>
                                    Configuration Properties
                                </Text>
                                <ChevronDown
                                    size={16}
                                    color={colors.textSecondary}
                                    style={{
                                        transform: configExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                                        transition: 'transform 0.2s ease'
                                    }}
                                />
                            </Group>
                        </UnstyledButton>

                        <Collapse in={configExpanded}>
                            <Stack gap={16} p={16}>
                                {/* Limit Emails To */}
                                <Stack gap={6}>
                                    <Text size="xs" fw={500} c={colors.textPrimary}>
                                        Limit Emails To
                                    </Text>
                                    <NumberInput
                                        size="xs"
                                        min={1}
                                        defaultValue={11}
                                        styles={{
                                            input: {
                                                fontSize: '12px',
                                                borderColor: colors.tertiary
                                            }
                                        }}
                                    />
                                    <Text size="xs" c={colors.textSecondary}>
                                        Maximum number of emails to process
                                    </Text>
                                </Stack>

                                {/* Switches */}
                                <Stack gap={12}>
                                    <Group justify="space-between">
                                        <Text size="xs" c={colors.textPrimary}>Include Subfolders</Text>
                                        <Switch size="xs" defaultChecked />
                                    </Group>
                                    <Group justify="space-between">
                                        <Text size="xs" c={colors.textPrimary}>Unread Only</Text>
                                        <Switch size="xs" defaultChecked />
                                    </Group>
                                    <Group justify="space-between">
                                        <Text size="xs" c={colors.textPrimary}>With Attachments Only</Text>
                                        <Switch size="xs" defaultChecked />
                                    </Group>
                                </Stack>

                                {/* Importance */}
                                <Stack gap={6}>
                                    <Text size="xs" fw={500} c={colors.textPrimary}>
                                        Importance
                                    </Text>
                                    <Select
                                        size="xs"
                                        data={['Any', 'High', 'Normal', 'Low']}
                                        defaultValue="Any"
                                        styles={{
                                            input: {
                                                fontSize: '12px',
                                                borderColor: colors.tertiary
                                            }
                                        }}
                                    />
                                </Stack>

                                {/* Mark as Read */}
                                <Group justify="space-between">
                                    <Text size="xs" c={colors.textPrimary}>Mark as Read</Text>
                                    <Switch size="xs" defaultChecked />
                                </Group>
                            </Stack>
                        </Collapse>
                    </Box>

                    {/* Output Properties */}
                    <Box style={{ border: `1px solid ${colors.tertiary}`, borderRadius: '6px' }}>
                        <UnstyledButton
                            onClick={() => setOutputExpanded(!outputExpanded)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderBottom: outputExpanded ? `1px solid ${colors.tertiary}` : 'none',
                            }}
                        >
                            <Group justify="space-between">
                                <Text fw={500} size="sm" c={colors.textPrimary}>
                                    Output Properties
                                </Text>
                                <ChevronDown
                                    size={16}
                                    color={colors.textSecondary}
                                    style={{
                                        transform: outputExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                                        transition: 'transform 0.2s ease'
                                    }}
                                />
                            </Group>
                        </UnstyledButton>

                        <Collapse in={outputExpanded}>
                            <Stack gap={12} p={16}>
                                {/* Email Properties */}
                                <Stack gap={8}>
                                    <Group gap={8}>
                                        <Code size={16} color={colors.primary} />
                                        <Text size="sm" fw={500} c={colors.primary}>
                                            Email Properties
                                        </Text>
                                    </Group>

                                    <Stack gap={6} pl={22}>
                                        <Group justify="space-between">
                                            <Group gap={6}>
                                                <User size={16} color={colors.textSecondary} />
                                                <Text size="sm" c={colors.textPrimary}>Mail Subject</Text>
                                            </Group>
                                            <Text size="sm" c={colors.textSecondary}>String</Text>
                                        </Group>

                                        <Group justify="space-between">
                                            <Group gap={6}>
                                                <FileText size={16} color={colors.textSecondary} />
                                                <Text size="sm" c={colors.textPrimary}>Mail Body</Text>
                                            </Group>
                                            <Text size="sm" c={colors.textSecondary}>String</Text>
                                        </Group>

                                        <Group justify="space-between">
                                            <Group gap={6}>
                                                <User size={16} color={colors.textSecondary} />
                                                <Text size="sm" c={colors.textPrimary}>Sender Address</Text>
                                            </Group>
                                            <Text size="sm" c={colors.textSecondary}>String</Text>
                                        </Group>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Collapse>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default DashboardRightPropertiesPanelComponent;