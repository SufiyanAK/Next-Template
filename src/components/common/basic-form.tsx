'use client';

import { colors } from '@/utils/customStyles';
import { Button, Group, Stack, TextInput, Textarea } from '@mantine/core'
import { ArrowRight } from 'lucide-react';
import { FC } from 'react'

interface BasicFormComponentProps {
    processName: string;
    description: string;
    setProcessName: (name: string) => void;
    setDescription: (desc: string) => void;
    handleNext?: () => void;
    handleCancel?: () => void;
}


const BasicFormComponent: FC<BasicFormComponentProps> = ({
    handleNext,
    handleCancel,
    processName,
    description,
    setProcessName,
    setDescription
}) => {

    return (
        <Stack gap={24} px={16} py={24} style={{ border: `1px solid ${colors.light}`, borderRadius: '8px', backgroundColor: colors.white }}>
            {/* Process Name Field */}
            <Stack gap={6}>
                <TextInput
                    label="Process Name"
                    required
                    placeholder="Enter process name"
                    value={processName}
                    radius={6}
                    onChange={(event) => setProcessName(event.currentTarget.value)}
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
                    value={description}
                    radius={6}
                    onChange={(event) => setDescription(event.currentTarget.value)}
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