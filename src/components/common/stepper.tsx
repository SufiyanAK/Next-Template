'use client';

import { colors } from '@/utils/customStyles';
import { Box, Group, Stack, Text } from '@mantine/core'
import { CircleCheckBig, Code, PanelsTopLeft } from 'lucide-react'
import { FC } from 'react';

interface StepperComponentProps {
    currentStep: number;
    handleStepChange: (step: number) => void;
}

const StepperComponent: FC<StepperComponentProps> = ({ currentStep, handleStepChange }) => {
    const isStepActive = (step: number) => step === currentStep;
    return (
        <Box py={20}>
            <Group justify="space-between" align="flex-start" style={{ position: 'relative' }}>
                {/* Connecting Line */}

                {/* Step 1 - Basics */}
                <Stack align="center" gap={8} style={{ zIndex: 1 }} onClick={() => handleStepChange(0)}>
                    <Box
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: isStepActive(0) ? `${colors.primary}20` : colors.primary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: isStepActive(0) ? `2px solid ${colors.primary}` : 'none'
                        }}
                    >
                        {
                            isStepActive(0) ?
                                <PanelsTopLeft size={20} color={colors.primary} /> : <CircleCheckBig size={20} color={colors.white} />
                        }
                    </Box>
                    <Text size="sm" fw={500} c={colors.primary}>
                        Basics
                    </Text>
                </Stack>

                <Stack flex={1} justify='center' style={{ zIndex: 0, marginTop: '20px' }}>
                    <Box
                        style={{
                            flexGrow: 1,
                            height: '2px',
                            backgroundColor: isStepActive(1) ? colors.primary : colors.light,
                            zIndex: 0
                        }}
                    />
                </Stack>

                {/* Step 2 - Template */}
                <Stack align="center" gap={8} style={{ zIndex: 1 }}>
                    <Box
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: isStepActive(1) ? `${colors.primary}20` : `${colors.light}30`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: `2px solid ${isStepActive(1) ? colors.primary : 'transparent'}`
                        }}
                    >
                        <Code size={20} color={isStepActive(1) ? colors.primary : colors.textPrimary} />
                    </Box>
                    <Text size="sm" fw={500} c={isStepActive(1) ? colors.primary : colors.textSecondary}>
                        Template
                    </Text>
                </Stack>
            </Group>
        </Box>
    )
}

export default StepperComponent