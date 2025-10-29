'use client';

import { BaseFormFieldsProps } from '@/screens/new-project-screen';
import { colors } from '@/utils/customStyles';
import { Button, Group, Stack, TextInput, Textarea } from '@mantine/core';
import { ArrowRight } from 'lucide-react';
import { FC } from 'react';

interface BasicFormComponentProps {
    handleNext?: () => void;
    handleCancel?: () => void;
    baseFormFields: BaseFormFieldsProps;
    baseFormFieldsError: { processName: string, description: string }
    setBaseFormFields: (field: keyof BaseFormFieldsProps, value: string | number) => void;
}


const BasicFormComponent: FC<BasicFormComponentProps> = ({
    handleNext,
    handleCancel,
    baseFormFields,
    baseFormFieldsError,
    setBaseFormFields
}) => {

    return (
        <Stack gap={24} px={16} py={24} style={{ border: `1px solid ${colors.light}`, borderRadius: '8px', backgroundColor: colors.white }}>
            {/* Process Name Field */}
            <Stack gap={6}>
                <TextInput
                    label="Process Name"
                    required
                    placeholder="Enter process name"
                    value={baseFormFields.processName}
                    error={baseFormFieldsError.processName}
                    radius={6}
                    onChange={(event) => setBaseFormFields('processName', event.currentTarget.value)}
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