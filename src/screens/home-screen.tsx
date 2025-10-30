'use client';

import CreateProjectCardComponent from "@/components/common/create-project-card";
import { getMeta } from "@/store/actions/meta.action";
import { getRecentProcesses } from "@/store/actions/process.action";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { colors } from "@/utils/customStyles";
import { Box, Container, Divider, Group, Loader, Paper, Stack, Text, Title } from "@mantine/core";
import { Clock, File, Folder, Plus, Sparkles } from "lucide-react";
import { useEffect } from "react";

const HomeComponent = () => {
    const dispatch = useAppDispatch();

    const { recentProjects, isLoading } = useAppSelector((state) => state.processState);

    useEffect(() => {
        dispatch(getMeta());
        dispatch(getRecentProcesses());
    }, [dispatch]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Box
            style={{
                minHeight: 'calc(100vh - 70px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Container size="lg" style={{ width: '100%' }}>
                <Stack gap={40} justify="center" align="center">
                    {/* Header Section */}
                    <Stack align="center" gap={8}>
                        <Title order={1} size="h1" c={colors.textPrimary}>
                            RPA Designer
                        </Title>
                        <Text c={colors.textSecondary} size="lg">
                            Create, manage, and run automated workflows
                        </Text>
                    </Stack>

                    {/* Action Cards */}
                    <Group
                        w="100%"
                        justify="center"
                        gap={24}
                        style={{
                            '@media (maxWidth: 768px)': {
                                flexDirection: 'column',
                                alignItems: 'center'
                            }
                        }}
                    >
                        <CreateProjectCardComponent
                            hasIcon={true}
                            Icon={<Plus size={20} color={colors.primary} />}
                            title="Create New Process"
                            description="Start building a new automation workflow from scratch"
                            onClickPath="/projects/new"
                        />
                        <CreateProjectCardComponent
                            hasIcon={true}
                            Icon={<Folder size={20} color={colors.secondary} />}
                            color={colors.secondary}
                            title="Open Recent Process"
                            description="Continue working on an existing automation process"
                            onClickPath="/projects/recent"
                        />
                    </Group>

                    {/* Recent Projects Section */}
                    <Box mt={20} w="100%">
                        {/* Section Header */}
                        <Box
                            bg={colors.primary}
                            px={20}
                            py={12}
                            style={{ borderRadius: '8px 8px 0 0' }}
                        >
                            <Text c={colors.white} size="lg">
                                Recent Processes
                            </Text>
                        </Box>

                        {/* Projects List */}
                        <Paper
                            style={{
                                border: `1px solid ${colors.light}`,
                                borderRadius: '0 0 8px 8px',
                                borderTop: 'none'
                            }}
                        >
                            {isLoading ? (
                                <Box
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '60px 20px',
                                        minHeight: '300px'
                                    }}
                                >
                                    <Stack align="center" gap={20}>
                                        {/* Cute animated loader with sparkles */}
                                        <Box style={{ position: 'relative' }}>
                                            <Loader size="lg" color={colors.primary} type="dots" />
                                            <Box
                                                style={{
                                                    position: 'absolute',
                                                    top: -10,
                                                    left: -10,
                                                    animation: 'sparkle 1.5s ease-in-out infinite'
                                                }}
                                            >
                                                <Sparkles size={16} color={colors.secondary} />
                                            </Box>
                                            <Box
                                                style={{
                                                    position: 'absolute',
                                                    bottom: -10,
                                                    right: -10,
                                                    animation: 'sparkle 1.5s ease-in-out infinite 0.5s'
                                                }}
                                            >
                                                <Sparkles size={14} color={colors.primary} />
                                            </Box>
                                        </Box>
                                        <Stack align="center" gap={8}>
                                            <Text size="lg" fw={600} c={colors.textPrimary}>
                                                Loading your processes...
                                            </Text>
                                            <Text size="sm" c={colors.textSecondary}>
                                                Hang tight! We&apos;re fetching your automation workflows ✨
                                            </Text>
                                        </Stack>
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
                            ) : recentProjects && recentProjects.length > 0 ? (
                                recentProjects.map((project, index) => (
                                    <Box key={project.id}>
                                        <Group
                                            p={16}
                                            justify="space-between"
                                            style={{
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: colors.background
                                                }
                                            }}
                                        >
                                            <Group gap={12}>
                                                <File size={20} color={colors.primary} />
                                                <Stack gap={4}>
                                                    <Text fw={600} c={colors.textPrimary}>
                                                        {project.name}
                                                    </Text>
                                                    <Text size="sm" c={colors.textSecondary}>
                                                        {project.description}
                                                    </Text>
                                                </Stack>
                                            </Group>
                                            <Group gap={8}>
                                                <Clock size={16} color={colors.textSecondary} />
                                                <Text size="sm" c={colors.textSecondary}>
                                                    {formatDate(project.createdAt)}
                                                </Text>
                                            </Group>
                                        </Group>
                                        {index < recentProjects.length - 1 && <Divider />}
                                    </Box>
                                ))
                            ) : (
                                <Box
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '60px 20px',
                                        minHeight: '300px'
                                    }}
                                >
                                    <Stack align="center" gap={16}>
                                        <Folder size={48} color={colors.light} />
                                        <Text size="lg" fw={600} c={colors.textPrimary}>
                                            No recent processes
                                        </Text>
                                        <Text size="sm" c={colors.textSecondary} ta="center">
                                            Get started by creating your first automation workflow!
                                        </Text>
                                    </Stack>
                                </Box>
                            )}
                        </Paper>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default HomeComponent;