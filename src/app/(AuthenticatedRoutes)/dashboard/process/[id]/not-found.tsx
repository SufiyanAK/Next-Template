'use client';

import { colors } from '@/utils/customStyles';
import { Box, Button, Container, Paper, Stack, Text } from '@mantine/core';
import { FileQuestion, ArrowLeft, Home, FolderOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProcessIdNotFoundPage = () => {
    const router = useRouter();

    return (
        <Box
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.background,
                padding: '24px'
            }}
        >
            <Container size="sm">
                <Paper
                    shadow="sm"
                    radius={12}
                    p={40}
                    style={{
                        border: `1px solid ${colors.tertiary}`,
                        textAlign: 'center'
                    }}
                >
                    <Stack align="center" gap={24}>
                        {/* Icon */}
                        <Box
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                backgroundColor: `${colors.secondary}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <FileQuestion size={50} color={colors.secondary} />
                        </Box>

                        {/* Title */}
                        <Stack gap={12} align="center">
                            <Text size="32px" fw={700} c={colors.textPrimary}>
                                404 - Process Not Found
                            </Text>
                            <Text size="lg" c={colors.textSecondary} style={{ maxWidth: '500px' }}>
                                We couldn&apos;t find the process you&apos;re looking for. It may have been moved, deleted, or never existed.
                            </Text>
                        </Stack>

                        {/* Description */}
                        <Box
                            p={16}
                            style={{
                                backgroundColor: `${colors.light}20`,
                                borderRadius: '8px',
                                width: '100%'
                            }}
                        >
                            <Stack gap={8}>
                                <Text size="sm" fw={600} c={colors.textPrimary}>
                                    What you can do:
                                </Text>
                                <Stack gap={4}>
                                    <Text size="sm" c={colors.textSecondary}>
                                        • Check if the process ID in the URL is correct
                                    </Text>
                                    <Text size="sm" c={colors.textSecondary}>
                                        • Browse your recent processes to find the right one
                                    </Text>
                                    <Text size="sm" c={colors.textSecondary}>
                                        • Create a new process if needed
                                    </Text>
                                    <Text size="sm" c={colors.textSecondary}>
                                        • Contact support if you believe this is an error
                                    </Text>
                                </Stack>
                            </Stack>
                        </Box>

                        {/* Action Buttons */}
                        <Stack gap={12} style={{ width: '100%', maxWidth: '400px' }}>
                            <Button
                                size="lg"
                                radius={8}
                                fullWidth
                                bg={colors.primary}
                                leftSection={<FolderOpen size={20} />}
                                onClick={() => router.push('/projects/recent')}
                            >
                                View Recent Processes
                            </Button>
                            <Button
                                size="lg"
                                radius={8}
                                fullWidth
                                variant="light"
                                color={colors.primary}
                                leftSection={<Home size={20} />}
                                onClick={() => router.push('/home')}
                            >
                                Go to Home
                            </Button>
                            <Button
                                size="lg"
                                radius={8}
                                fullWidth
                                variant="outline"
                                c={colors.textSecondary}
                                style={{ borderColor: colors.light }}
                                leftSection={<ArrowLeft size={20} />}
                                onClick={() => router.back()}
                            >
                                Go Back
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default ProcessIdNotFoundPage;
