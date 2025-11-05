'use client';

import { BaseFormFieldsProps } from '@/screens/new-project-screen';
import { MetaEnumProcessCategories } from '@/types/meta.types';
import { colors } from '@/utils/customStyles';
import { Button, Group, Select, Stack, TextInput, Textarea } from '@mantine/core';
import { ArrowRight } from 'lucide-react';
import { FC } from 'react';

interface BasicFormComponentProps {
    handleNext?: () => void;
    handleCancel?: () => void;
    baseFormFields: BaseFormFieldsProps;
    baseFormFieldsError: { name: string, description: string, processCategoryId: string }
    setBaseFormFields: (field: keyof BaseFormFieldsProps, value: string | number) => void;
    processCategories: MetaEnumProcessCategories[];
}


const BasicFormComponent: FC<BasicFormComponentProps> = ({
    handleNext,
    handleCancel,
    baseFormFields,
    baseFormFieldsError,
    setBaseFormFields,
    processCategories
}) => {

    // Convert process categories to select options
    const categoryOptions = processCategories.map((category) => ({
        value: category.id.toString(),
        label: category.name
    }));

    return (
        <Stack gap={24} px={16} py={24} style={{ border: `1px solid ${colors.light}`, borderRadius: '8px', backgroundColor: colors.white }}>
            {/* Process Name Field */}
            <Stack gap={6}>
                <TextInput
                    label="Process Name"
                    required
                    placeholder="Enter process name"
                    value={baseFormFields.name}
                    error={baseFormFieldsError.name}
                    radius={6}
                    onChange={(event) => setBaseFormFields('name', event.currentTarget.value)}
                    size="md"
                    styles={{
                        label: {
                            color: colors.textPrimary,
                            marginBottom: '6px'
                        },
                        input: {
                            borderColor: colors.light,
                            '&:focus': {
                                borderColor: colors.primary
                            }
                        }
                    }}
                />
            </Stack>

            {/* Description Field */}
            <Stack gap={6}>
                <Textarea
                    label="Description"
                    required
                    placeholder="Enter Description"
                    value={baseFormFields.description}
                    error={baseFormFieldsError.description}
                    radius={6}
                    onChange={(event) => setBaseFormFields('description', event.currentTarget.value)}
                    size="md"
                    styles={{
                        label: {
                            color: colors.textPrimary,
                            marginBottom: '6px'
                        },
                        input: {
                            borderColor: colors.light,
                            '&:focus': {
                                borderColor: colors.primary
                            }
                        }
                    }}
                />
            </Stack>

            {/* Process Category Field */}
            <Stack gap={6}>
                <Select
                    label="Process Category"
                    required
                    placeholder="Select a category"
                    // value={baseFormFields.processCategoryId}
                    error={baseFormFieldsError.processCategoryId}
                    data={categoryOptions}
                    radius={6}
                    onChange={(value) => setBaseFormFields('processCategoryId', Number(value) || '')}
                    size="md"
                    styles={{
                        label: {
                            color: colors.textPrimary,
                            marginBottom: '6px'
                        },
                        input: {
                            borderColor: colors.light,
                        }
                    }}
                />
            </Stack>

            {/* Action Buttons */}
            <Group justify="space-between" mt={16}>
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
                    size="md"
                    radius={6}
                    onClick={handleNext}
                    rightSection={<ArrowRight size={20} />}
                    bg={colors.primary}
                >
                    Next
                </Button>
            </Group>
        </Stack>
    )
}

export default BasicFormComponent