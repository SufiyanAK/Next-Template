'use client';

import { colors } from '@/utils/customStyles';
import {
    Box,
    Stack,
    Text,
    TextInput,
    ScrollArea,
    UnstyledButton,
    Group,
    Collapse,
    Badge
} from '@mantine/core';
import {
    Search,
    Plus,
    Filter,
    ChevronDown,
    Mail,
    FileText
} from 'lucide-react';
import { useState } from 'react';

interface ActivityCategory {
    id: string;
    name: string;
    icon: any;
    items: ActivityItem[];
    expanded: boolean;
}

interface ActivityItem {
    id: string;
    name: string;
    description: string;
}

interface DashboardLeftSidebarComponentProps {
    onReadEmailClick?: () => void;
}

const DashboardLeftSidebarComponent = ({ onReadEmailClick }: DashboardLeftSidebarComponentProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState<ActivityCategory[]>([
        {
            id: 'email',
            name: 'Email',
            icon: Mail,
            expanded: true,
            items: [
                {
                    id: 'read-email',
                    name: 'Read Email',
                    description: 'Read emails from an inbox'
                }
            ]
        },
        {
            id: 'files',
            name: 'Files',
            icon: FileText,
            expanded: false,
            items: [
                {
                    id: 'read-file',
                    name: 'Read File',
                    description: 'Read content from files'
                }
            ]
        }
    ]);

    const toggleCategory = (categoryId: string) => {
        setCategories(prev =>
            prev.map(category =>
                category.id === categoryId
                    ? { ...category, expanded: !category.expanded }
                    : category
            )
        );
    };

    return (
        <Box
            style={{
                width: '280px',
                height: '100%',
                borderRight: `1px solid ${colors.tertiary}`,
                backgroundColor: colors.white,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Activities Header */}
            <Stack p={16} style={{ borderBottom: `1px solid ${colors.tertiary}` }}>
                <Group justify="space-between" align='center'>
                    <Text fw={600} size="md" c={colors.textPrimary}>
                        Activities
                    </Text>
                    <Plus size={18} color={colors.textPrimary} style={{ cursor: 'pointer' }} />
                </Group>

                {/* Search Input */}
                <TextInput
                    placeholder="Search activities..."
                    size="md"
                    radius={6}
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.currentTarget.value)}
                    leftSection={<Search size={18} />}
                    styles={{
                        input: {
                            borderColor: colors.tertiary
                        }
                    }}
                />
                <Group justify='space-between'>
                    <Group gap={8}>
                        <Badge
                            variant='light'
                            size='xl'
                            radius={6}
                            color={colors.primary}
                            styles={{
                                root: {
                                    minWidth: 'fit-content',
                                    width: 'max-content',
                                },
                                label: {
                                    textTransform: 'capitalize',
                                    fontWeight: '500',
                                    fontSize: '0.875rem',
                                    whiteSpace: 'nowrap'
                                }
                            }}
                        >
                            All
                        </Badge>
                    </Group>
                    <Filter size={20} color={colors.textSecondary} />
                </Group>
            </Stack>

            {/* Favorites Section */}

            {/* Activities List */}
            <ScrollArea flex={1} px={8}>
                <Stack gap={8} py={8}>
                    {categories.map((category) => (
                        <Box key={category.id}>
                            {/* Category Header */}
                            <UnstyledButton
                                onClick={() => toggleCategory(category.id)}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    '&:hover': {
                                        backgroundColor: colors.background
                                    }
                                }}
                            >
                                <Group gap={8}>
                                    <ChevronDown
                                        size={16}
                                        strokeWidth={3}
                                        color={colors.textPrimary}
                                        style={{
                                            transform: category.expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                                            transition: 'transform 0.2s ease'
                                        }}
                                    />
                                    <Group gap={8}>
                                        <category.icon size={16} color={colors.textPrimary} />
                                        <Text size="sm" c={colors.textPrimary}>
                                            {category.name}
                                        </Text>
                                    </Group>
                                </Group>
                            </UnstyledButton>

                            {/* Category Items */}
                            <Collapse in={category.expanded}>
                                <Stack gap={2} pl={24} mt={4}>
                                    {category.items.map((item) => (
                                        <UnstyledButton
                                            key={item.id}
                                            onClick={() => {
                                                if (item.id === 'read-email' && onReadEmailClick) {
                                                    onReadEmailClick();
                                                }
                                            }}
                                            onDragStart={(event) => {
                                                event.dataTransfer.setData('application/reactflow', item.id);
                                                event.dataTransfer.setData('application/activity', JSON.stringify(item));
                                                event.dataTransfer.effectAllowed = 'move';
                                            }}
                                            draggable={true}
                                            px={8}
                                            py={8}
                                            style={{
                                                borderRadius: '4px',
                                                cursor: 'grab',
                                                border: `1px solid transparent`,
                                                '&:hover': {
                                                    backgroundColor: `${colors.primary}08`,
                                                    border: `1px solid ${colors.primary}20`
                                                },
                                                '&:active': {
                                                    cursor: 'grabbing'
                                                },
                                                width: '100%',
                                                textAlign: 'left'
                                            }}
                                        >
                                            <Text size="sm" fw={500} c={colors.textPrimary} mb={2}>
                                                {item.name}
                                            </Text>
                                            <Text size="xs" c={colors.textSecondary} lineClamp={2}>
                                                {item.description}
                                            </Text>
                                        </UnstyledButton>
                                    ))}
                                </Stack>
                            </Collapse>
                        </Box>
                    ))}
                </Stack>
            </ScrollArea>

            {/* Recently Used Section */}
            {/* <Box px={16} py={12} style={{ borderTop: `1px solid ${colors.tertiary}` }}>
                    <Text size="xs" fw={500} c={colors.textSecondary} mb={8}>
                        RECENTLY USED
                    </Text>
                    <Stack gap={4}>
                        <Group gap={8}>
                            <Mail size={12} color={colors.textSecondary} />
                            <Text size="xs" c={colors.textSecondary}>Send Email</Text>
                        </Group>
                        <Group gap={8}>
                            <FileText size={12} color={colors.textSecondary} />
                            <Text size="xs" c={colors.textSecondary}>Read File</Text>
                        </Group>
                    </Stack>
                </Box> */}

        </Box>
    );
};

export default DashboardLeftSidebarComponent;