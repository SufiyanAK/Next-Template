'use client';

import { colors } from '@/utils/customStyles';
import { Box, Button, Group, Radio, Stack, Text } from '@mantine/core';
import { ArrowRight, Copy, SquareDashedMousePointer } from 'lucide-react';
import { FC, useState } from 'react';

interface TemplateFormComponentProps {
    handleNext?: () => void;
    handleCancel?: () => void;
    handleBack?: () => void;
}

const TemplateFormComponent: FC<TemplateFormComponentProps> = ({
    handleNext,
    handleCancel,
    handleBack
}) => {
    const [selectedTemplate, setSelectedTemplate] = useState('blank');

    const templateOptions = [
        {
            id: 'blank',
            title: 'Blank Process',
            description: 'Start from scratch with an empty canvas',
            icon: <SquareDashedMousePointer size={24} color={colors.primary} />
        },
        {
            id: 'existing',
            title: 'Use Existing Project as Template',
            description: 'Start with a copy of an existing project',
            icon: <Copy size={24} color={colors.primary} />
        }
    ];

    return (
        <Stack gap={24} px={16} py={24} style={{
            border: `1px solid ${colors.light}`,
            borderRadius: '8px',
            backgroundColor: colors.white
        }}>
            {/* Header */}
            <Text size="lg" fw={600} c={colors.textPrimary}>
                Choose a Template
            </Text>

            {/* Template Options */}
            <Radio.Group value={selectedTemplate} onChange={setSelectedTemplate}>
                <Stack gap={16}>
                    {templateOptions.map((option) => (
                        <Box
                            key={option.id}
                            p={16}
                            style={{
                                border: `1px solid ${selectedTemplate === option.id ? colors.primary : colors.light}`,
                                borderRadius: '8px',
                                backgroundColor: selectedTemplate === option.id ? `${colors.primary}08` : 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                            onClick={() => setSelectedTemplate(option.id)}
                        >
                            <Group gap={12} align="flex-start">
                                <Group flex={1}>
                                    {option.icon}
                                    <Box >
                                        <Group gap={4} mb={4}>
                                            <Text fw={500} c={colors.textPrimary}>
                                                {option.title}
                                            </Text>
                                        </Group>
                                        <Text size="sm" c={colors.textSecondary}>
                                            {option.description}
                                        </Text>
                                    </Box>
                                </Group>
                            </Group>
                        </Box>
                    ))}
                </Stack>
            </Radio.Group>

            {/* Action Buttons */}
            <Group justify="space-between" mt={16}>
                <Group gap={12}>
                    <Button
                        variant="outline"
                        size="md"
                        radius={6}
                        onClick={handleCancel}
                        styles={{
                            root: {
                                borderColor: colors.light,
                                color: colors.textSecondary,
                            }
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="outline"
                        size="md"
                        radius={6}
                        onClick={handleBack}
                        styles={{
                            root: {
                                borderColor: colors.light,
                                color: colors.textSecondary,
                            }
                        }}
                    >
                        Back
                    </Button>
                </Group>

                <Button
                    size="md"
                    radius={6}
                    onClick={handleNext}
                    rightSection={<ArrowRight size={20} />}
                    bg={colors.primary}
                    disabled={!selectedTemplate}
                >
                    Next
                </Button>
            </Group>
        </Stack>
    );
};

export default TemplateFormComponent;