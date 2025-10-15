'use client';

import BasicFormComponent from '@/components/common/basic-form'
import StepperComponent from '@/components/common/stepper'
import TemplateFormComponent from '@/components/common/template-form';
import TitleComponent from '@/components/common/title'
import { Box, Container } from '@mantine/core'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const errors = {
    processName: 'Process name is required',
    description: 'Description is required',
    bothRequired: 'Process name and description are required'
}

const NewProjectComponent = () => {
    const router = useRouter();

    const [processName, setProcessName] = useState('');
    const [description, setDescription] = useState('');
    const [activeStep, setActiveStep] = useState(0);

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    }

    const handleNext = () => {
        if (!processName && !description) {
            toast.error(errors['bothRequired']);
            return;
        }

        if (!processName) {
            toast.error(errors['processName']);
            return;
        }

        if (!description) {
            toast.error(errors['description']);
            return;
        }

        setActiveStep((prev) => prev === 0 ? 1 : prev);
        console.log('Next Step: ', activeStep);
        console.log('Process Name:', processName);
        console.log('Description:', description);
    }

    const handleBack = () => {
        setActiveStep((prev) => prev === 1 ? 0 : prev);
        console.log('Back Step: ', activeStep);
    }

    const handleCancel = () => {
        router.push('/home');
        setActiveStep(0);
        setProcessName('');
        setDescription('');
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
                <StepperComponent currentStep={activeStep} handleStepChange={handleStepChange} />

                {/* Form - Components */}
                {/* Basic Form - Component */}
                {
                    activeStep === 0 ? (
                        <BasicFormComponent
                            processName={processName}
                            description={description}
                            setProcessName={setProcessName}
                            setDescription={setDescription}
                            handleNext={handleNext}
                            handleCancel={handleCancel}
                        />
                    ) : (
                        <TemplateFormComponent
                            handleCancel={handleCancel}
                            handleBack={handleBack}
                            handleNext={() => {
                                router.push('/dashboard');
                                toast.success('Project Created Successfully!')
                            }}
                        />
                    )
                }
            </Container>
        </Box>
    )
}

export default NewProjectComponent