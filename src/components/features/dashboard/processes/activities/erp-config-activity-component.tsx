'use client';

import { ERPConfigActivityState, initialERPConfigActivityState } from '@/types/erp-config-activity.types';
import { colors } from '@/utils/customStyles';
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
import { useState } from 'react';

interface ERPConfigActivityProps {
    opened: boolean;
    onClose: () => void;
}

const ERPConfigActivityComponent = ({ opened, onClose }: ERPConfigActivityProps) => {
    const [erpConfigActivityStates, setErpConfigActivityStates] = useState<ERPConfigActivityState>(initialERPConfigActivityState);


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

    const handleSave = () => {
        // TODO: persist into node data
        console.log('Save ERP config', erpConfigActivityStates);
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
                                                data={["GET", "POST", "PUT", "DELETE"]}
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
                                    <Select label="Authentication Type" data={["Simple HTTP", "OAuth2"]} value={erpConfigActivityStates.authType} onChange={(v) => updateERPConfigState('authType', v || 'Simple HTTP')} size="sm" />
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
