'use client';

import BasicFormComponent from '@/components/common/basic-form'
import StepperComponent from '@/components/common/stepper'
import TemplateFormComponent from '@/components/common/template-form';
import TitleComponent from '@/components/common/title'
import { createNewProcess } from '@/store/actions/process.action';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Box, Container } from '@mantine/core'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export interface BaseFormFieldsProps {
    name: string;
    description: string;
    processCategoryId: string;
    activeStep: number;
}

const initialBaseFormFields: BaseFormFieldsProps = {
    name: '',
    description: '',
    processCategoryId: '',
    activeStep: 0
}

const NewProjectComponent = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { meta: {
        processCategories
    } } = useAppSelector((state) => state.metaState);
    const [baseFormFields, setBaseFormFields] = useState<BaseFormFieldsProps>(initialBaseFormFields)
    const [baseFormErrors, setBaseFormErrors] = useState<{ name?: string; description?: string; processCategoryId?: string }>({})

    const handleStepChange = (step: number) => {
        setBaseFormFields({ ...baseFormFields, activeStep: step })
    }

    const handleBaseFormFieldChange = (field: keyof BaseFormFieldsProps, value: string | number) => {
        setBaseFormFields({ ...baseFormFields, [field]: value });

        if (field === 'name' && baseFormErrors.name) {
            setBaseFormErrors((prev) => ({ ...prev, name: undefined }));
        }

        if (field === 'description' && baseFormErrors.description) {
            setBaseFormErrors((prev) => ({ ...prev, description: undefined }));
        }

        if (field === 'processCategoryId' && baseFormErrors.processCategoryId) {
            setBaseFormErrors((prev) => ({ ...prev, processCategoryId: undefined }));
        }
    }

    const handleNext = () => {
        const errors: { name?: string; description?: string; processCategoryId?: string } = {};

        if (!baseFormFields.name) {
            errors.name = 'Process name is required';
        }

        if (!baseFormFields.description) {
            errors.description = 'Description is required';
        }

        if (!baseFormFields.processCategoryId) {
            errors.processCategoryId = 'Process category is required';
        }

        if (Object.keys(errors).length > 0) {
            setBaseFormErrors(errors);
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

    const handleProjectCreate = async () => {
        dispatch(createNewProcess({
            processData: {
                name: baseFormFields.name,
                processCategoryId: parseInt(baseFormFields.processCategoryId),
                description: baseFormFields.description
            },
            onSuccess: (response) => {
                console.log('Process created successfully:', response);
                toast.success('Process created successfully!');
                router.push(`/dashboard/process/${response.id}`);
                setBaseFormFields(initialBaseFormFields);
            },
            onError: (error) => {
                console.error('Failed to create process:', error);
                toast.error(`Failed to create process: ${error}`);
            }
        }));
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
                            baseFormFieldsError={baseFormErrors as { name: string, description: string, processCategoryId: string }}
                            processCategories={processCategories}
                        />
                    ) : (
                        <TemplateFormComponent
                            handleCancel={handleCancel}
                            handleBack={handleBack}
                            handleNext={handleProjectCreate}
                        />
                    )
                }
            </Container>
        </Box>
    )
}

export default NewProjectComponent