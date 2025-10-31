'use client';

import { colors } from '@/utils/customStyles';
import { Box, Button, Container, Paper, Stack, Text } from '@mantine/core';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProcessNotFoundPage = () => {
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
                                backgroundColor: `${colors.primary}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <AlertCircle size={50} color={colors.primary} />
                        </Box>

                        {/* Title */}
                        <Stack gap={12} align="center">
                            <Text size="32px" fw={700} c={colors.textPrimary}>
                                Process Not Found
                            </Text>
                            <Text size="lg" c={colors.textSecondary} style={{ maxWidth: '500px' }}>
                                The process you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to access it.
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
                                    Possible reasons:
                                </Text>
                                <Stack gap={4}>
                                    <Text size="sm" c={colors.textSecondary}>
                                        • The process ID is missing or invalid
                                    </Text>
                                    <Text size="sm" c={colors.textSecondary}>
                                        • The process has been deleted
                                    </Text>
                                    <Text size="sm" c={colors.textSecondary}>
                                        • You don&apos;t have access to this process
                                    </Text>
                                    <Text size="sm" c={colors.textSecondary}>
                                        • The URL is incomplete or incorrect
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

export default ProcessNotFoundPage;
