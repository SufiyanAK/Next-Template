'use client';

import TitleComponent from '@/components/common/title';
import RecentProjectCardComponent from '@/components/features/recent-project/recent-project-card';
import { useAppSelector } from '@/store/store';
import { colors } from '@/utils/customStyles';
import {
    Box,
    Container,
    Text
} from '@mantine/core';
import { Folder } from 'lucide-react';
import { useState } from 'react';

const RecentProjectComponent = () => {
    // const dispatch = useAppDispatch();
    const { meta } = useAppSelector((state) => state.metaState);
    const { processesByCategory, loadingCategories } = useAppSelector((state) => state.processState);

    const [expandedCategories, setExpandedCategories] = useState<{ [key: number]: boolean }>({});

    const handleCategoryClick = (categoryId: number) => {
        const isCurrentlyExpanded = expandedCategories[categoryId];

        // Toggle expansion state
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !isCurrentlyExpanded
        }));

        // If expanding and data not yet loaded, fetch processes
        // if (!isCurrentlyExpanded && !processesByCategory[categoryId]) {
        //     dispatch(getProcessesByCategoryId(categoryId));
        // }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

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
                    meta.processCategories.length === 0 ? (
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
                                No Categories Found
                            </Text>
                            <Text size="md" c={colors.textSecondary} style={{ maxWidth: '400px' }}>
                                No process categories available. Please contact your administrator.
                            </Text>
                        </Box>
                    ) : (
                        <RecentProjectCardComponent
                            categories={meta.processCategories}
                            expandedCategories={expandedCategories}
                            processesByCategory={processesByCategory}
                            loadingCategories={loadingCategories}
                            onCategoryClick={handleCategoryClick}
                            formatDate={formatDate}
                        />
                    )
                }
            </Container>
        </Box>
    );
};

export default RecentProjectComponent;