'use client';

import TitleComponent from '@/components/common/title';
import { colors } from '@/utils/customStyles';
import {
    ActionIcon,
    Box,
    Collapse,
    Container,
    Group,
    Paper,
    Stack,
    Text,
    UnstyledButton
} from '@mantine/core';
import {
    ChevronRight,
    Clock,
    File,
    Folder,
    MoreHorizontal,
    Star
} from 'lucide-react';
import { useState } from 'react';

interface Project {
    id: string;
    name: string;
    description: string;
    date: string;
    starred?: boolean;
}

interface ProjectCategory {
    id: string;
    name: string;
    projects: Project[];
    expanded?: boolean;
}

const RecentProjectComponent = () => {
    const dummyData: ProjectCategory[] = [
        {
            id: 'finance',
            name: 'Finance & Accounting',
            expanded: false,
            projects: [
                {
                    id: 'invoice-processing',
                    name: 'Invoice Processing',
                    description: 'Automated invoice data extraction and entry',
                    date: '15/10/2023',
                    starred: true
                }
            ]
        },
        {
            id: 'hr',
            name: 'HR & Onboarding',
            expanded: false,
            projects: [
                {
                    id: 'customer-onboarding',
                    name: 'Customer Onboarding',
                    description: 'New customer data verification and system setup',
                    date: '15/10/2023',
                    starred: true
                }
            ]
        },
        {
            id: 'communication',
            name: 'Communication',
            expanded: false,
            projects: [
                {
                    id: 'email-automation',
                    name: 'Email Automation',
                    description: 'Automated email response and categorization',
                    date: '15/10/2023',
                    starred: true
                }
            ]
        },
        {
            id: 'it',
            name: 'IT & Infrastructure',
            expanded: false,
            projects: [
                {
                    id: 'data-migration',
                    name: 'Data Migration',
                    description: 'Legacy system data transfer to new platform',
                    date: '15/10/2023',
                    starred: true
                }
            ]
        },
        {
            id: 'sales',
            name: 'Sales & Marketing',
            expanded: false,
            projects: [
                {
                    id: 'report-generation',
                    name: 'Report Generation',
                    description: 'Automated weekly sales report creation',
                    date: '15/10/2023',
                    starred: true
                }
            ]
        }
    ];

    const [categories, setCategories] = useState<ProjectCategory[]>(dummyData);

    const toggleCategory = (categoryId: string) => {
        setCategories(prev =>
            prev.map(category =>
                category.id === categoryId
                    ? { ...category, expanded: !category.expanded }
                    : category
            )
        );
    };

    const toggleProjectStar = (categoryId: string, projectId: string) => {
        setCategories(prev =>
            prev.map(category =>
                category.id === categoryId
                    ? {
                        ...category,
                        projects: category.projects.map(project =>
                            project.id === projectId
                                ? { ...project, starred: !project.starred }
                                : project
                        )
                    }
                    : category
            )
        );
    };

    return (
        <Box p={24}>
            <Container size="lg" py={40}>
                {/* Title Component */}
                <TitleComponent
                    title="Projects"
                    description="Browse and manage your automation projects"
                    backButtonPath='/home'
                    isBackButton
                />

                {/* Projects List */}
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
            </Container>
        </Box>
    );
};

export default RecentProjectComponent;