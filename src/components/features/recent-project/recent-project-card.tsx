import { ProjectCategory } from '@/screens/recent-project-screen';
import { colors } from '@/utils/customStyles';
import { ActionIcon, Box, Collapse, Group, Paper, Stack, Text, UnstyledButton } from '@mantine/core';
import { ChevronRight, Clock, File, Folder, MoreHorizontal, Star } from 'lucide-react';
import { FC } from 'react';

interface RecentProjectCardComponentProps {
    categories: ProjectCategory[];
    toggleCategory: (categoryId: string) => void;
    toggleProjectStar: (categoryId: string, projectId: string) => void;
}

const RecentProjectCardComponent: FC<RecentProjectCardComponentProps> = ({ categories, toggleCategory, toggleProjectStar }) => {
    return (
        <Box mt={32}>
            <Stack gap={16}>
                {categories.map((category) => (
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
                            onClick={() => toggleCategory(category.id)}
                            style={{
                                width: '100%',
                                padding: '16px 20px',
                                backgroundColor: colors.tertiary,
                                borderBottom: category.expanded ? `1px solid ${colors.tertiary}` : 'none',
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
                                        transform: category.expanded ? 'rotate(90deg)' : 'rotate(0deg)',
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
                        <Collapse in={category.expanded || false}>
                            <Stack gap={0}>
                                {category.projects.map((project, index) => (
                                    <Box
                                        key={project.id}
                                        p={16}
                                        style={{
                                            borderBottom: index < category.projects.length - 1
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
                                                        {project.name}
                                                    </Text>
                                                    <Text size="md" c={colors.textSecondary}>
                                                        {project.description}
                                                    </Text>
                                                </Stack>
                                            </Group>

                                            <Group gap={8} align="center">
                                                <Group gap={4}>
                                                    <Clock size={14} color={colors.textSecondary} />
                                                    <Text size="sm" c={colors.textSecondary}>
                                                        {project.date}
                                                    </Text>
                                                </Group>

                                                <ActionIcon
                                                    variant="transparent"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleProjectStar(category.id, project.id);
                                                    }}
                                                >
                                                    <Star
                                                        size={16}
                                                        color={project.starred ? colors.primary : colors.textSecondary}
                                                        fill={project.starred ? colors.primary : 'none'}
                                                    />
                                                </ActionIcon>

                                                <ActionIcon variant="transparent" size="sm">
                                                    <MoreHorizontal size={16} color={colors.textSecondary} />
                                                </ActionIcon>
                                            </Group>
                                        </Group>
                                    </Box>
                                ))}
                            </Stack>
                        </Collapse>
                    </Paper>
                ))}
            </Stack>
        </Box>
    )
}

export default RecentProjectCardComponent