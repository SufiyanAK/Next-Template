'use client';

import AssignEmailActivityComponent from '@/components/features/dashboard/processes/activities/assign-email-activity-component';
import ERPConfigActivityComponent from '@/components/features/dashboard/processes/activities/erp-config-activity-component';
import ProcessTabComponent from '@/components/features/dashboard/process-tab';
import ReadEmailActivityComponent from '@/components/features/dashboard/processes/activities/read-email-activity-component';
import ReplyEmailActivityComponent from '@/components/features/dashboard/processes/activities/reply-email-activity-component';
import { useDashboard } from '@/contexts/dashboard-context';
import { getProcessById, publishProcess, updateProcess } from '@/store/actions/process.action';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ProcessUpdatePayload } from '@/types/process.types';
import { Box, Loader, Center, Stack, Text } from '@mantine/core';
import { notFound } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';

const ProcessScreen = ({ id }: { id: string }) => {
    const dispatch = useAppDispatch();
    const { setOnSaveProcess, setIsSaving, setOnPublishProcess, setIsPublishing, processData, setProcessData, setCurrentProcessId } = useDashboard();
    const { isUpdating, isPublishing, currentProcess, transformedProcess, isFetchingProcess, error } = useAppSelector((state) => state.processState);

    // Use ref to always have the latest processData
    const processDataRef = useRef(processData);
    useEffect(() => {
        processDataRef.current = processData;
    }, [processData]);

    const [processNotFound, setProcessNotFound] = useState(false);
    const [isFetchError, setIsFetchError] = useState(false);

    const [readEmailModalOpened, setReadEmailModalOpened] = useState(false);
    const [replyEmailModalOpened, setReplyEmailModalOpened] = useState(false);
    const [erpConfigModalOpened, setErpConfigModalOpened] = useState(false);
    const [assignEmailModalOpened, setAssignEmailModalOpened] = useState(false);
    const [currentNodeData, setCurrentNodeData] = useState<any>(null);

    // Update isSaving state when isUpdating changes
    useEffect(() => {
        setIsSaving(isUpdating);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUpdating]);

    // Set current process ID in context
    useEffect(() => {
        setCurrentProcessId(id);
        return () => {
            // Don't clear on unmount to preserve navigation
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // Fetch process data by ID when component mounts
    useEffect(() => {
        setIsFetchError(false); // Reset fetch error flag
        dispatch(getProcessById({
            processId: id
        }));
    }, [id, dispatch]);

    // Check if fetch failed and trigger notFound (only for initial fetch errors, not update errors)
    useEffect(() => {
        // Only set fetch error if we're in the initial fetch phase (not updating)
        // and we haven't successfully loaded a process yet
        if (!isFetchingProcess && !isUpdating && error && !currentProcess) {
            console.error('Failed to fetch process:', error);
            setIsFetchError(true);
            setProcessNotFound(true);
        }
    }, [isFetchingProcess, isUpdating, error, currentProcess]);

    // Check if process was not found and trigger notFound (only for fetch errors)
    useEffect(() => {
        if (processNotFound && isFetchError) {
            notFound();
        }
    }, [processNotFound, isFetchError]);

    // Validate if process exists after fetch is complete
    useEffect(() => {
        if (!isFetchingProcess && !currentProcess && !error && !processNotFound) {
            // Fetch completed but no process found (shouldn't happen but defensive)
            const timer = setTimeout(() => {
                if (!currentProcess) {
                    setProcessNotFound(true);
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isFetchingProcess, currentProcess, error, processNotFound]);

    // Update processData when transformedProcess changes (merge server data into working data)
    useEffect(() => {
        if (transformedProcess) {
            // Only update if processData is empty or doesn't have activities
            // This ensures we don't overwrite unsaved changes
            if (!processData || !processData.activities || processData.activities.length === 0) {
                setProcessData({
                    name: transformedProcess.name,
                    description: transformedProcess.description,
                    processCategoryId: transformedProcess.processCategoryId,
                    activities: transformedProcess.activities as any
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transformedProcess]);

    // Set up the save handler
    useEffect(() => {
        const handleSave = () => {
            if (!processData) {
                toast.error('No process data to save');
                return;
            }

            // Validate process data
            if (!processData.name || !processData.description) {
                toast.error('Please fill in all required fields');
                return;
            }

            // processData.activities already contains the transformed flat structure
            // Each activity has the structure: { type, ...properties }
            // No need to transform further - use directly
            const finalActivities = processData.activities || [];

            // Prepare the final payload in transformed structure
            const payload: ProcessUpdatePayload = {
                name: processData.name,
                description: processData.description,
                processCategoryId: Number(processData.processCategoryId),
                activities: finalActivities as any[]
            };

            dispatch(updateProcess({
                processId: id,
                processData: payload,
                onSuccess: (response) => {
                    toast.success('Process updated successfully');
                    console.log('Updated process:', response);
                },
                onError: (error) => {
                    toast.error(error || 'Failed to update process');
                }
            }));
        };

        setOnSaveProcess(() => handleSave);

        // Cleanup function
        return () => {
            setOnSaveProcess(undefined);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, processData, dispatch]);

    // Set up the publish handler
    useEffect(() => {
        const handlePublish = () => {
            if (!id) {
                toast.error('No process ID available');
                return;
            }

            dispatch(publishProcess({
                processId: id,
                onSuccess: (response) => {
                    toast.success('Process published successfully');
                    console.log('Published process:', response);
                },
                onError: (error) => {
                    toast.error(error || 'Failed to publish process');
                }
            }));
        };

        setOnPublishProcess(() => handlePublish);

        // Cleanup function
        return () => {
            setOnPublishProcess(undefined);
        };
    }, [id, dispatch, setOnPublishProcess]);

    // Update isPublishing state when publishing changes
    useEffect(() => {
        setIsPublishing(isPublishing);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPublishing]);

    const handleActivityConfig = (nodeId: string, activityType: string) => {
        let activityData = null;

        // Use the ref to get the latest processData (which now contains merged data from transformedProcess)
        const latestProcessData = processDataRef.current;

        // Check processData.activities (which contains both persisted and unsaved changes)
        if (latestProcessData && latestProcessData.activities && latestProcessData.activities.length > 0) {
            // Log each activity type
            latestProcessData.activities.forEach((activity: any, index: number) => {
                console.log(`Activity ${index}:`, { type: activity.type, data: activity });
            });

            // Find activity by type in the current working data
            const savedActivity = latestProcessData.activities.find((activity: any) => activity.type === activityType);

            if (savedActivity) {
                activityData = savedActivity;
                console.log("✓ Loaded activity data from processData:", activityData);
            } else {
                console.log("✗ No matching activity found in processData");
            }
        } else {
            console.log("processData.activities is empty or undefined");
        }

        setCurrentNodeData(activityData);

        if (activityType === 'read-email') {
            setReadEmailModalOpened(true);
            return;
        }
        if (activityType === 'reply-email') {
            setReplyEmailModalOpened(true);
            return;
        }
        if (activityType === 'erp-config') {
            setErpConfigModalOpened(true);
            return;
        }
        if (activityType === 'assign') {
            setAssignEmailModalOpened(true);
            return;
        }

    };

    // Show loading state while fetching process
    if (isFetchingProcess) {
        return (
            <Center style={{ height: '100%' }}>
                <Stack align="center" gap={12}>
                    <Loader size="lg" />
                    <Text size="sm" c="dimmed">Loading process...</Text>
                </Stack>
            </Center>
        );
    }

    return (
        <Box style={{ height: '100%', overflow: 'hidden' }}>
            <ProcessTabComponent
                onActivityConfig={handleActivityConfig}
                // onNodesChange={setCurrentNodes}
                // Use currentProcess for initialActivities since it needs ProcessActivityDetail[] format
                // The transformedProcess data is used in processData for working with activities
                initialActivities={currentProcess?.activities}
            />

            {/* Read Email Activity Modal */}
            <ReadEmailActivityComponent
                opened={readEmailModalOpened}
                onClose={() => {
                    setReadEmailModalOpened(false);
                    setCurrentNodeData(null);
                }}
                existingData={currentNodeData}
            />
            <ReplyEmailActivityComponent
                opened={replyEmailModalOpened}
                onClose={() => {
                    setReplyEmailModalOpened(false);
                    setCurrentNodeData(null);
                }}
                existingData={currentNodeData}
            />
            <ERPConfigActivityComponent
                opened={erpConfigModalOpened}
                onClose={() => {
                    setErpConfigModalOpened(false);
                    setCurrentNodeData(null);
                }}
                existingData={currentNodeData}
            />
            <AssignEmailActivityComponent
                opened={assignEmailModalOpened}
                onClose={() => {
                    setAssignEmailModalOpened(false);
                    setCurrentNodeData(null);
                }}
                existingData={currentNodeData}
            />
        </Box>
    );
};

export default ProcessScreen;