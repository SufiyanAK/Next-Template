'use client';

import { MetaEnumProcessCategories } from '@/types/meta.types';
import { RecentProcess } from '@/types/process.types';
import { colors } from '@/utils/customStyles';
import { ActionIcon, Box, Collapse, Group, Loader, Paper, Stack, Text, UnstyledButton } from '@mantine/core';
import { ChevronRight, Clock, File, Folder, MoreHorizontal, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface RecentProjectCardComponentProps {
    categories: MetaEnumProcessCategories[];
    expandedCategories: { [key: number]: boolean };
    processesByCategory: { [categoryId: number]: RecentProcess[] };
    loadingCategories: { [categoryId: number]: boolean };
    onCategoryClick: (categoryId: number) => void;
    formatDate: (dateString: string) => string;
}

const RecentProjectCardComponent: FC<RecentProjectCardComponentProps> = ({
    categories,
    expandedCategories,
    processesByCategory,
    loadingCategories,
    onCategoryClick,
    formatDate
}) => {
    const router = useRouter();

    const handleProcessClick = (processId: string) => {
        router.push(`/dashboard/process/${processId}`);
    };

    return (
        <Box mt={32}>
            <Stack gap={16}>
                {categories.map((category) => {
                    const isExpanded = expandedCategories[category.id] || false;
                    const isLoading = loadingCategories[category.id] || false;
                    const processes = processesByCategory[category.id] || [];

                    return (
                        <Paper
                            key={category.id}
                            style={{
                                border: `1px solid ${colors.tertiary}`,
                                borderRadius: '8px',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Category Header */}
                            <UnstyledButton
                                onClick={() => onCategoryClick(category.id)}
                                style={{
                                    width: '100%',
                                    padding: '16px 20px',
                                    backgroundColor: colors.tertiary,
                                    borderBottom: isExpanded ? `1px solid ${colors.tertiary}` : 'none',
                                    transition: 'background-color 0.2s ease'
                                }}
                            >
                                <Group justify="space-between">
                                    <Group gap={12}>
                                        <Folder size={20} strokeWidth={3} color={colors.textPrimary} />
                                        <Text fw={600} c={colors.textPrimary}>
                                            {category.name}
                                        </Text>
                                    </Group>
                                    <Box
                                        style={{
                                            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.2s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '24px',
                                            height: '24px'
                                        }}
                                    >
                                        <ChevronRight size={20} strokeWidth={3} color={colors.textPrimary} />
                                    </Box>
                                </Group>
                            </UnstyledButton>

                            {/* Category Projects */}
                            <Collapse in={isExpanded}>
                                {isLoading ? (
                                    <Box
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '60px 20px',
                                            minHeight: '200px'
                                        }}
                                    >
                                        <Stack align="center" gap={20}>
                                            {/* Cute animated loader with sparkles */}
                                            <Box style={{ position: 'relative' }}>
                                                <Loader size="md" color={colors.primary} type="dots" />
                                                <Box
                                                    style={{
                                                        position: 'absolute',
                                                        top: -8,
                                                        left: -8,
                                                        animation: 'sparkle 1.5s ease-in-out infinite'
                                                    }}
                                                >
                                                    <Sparkles size={14} color={colors.secondary} />
                                                </Box>
                                                <Box
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: -8,
                                                        right: -8,
                                                        animation: 'sparkle 1.5s ease-in-out infinite 0.5s'
                                                    }}
                                                >
                                                    <Sparkles size={12} color={colors.primary} />
                                                </Box>
                                            </Box>
                                            <Text size="sm" c={colors.textSecondary}>
                                                Loading processes...
                                            </Text>
                                        </Stack>
                                        <style jsx global>{`
                                            @keyframes sparkle {
                                                0%, 100% {
                                                    opacity: 1;
                                                    transform: scale(1) rotate(0deg);
                                                }
                                                50% {
                                                    opacity: 0.5;
                                                    transform: scale(1.2) rotate(180deg);
                                                }
                                            }
                                        `}</style>
                                    </Box>
                                ) : processes.length > 0 ? (
                                    <Stack gap={0}>
                                        {processes.map((process, index) => (
                                            <Box
                                                key={process.id}
                                                p={16}
                                                onClick={() => handleProcessClick(process.id)}
                                                style={{
                                                    borderBottom: index < processes.length - 1
                                                        ? `1px solid ${colors.light}`
                                                        : 'none',
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.2s ease',
                                                    '&:hover': {
                                                        backgroundColor: `${colors.primary}05`
                                                    }
                                                }}
                                            >
                                                <Group justify="space-between">
                                                    <Group gap={12}>
                                                        <File size={20} color={colors.primary} style={{ marginTop: '2px' }} />
                                                        <Stack gap={4} flex={1}>
                                                            <Text fw={600} c={colors.textPrimary}>
                                                                {process.name}
                                                            </Text>
                                                            <Text size="md" c={colors.textSecondary}>
                                                                {process.description}
                                                            </Text>
                                                        </Stack>
                                                    </Group>

                                                    <Group gap={8} align="center">
                                                        <Group gap={4}>
                                                            <Clock size={14} color={colors.textSecondary} />
                                                            <Text size="sm" c={colors.textSecondary}>
                                                                {formatDate(process.createdAt)}
                                                            </Text>
                                                        </Group>

                                                        <ActionIcon variant="transparent" size="sm">
                                                            <MoreHorizontal size={16} color={colors.textSecondary} />
                                                        </ActionIcon>
                                                    </Group>
                                                </Group>
                                            </Box>
                                        ))}
                                    </Stack>
                                ) : (
                                    <Box
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '60px 20px'
                                        }}
                                    >
                                        <Stack align="center" gap={12}>
                                            <File size={32} color={colors.light} />
                                            <Text size="sm" fw={600} c={colors.textPrimary}>
                                                No processes found
                                            </Text>
                                            <Text size="xs" c={colors.textSecondary} ta="center">
                                                Create a new process in this category to get started
                                            </Text>
                                        </Stack>
                                    </Box>
                                )}
                            </Collapse>
                        </Paper>
                    );
                })}
            </Stack>
        </Box>
    )
}

export default RecentProjectCardComponent