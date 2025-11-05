'use client';

import { ErpConfigActivity } from '@/types/process.types';
import { colors } from '@/utils/customStyles';
import { getAuthTypesSelect, getRequestMethodsSelect } from '@/utils/meta-helpers';
import { useAppSelector } from '@/store/store';
import {
    Box,
    Button,
    CloseButton,
    Group,
    Modal,
    Select,
    Stack,
    Text,
    TextInput,
    Accordion,
    Switch,
    ActionIcon
} from '@mantine/core';
import { Package, Plus, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ERPConfigActivityState, initialERPConfigActivityState } from '@/types/activities/erp-config-activity.types';
import { useDashboard } from '@/contexts/dashboard-context';

interface ERPConfigActivityProps {
    opened: boolean;
    onClose: () => void;
    onSave?: (activityData: ErpConfigActivity) => void;
    existingData?: any;
}

const ERPConfigActivityComponent = ({ opened, onClose, onSave, existingData }: ERPConfigActivityProps) => {
    const { meta } = useAppSelector((state) => state.metaState);
    const { processData, setProcessData } = useDashboard();
    const [erpConfigActivityStates, setErpConfigActivityStates] = useState<ERPConfigActivityState>(initialERPConfigActivityState);

    // * Functions: Meta Options
    const requestMethodOptions = getRequestMethodsSelect(meta.enums || []);
    const authTypeOptions = getAuthTypesSelect(meta.enums || []);
    // Data structure options available for future body structure configuration
    // const dataStructureOptions = getDataStructuresSelect(meta.enums || []);


    const updateERPConfigState = (key: keyof ERPConfigActivityState, value: any) => {
        setErpConfigActivityStates((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    }

    const updateHeaderRows = (id: number, key: 'name' | 'value', value: string) => {
        const updatedRows = erpConfigActivityStates.headerRows.map((row) => {
            if (row.id === id) {
                return { ...row, [key]: value };
            }
            return row;
        });
        updateERPConfigState('headerRows', updatedRows);
    }

    const updateBodyParams = (id: number, key: 'name' | 'value', value: string) => {
        const updatedParams = erpConfigActivityStates.bodyParams.map((param) => {
            if (param.id === id) {
                return { ...param, [key]: value };
            }
            return param;
        });
        updateERPConfigState('bodyParams', updatedParams);
    }

    // Populate form with existing data
    useEffect(() => {
        if (opened && existingData) {
            setErpConfigActivityStates({
                ...initialERPConfigActivityState,
                endpoint: existingData.endpointUrl || '',
                method: existingData.requestMethod || 'GET',
                timeout: existingData.timeout ? `${existingData.timeout / 1000}s` : '30s',
                authType: existingData.auth?.authType || 'Basic Auth',
                username: existingData.auth?.username || '',
                password: existingData.auth?.password || '',
                headerRows: existingData.headers?.map((header: any, index: number) => ({
                    id: index + 1,
                    name: header.key || '',
                    value: header.value || ''
                })) || [{ id: 1, name: '', value: '' }],
                bodyParams: existingData.params?.map((param: any, index: number) => ({
                    id: index + 1,
                    name: param.key || '',
                    value: param.value || ''
                })) || [{ id: 1, name: '', value: '' }]
            });
        } else if (opened && !existingData) {
            // Reset form when opening without existing data
            setErpConfigActivityStates(initialERPConfigActivityState);
        }
    }, [opened, existingData]);

    const handleSave = () => {
        // Parse timeout to number (remove 's' if present)
        const timeoutValue = parseInt(erpConfigActivityStates.timeout.replace('s', ''));

        // Construct the activity data according to the API schema
        const activityData: ErpConfigActivity = {
            type: 'erp-config',
            endpointUrl: erpConfigActivityStates.endpoint,
            requestMethod: erpConfigActivityStates.method,
            timeout: isNaN(timeoutValue) ? 30000 : timeoutValue * 1000, // Convert to milliseconds
            auth: {
                authType: erpConfigActivityStates.authType,
                username: erpConfigActivityStates.username,
                password: erpConfigActivityStates.password
            },
            headers: erpConfigActivityStates.headerRows.map(row => ({
                key: row.name,
                value: row.value
            })),
            params: erpConfigActivityStates.bodyParams.map(param => ({
                key: param.name,
                value: param.value
            }))
        };

        // Update processData.activities directly
        const existingActivities = processData?.activities || [];
        const existingErpConfigIndex = existingActivities.findIndex(
            (activity) => activity.type === 'erp-config'
        );

        let updatedActivities;

        if (existingErpConfigIndex !== -1) {
            // Update existing erp-config activity
            updatedActivities = existingActivities.map((activity, index) => {
                if (index === existingErpConfigIndex) {
                    return activityData;
                }
                return activity;
            });
        } else {
            // Create new erp-config activity
            updatedActivities = [...existingActivities, activityData];
        }

        setProcessData({
            ...processData,
            activities: updatedActivities
        });

        // Still call onSave callback for backward compatibility
        onSave?.(activityData);

        onClose();
    };

    return (
        <Modal opened={opened} onClose={onClose} size="xl" padding={0} centered withCloseButton={false} styles={{ content: { overflow: 'visible' }, body: { padding: 0 } }}>
            <Stack py={20} px={16} gap={24} style={{ borderRadius: '6px 6px 0px 0px' }}>
                <Box>
                    <Group justify="space-between" align="center">
                        <Group gap={12}>
                            <Box style={{ padding: '8px', backgroundColor: `${colors.primary}`, borderRadius: '6px' }}>
                                <Package size={20} color={colors.white} />
                            </Box>
                            <Stack gap={2}>
                                <Text fw={600} size="md" c={colors.textPrimary}>ERP Configuration</Text>
                                <Text size="sm" c={colors.textSecondary}>HTTP API connection</Text>
                            </Stack>
                        </Group>

                        <Group gap={8}>
                            <CloseButton onClick={onClose} size="md" style={{ color: colors.textSecondary }} />
                        </Group>
                    </Group>
                </Box>

                <Box>
                    <Accordion defaultValue="basic">
                        <Accordion.Item value="basic">
                            <Accordion.Control>Basic Configuration</Accordion.Control>
                            <Accordion.Panel>
                                <Stack gap={12}>
                                    <TextInput
                                        label="Endpoint URL"
                                        placeholder="https://devfirori.ghs.hec.ondemand.com/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS"
                                        value={erpConfigActivityStates.endpoint}
                                        onChange={(e) => updateERPConfigState('endpoint', e.currentTarget.value)}
                                        size="sm"
                                    />

                                    <Group gap="sm">
                                        <Box style={{ flex: 1 }}>
                                            <Select
                                                label="Request Method"
                                                data={requestMethodOptions}
                                                value={erpConfigActivityStates.method}
                                                onChange={(v) => updateERPConfigState('method', v || 'GET')}
                                                size="sm"
                                            />
                                        </Box>
                                        <Box style={{ width: 160 }}>
                                            <TextInput label="Timeout (ms)" placeholder="6000" value={erpConfigActivityStates.timeout} onChange={(e) => updateERPConfigState('timeout', e.currentTarget.value)} size="sm" />
                                        </Box>
                                    </Group>

                                    <Group align="center" gap={8}>
                                        <Switch checked={erpConfigActivityStates.sslVerify} onChange={(e) => updateERPConfigState('sslVerify', e.currentTarget.checked)} />
                                        <Text size="sm" c={colors.textSecondary}>Enable SSL Verification</Text>
                                    </Group>
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="auth">
                            <Accordion.Control>Authentication</Accordion.Control>
                            <Accordion.Panel>
                                <Stack gap={12}>
                                    <Select label="Authentication Type" data={authTypeOptions} value={erpConfigActivityStates.authType} onChange={(v) => updateERPConfigState('authType', v || 'Simple HTTP')} size="sm" />
                                    <TextInput label="Username" placeholder="QBS_ABAP" value={erpConfigActivityStates.username} onChange={(e) => updateERPConfigState('username', e.currentTarget.value)} size="sm" />
                                    <TextInput label="Password" placeholder="password" value={erpConfigActivityStates.password} onChange={(e) => updateERPConfigState('password', e.currentTarget.value)} size="sm" />
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="headers">
                            <Accordion.Control>Header</Accordion.Control>
                            <Accordion.Panel>
                                <Stack gap={12}>
                                    {erpConfigActivityStates.headerRows.map((row) => (
                                        <Group key={row.id} gap={8} >
                                            <TextInput placeholder="Header Name" value={row.name} onChange={(e) => updateHeaderRows(row.id, 'name', e.currentTarget.value)} size="sm" style={{ flex: 1 }} />
                                            <TextInput placeholder="Header Value" value={row.value} onChange={(e) => updateHeaderRows(row.id, 'value', e.currentTarget.value)} size="sm" style={{ flex: 1 }} />
                                            <ActionIcon color="red" onClick={() => updateERPConfigState('headerRows', erpConfigActivityStates.headerRows.filter(r => r.id !== row.id))}>
                                                <X size={16} />
                                            </ActionIcon>
                                        </Group>
                                    ))}

                                    <Group justify="flex-end">
                                        <Button
                                            size="sm"
                                            bg={colors.primary}
                                            c={colors.white}
                                            onClick={() => updateERPConfigState('headerRows', erpConfigActivityStates.headerRows.concat({ id: Date.now() + Math.random(), name: '', value: '' }))}
                                        >
                                            <Plus size={16} />
                                            <span style={{ marginLeft: 8 }}>Add Header</span>
                                        </Button>
                                    </Group>

                                    {/* <Divider /> */}
                                    {/* <Text size="xs" c={colors.textSecondary}>Pre-configured header: x-csrf-token: &quot;fetch&quot;</Text> */}
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="bodyTemplate">
                            <Accordion.Control>Body</Accordion.Control>
                            <Accordion.Panel>
                                <Stack gap={12}>

                                    {erpConfigActivityStates.bodyParams.map((row) => (
                                        <Group key={row.id} gap={8} >
                                            <TextInput placeholder="Parameter Name" value={row.name} onChange={(e) => updateBodyParams(row.id, 'name', e.currentTarget.value)} size="sm" style={{ flex: 1 }} />
                                            <TextInput placeholder="Parameter Value" value={row.value} onChange={(e) => updateBodyParams(row.id, 'value', e.currentTarget.value)} size="sm" style={{ flex: 1 }} />
                                            <ActionIcon color="red" onClick={() => updateERPConfigState('bodyParams', erpConfigActivityStates.bodyParams.filter(r => r.id !== row.id))}>
                                                <X size={16} />
                                            </ActionIcon>
                                        </Group>
                                    ))}
                                    <Group justify="flex-end">
                                        <Button
                                            size="sm"
                                            bg={colors.primary}
                                            c={colors.white}
                                            onClick={() => updateERPConfigState('bodyParams', erpConfigActivityStates.bodyParams.concat({ id: Date.now() + Math.random(), name: '', value: '' }))}
                                        >
                                            <Plus size={16} />
                                            <span style={{ marginLeft: 8 }}>Add Parameter</span>
                                        </Button>
                                    </Group>
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
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

export default ERPConfigActivityComponent;
