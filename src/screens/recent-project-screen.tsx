'use client';

import TitleComponent from '@/components/common/title';
import RecentProjectCardComponent from '@/components/features/recent-project/recent-project-card';
import { colors } from '@/utils/customStyles';
import {
    Box,
    Container,
    Text
} from '@mantine/core';
import { Folder } from 'lucide-react';
import { useState } from 'react';

interface Project {
    id: string;
    name: string;
    description: string;
    date: string;
    starred?: boolean;
}

export interface ProjectCategory {
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
    }

    return (
        <Box p={24}>
            <Container size="lg">
                {/* Title Component */}
                <TitleComponent
                    title="Projects"
                    description="Browse and manage your automation projects"
                    backButtonPath='/home'
                    isBackButton
                />

                {/* Projects List */}
                {
                    categories.length === 0 ? (
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: '400px',
                                textAlign: 'center'
                            }}
                        >
                            <Box
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    backgroundColor: `${colors.light}30`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '24px'
                                }}
                            >
                                <Folder size={40} color={colors.light} />
                            </Box>
                            <Text size="xl" fw={600} c={colors.textPrimary} mb={8}>
                                No Recent Projects Found
                            </Text>
                            <Text size="md" c={colors.textSecondary} style={{ maxWidth: '400px' }}>
                                You haven&apos;t created any projects yet. Start building your first automation workflow to see them here.
                            </Text>
                        </Box>
                    ) : (
                        <RecentProjectCardComponent
                            categories={categories}
                            toggleCategory={toggleCategory}
                            toggleProjectStar={toggleProjectStar}
                        />
                    )
                }
            </Container>
        </Box>
    );
};

export default RecentProjectComponent;