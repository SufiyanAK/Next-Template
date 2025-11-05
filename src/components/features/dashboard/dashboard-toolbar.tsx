'use client';

import { colors } from '@/utils/customStyles';
import { Box, Button, Group, Text } from '@mantine/core';
import { Play, Save, Upload, Mail, Workflow } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDashboard } from '@/contexts/dashboard-context';

interface DashboardToolbarComponentProps {
    activeTab: string;
    onSave?: () => void;
    onRun?: () => void;
    onPublish?: () => void;
    isSaving?: boolean;
    isPublishing?: boolean;
}

const DashboardToolbarComponent = ({
    activeTab,
    onSave,
    onRun,
    onPublish,
    isSaving = false,
    isPublishing = false
}: DashboardToolbarComponentProps) => {
    const router = useRouter();
    const { currentProcessId } = useDashboard();

    const handleTabClick = (tab: string) => {
        if (tab === 'accounts') {
            router.push('/dashboard/accounts');
        } else if (tab === 'process') {
            // If we have a current process ID, navigate to it, otherwise go to base process route
            const route = currentProcessId
                ? `/dashboard/process/${currentProcessId}`
                : '/dashboard/process';
            router.push(route);
        }
    };
    return (
        <Box
            px={20}
            py={10}
            style={{
                borderBottom: `1px solid ${colors.tertiary}`,
                backgroundColor: colors.white
            }}
        >
            <Group justify="space-between">
                {/* Custom Tabs */}
                <Group gap={0}>
                    <Box
                        onClick={() => handleTabClick('accounts')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '12px 20px',
                            borderBottom: activeTab === 'accounts' ? `2px solid ${colors.primary}` : '2px solid transparent',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            color: activeTab === 'accounts' ? colors.primary : colors.textSecondary,
                            transition: 'all 0.2s ease',
                            ':hover': {
                                color: colors.primary,
                                backgroundColor: `${colors.primary}08`,
                            }
                        }}
                        onMouseEnter={(e) => {
                            if (activeTab !== 'accounts') {
                                e.currentTarget.style.color = colors.primary;
                                e.currentTarget.style.backgroundColor = `${colors.primary}08`;
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (activeTab !== 'accounts') {
                                e.currentTarget.style.color = colors.textSecondary;
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }
                        }}
                    >
                        <Mail size={18} />
                        <Text size="sm" fw={500}>
                            Accounts
                        </Text>
                    </Box>

                    <Box
                        onClick={() => handleTabClick('process')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '12px 20px',
                            borderBottom: activeTab === 'process' ? `2px solid ${colors.primary}` : '2px solid transparent',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            color: activeTab === 'process' ? colors.primary : colors.textSecondary,
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            if (activeTab !== 'process') {
                                e.currentTarget.style.color = colors.primary;
                                e.currentTarget.style.backgroundColor = `${colors.primary}08`;
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (activeTab !== 'process') {
                                e.currentTarget.style.color = colors.textSecondary;
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }
                        }}
                    >
                        <Workflow size={18} />
                        <Text size="sm" fw={500}>
                            Process
                        </Text>
                    </Box>
                </Group>

                {/* Action Buttons - Only show when Process tab is active */}
                {activeTab === 'process' && (
                    <Group gap={12}>
                        <Button
                            variant="filled"
                            size="md"
                            radius={6}
                            leftSection={<Save size={18} />}
                            bg={colors.primary}
                            onClick={onSave}
                            loading={isSaving}
                            disabled={isSaving}
                            styles={{
                                label: {
                                    fontSize: '14px',
                                    fontWeight: 500,
                                },
                                section: {
                                    marginRight: 6
                                }
                            }}
                        >
                            {isSaving ? 'Saving...' : 'Save'}
                        </Button>

                        <Button
                            variant="filled"
                            size="md"
                            radius={6}
                            leftSection={<Play size={18} />}
                            bg={colors.green}
                            onClick={onRun}
                            styles={{
                                label: {
                                    fontSize: '14px',
                                    fontWeight: 500,
                                },
                                section: {
                                    marginRight: 6
                                }
                            }}
                        >
                            Run
                        </Button>

                        <Button
                            variant="filled"
                            size="md"
                            radius={6}
                            leftSection={<Upload size={18} />}
                            bg={colors.textPrimary}
                            onClick={onPublish}
                            loading={isPublishing}
                            disabled={isPublishing}
                            styles={{
                                label: {
                                    fontSize: '14px',
                                    fontWeight: 500,
                                },
                                section: {
                                    marginRight: 6
                                }
                            }}
                        >
                            {isPublishing ? 'Publishing...' : 'Publish'}
                        </Button>
                    </Group>
                )}
            </Group>
        </Box>
    );
};

export default DashboardToolbarComponent;