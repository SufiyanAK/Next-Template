'use client';

import BasicFormComponent from '@/components/common/basic-form'
import StepperComponent from '@/components/common/stepper'
import TemplateFormComponent from '@/components/common/template-form';
import TitleComponent from '@/components/common/title'
import { Box, Container } from '@mantine/core'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export interface BaseFormFieldsProps {
    processName: string;
    description: string;
    activeStep: number;
}

const initialBaseFormFields: BaseFormFieldsProps = {
    processName: '',
    description: '',
    activeStep: 0
}

const NewProjectComponent = () => {
    const router = useRouter();

    const [baseFormFields, setBaseFormFields] = useState<BaseFormFieldsProps>(initialBaseFormFields)
    const [baseFormErrors, setBaseFormErrors] = useState<{ processName?: string; description?: string }>({})

    const handleStepChange = (step: number) => {
        setBaseFormFields({ ...baseFormFields, activeStep: step })
    }

    const handleBaseFormFieldChange = (field: keyof BaseFormFieldsProps, value: string | number) => {
        setBaseFormFields({ ...baseFormFields, [field]: value });

        if (field === 'processName' && baseFormErrors.processName) {
            setBaseFormErrors((prev) => ({ ...prev, processName: undefined }));
        }

        if (field === 'description' && baseFormErrors.description) {
            setBaseFormErrors((prev) => ({ ...prev, description: undefined }));
        }
    }

    const handleNext = () => {
        if (!baseFormFields.processName && !baseFormFields.description) {
            setBaseFormErrors({ processName: 'Process name is required', description: 'Description is required' });
            return;
        }

        if (!baseFormFields.processName) {
            setBaseFormErrors((prev) => ({ ...prev, processName: 'Process name is required' }));
            return;
        }

        if (!baseFormFields.description) {
            setBaseFormErrors((prev) => ({ ...prev, description: 'Description is required' }));
            return;
        }

        setBaseFormFields((prev) => ({ ...prev, activeStep: 1 }));
    }

    const handleBack = () => {
        setBaseFormFields((prev) => ({ ...prev, activeStep: 0 }));
    }

    const handleCancel = () => {
        router.push('/home');
        setBaseFormFields(initialBaseFormFields);
    }

    return (
        <Box p={24}>
            <Container size="lg">
                {/* Title - component */}
                <TitleComponent
                    title='Create New Process'
                    description='Set up your automation process in a few simple steps'
                    backButtonPath='/home'
                    isBackButton
                />

                {/* Stepper - component */}
                <StepperComponent currentStep={baseFormFields.activeStep} handleStepChange={handleStepChange} />

                {/* Form - Components */}
                {/* Basic Form - Component */}
                {
                    baseFormFields.activeStep === 0 ? (
                        <BasicFormComponent
                            handleNext={handleNext}
                            handleCancel={handleCancel}
                            baseFormFields={baseFormFields}
                            setBaseFormFields={handleBaseFormFieldChange}
                            baseFormFieldsError={baseFormErrors as { processName: string, description: string }}
                        />
                    ) : (
                        <TemplateFormComponent
                            handleCancel={handleCancel}
                            handleBack={handleBack}
                            handleNext={() => {
                                router.push('/dashboard');
                                toast.success('Process Created Successfully!')
                            }}
                        />
                    )
                }
            </Container>
        </Box>
    )
}

export default NewProjectComponent