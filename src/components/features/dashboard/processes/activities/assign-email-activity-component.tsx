'use client';

import { colors } from '@/utils/customStyles';
import { getDataStructuresSelect, getEmailOutputPropertiesSelect } from '@/utils/meta-helpers';
import { useAppSelector } from '@/store/store';
import { Box, Button, CloseButton, Group, Modal, Stack, Text, TextInput, Select } from '@mantine/core';
import { Code } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AssignActivity } from '@/types/process.types';
import { useDashboard } from '@/contexts/dashboard-context';

interface AssignEmailActivityProps {
    opened: boolean;
    onClose: () => void;
    onSave?: (activityData: AssignActivity) => void;
    existingData?: any;
}

const AssignEmailActivityComponent = ({ opened, onClose, onSave, existingData }: AssignEmailActivityProps) => {
    const { meta } = useAppSelector((state) => state.metaState);
    const [variableName, setVariableName] = useState('');
    const [valueSource, setValueSource] = useState('subject');
    const { processData, setProcessData } = useDashboard();

    // * Functions: Meta Options
    const emailOutputPropertyOptions = getDataStructuresSelect(meta.enums || []);

    // Populate form with existing data
    useEffect(() => {
        if (opened && existingData) {
            setVariableName(existingData.field || '');
            setValueSource(existingData.value || 'subject');
        } else if (opened && !existingData) {
            // Reset form when opening without existing data
            setVariableName('');
            setValueSource('subject');
        }
    }, [opened, existingData]);

    const handleSave = () => {
        // Construct the activity data according to the API schema
        const existingActivity = processData?.activities || [];

        const existingAssignActivities = existingActivity.findIndex(act => act.type === 'assign');

        let updatedActivities;

        if (existingAssignActivities !== -1) {
            updatedActivities = [...existingActivity];
            updatedActivities[existingAssignActivities] = {
                type: 'assign' as const,
                field: variableName,
                value: valueSource
            };
        } else {
            updatedActivities = [
                ...existingActivity,
                {
                    type: 'assign' as const,
                    field: variableName,
                    value: valueSource
                }
            ];
        }

        setProcessData({
            ...processData,
            activities: updatedActivities
        });

        onClose();
    };

    return (
        <Modal opened={opened} onClose={onClose} size="xl" padding={0} centered withCloseButton={false} styles={{ content: { overflow: 'visible' }, body: { padding: 0 } }}>
            <Stack py={20} px={16} gap={24} style={{ borderRadius: '6px 6px 0px 0px' }}>
                <Box>
                    <Group justify="space-between" align="center">
                        <Group gap={12}>
                            <Box style={{ padding: '8px', backgroundColor: `${colors.primary}`, borderRadius: '6px' }}>
                                <Code size={20} color={colors.white} />
                            </Box>
                            <Stack gap={2}>
                                <Text fw={600} size="md" c={colors.textPrimary}>Assign</Text>
                                <Text size="sm" c={colors.textSecondary}>Variable assignment</Text>
                            </Stack>
                        </Group>

                        <Group gap={8}>
                            <CloseButton onClick={onClose} size="md" style={{ color: colors.textSecondary }} />
                        </Group>
                    </Group>
                </Box>

                <Box>
                    <Stack gap={16}>
                        <TextInput label="Variable Name" placeholder="e.g. emailBody" value={variableName} onChange={(e) => setVariableName(e.currentTarget.value)} size="sm" />
                        <Select label="Value Source" data={emailOutputPropertyOptions} value={valueSource} onChange={(v) => setValueSource(v || 'subject')} size="sm" />
                    </Stack>
                </Box>

                <Box>
                    <Group justify="flex-end" gap={12}>
                        <Button variant="outline" size="sm" onClick={onClose} c={colors.textSecondary} style={{ borderColor: colors.light }}>Cancel</Button>
                        <Button variant="filled" size="sm" bg={colors.primary} onClick={handleSave}>Save Activity</Button>
                    </Group>
                </Box>
            </Stack>
        </Modal>
    );
};

export default AssignEmailActivityComponent;
