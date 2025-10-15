'use client';

import { colors } from '@/utils/customStyles';
import { Box, Button, Group } from '@mantine/core';
import { Play, Save, Upload } from 'lucide-react';

const DashboardToolbarComponent = () => {
    // const breadcrumbItems = [
    //     { title: 'Projects', href: '/home' },
    //     { title: 'Invoice Processing', href: '/projects/invoice-processing' },
    //     { title: 'Main Flow', href: '#' }
    // ];

    return (
        <Box
            px={20}
            py={10}
            style={{
                borderBottom: `1px solid ${colors.tertiary}`,
                backgroundColor: colors.white
            }}
        >
            <Group justify="center">
                {/* Breadcrumb Navigation */}
                {/* <Group gap={8}>
                        <Breadcrumbs
                            separator={<ChevronRight size={14} color={colors.textSecondary} />}
                            separatorMargin="xs"
                        >
                            {breadcrumbItems.map((item, index) => (
                                <Anchor
                                    key={index}
                                    href={item.href}
                                    size="sm"
                                    c={index === breadcrumbItems.length - 1 ? colors.textPrimary : colors.textSecondary}
                                    fw={index === breadcrumbItems.length - 1 ? 500 : 400}
                                    underline="never"
                                >
                                    {item.title}
                                </Anchor>
                            ))}
                        </Breadcrumbs>
                    </Group> */}

                {/* Action Buttons */}
                <Group gap={12}>
                    <Button
                        variant="filled"
                        size="md"
                        radius={6}
                        leftSection={<Save size={18} />}
                        bg={colors.primary}
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
                        Saved
                    </Button>

                    <Button
                        variant="filled"
                        size="md"
                        radius={6}
                        leftSection={<Play size={18} />}
                        bg={colors.green}
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
                        Publish
                    </Button>
                </Group>
            </Group>
        </Box>
    );
};

export default DashboardToolbarComponent;