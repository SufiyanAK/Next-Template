'use client';

import { ClientCertificateStates, CommonStates, ERPConfigPropertiesProps, initialClientCertificateStates, initialCommonStates, initialExpandedParameters, initialInputStates, initialOAuth1States, initialOAuth2States, initialOptionsStates, initialOutputStates, initialSimpleAuthStates, InputStates, OAuth1States, OAuth2States, OptionsStates, OutputStates, Parameter, SimpleAuthStates } from '@/types/properties/erp-config-properties.types';
import { colors } from '@/utils/customStyles';
import {
    Box,
    Collapse,
    Group,
    Select,
    Stack,
    Switch,
    Text,
    UnstyledButton,
    TextInput,
    ActionIcon
} from '@mantine/core';
import {
    ChevronDown,
    Settings,
    Lock,
    FileText,
    Code,
    Shield,
    Key,
    AlertCircle,
    Plus,
    X
} from 'lucide-react';
import { useState } from 'react';

const ERPConfigProperties = () => {
    const [expandedParameters, setExpandedParameters] = useState<ERPConfigPropertiesProps>(initialExpandedParameters);

    // Client Certificate Authentication
    const [clientCertificateStates, setClientCertificateStates] = useState<ClientCertificateStates>(initialClientCertificateStates);

    // Common
    const [commonStates, setCommonStates] = useState<CommonStates>(initialCommonStates);

    // Input
    const [inputStates, setInputStates] = useState<InputStates>(initialInputStates);

    // Misc
    const [private_, setPrivate_] = useState(false);

    // OAuth1
    const [oauth1States, setOAuth1States] = useState<OAuth1States>(initialOAuth1States);

    // OAuth2
    const [oauth2States, setOAuth2States] = useState<OAuth2States>(initialOAuth2States);

    // Options
    const [optionsStates, setOptionsStates] = useState<OptionsStates>(initialOptionsStates);

    // Output
    const [outputStates, setOutputStates] = useState<OutputStates>(initialOutputStates);

    // Simple Authentication
    const [simpleAuthState, setSimpleAuthState] = useState<SimpleAuthStates>(initialSimpleAuthStates);

    // * Function: Toggle expand/collapse sections
    const toggleExpand = (section: keyof ERPConfigPropertiesProps) => {
        setExpandedParameters((prev) => ({
            ...prev,
            [section]: !prev[section]
        }));
    }

    // * Functions: Client Certificate Section
    const updateClientCertificateStates = (newState: Partial<ClientCertificateStates>) => {
        setClientCertificateStates((prev) => ({
            ...prev,
            ...newState
        }));
    }

    // * Functions: Common Section
    const updateCommonStates = (newState: Partial<CommonStates>) => {
        setCommonStates((prev) => ({
            ...prev,
            ...newState
        }));
    }

    // * Functions: Input Section
    const updateInputStates = (newState: Partial<InputStates>) => {
        setInputStates((prev) => ({
            ...prev,
            ...newState
        }));
    }

    // * Functions: OAuth1 Section
    const updateOAuth1States = (newState: Partial<OAuth1States>) => {
        setOAuth1States((prev) => ({
            ...prev,
            ...newState
        }));
    }

    // * Functions: OAuth2 Section
    const updateOAuth2States = (newState: Partial<OAuth2States>) => {
        setOAuth2States((prev) => ({
            ...prev,
            ...newState
        }));
    }

    // * Functions: Options Section
    const updateOptionsStates = (newState: Partial<OptionsStates>) => {
        setOptionsStates((prev) => ({
            ...prev,
            ...newState
        }));
    }

    // * Functions: Output Section
    const updateOutputStates = (newState: Partial<OutputStates>) => {
        setOutputStates((prev) => ({
            ...prev,
            ...newState
        }));
    }

    // * Functions: Simple Authentication Section
    const updateSimpleAuthStates = (newState: Partial<SimpleAuthStates>) => {
        setSimpleAuthState((prev) => ({
            ...prev,
            ...newState
        }));
    }

    // * Functions: Parameters Section
    const addParameter = (field: keyof OptionsStates) => {
        setOptionsStates((prev) => ({
            ...prev,
            [field]: [...(prev[field] || []), {
                id: Date.now().toString(),
                name: '',
                value: ''
            }]
        }));
    };

    const removeParameter = (field: keyof OptionsStates, id: string) => {
        setOptionsStates((prev) => ({
            ...prev,
            [field]: Array.isArray(prev[field]) ? prev[field].filter((p: Parameter) => p.id !== id) : []
        }));
    };

    const updateParameter = (field: keyof OptionsStates, id: string, paramField: 'name' | 'value', newValue: string) => {
        setOptionsStates((prev) => ({
            ...prev,
            [field]: Array.isArray(prev[field]) ? prev[field].map((p: Parameter) =>
                p.id === id ? { ...p, [paramField]: newValue } : p
            ) : []
        }));
    };

    const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
        <Group gap={8}>
            <Icon size={16} color={colors.primary} />
            <Text fw={500} size="sm" c={colors.textPrimary}>
                {title}
            </Text>
        </Group>
    );

    const ParameterInput = ({ field }: { field: keyof OptionsStates }) => {
        const params = (optionsStates[field] as Parameter[]) || [];
        return (
            <Stack gap={8}>
                {params.map((param) => (
                    <Group key={param.id} gap={8}>
                        <TextInput
                            placeholder="Name"
                            value={param.name}
                            onChange={(e) => updateParameter(field, param.id, 'name', e.currentTarget.value)}
                            size="xs"
                            style={{ flex: 1 }}
                        />
                        <TextInput
                            placeholder="Value"
                            value={param.value}
                            onChange={(e) => updateParameter(field, param.id, 'value', e.currentTarget.value)}
                            size="xs"
                            style={{ flex: 1 }}
                        />
                        <ActionIcon
                            size="sm"
                            onClick={() => removeParameter(field, param.id)}
                            style={{ background: colors.red }}
                        >
                            <X size={14} />
                        </ActionIcon>
                    </Group>
                ))}
            </Stack>
        );
    };

    return (
        <Stack gap={12} p={16}>
            {/* Client Certificate Authentication */}
            <Box style={{ border: `1px solid ${colors.tertiary}`, borderRadius: '6px' }}>
                <UnstyledButton
                    onClick={() => toggleExpand('clientCertExpanded')}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderBottom: expandedParameters.clientCertExpanded ? `1px solid ${colors.tertiary}` : 'none',
                    }}
                >
                    <Group justify="space-between">
                        <SectionHeader icon={Lock} title="Client Certificate Authentication" />
                        <ChevronDown size={16} color={colors.textSecondary} style={{ transform: expandedParameters.clientCertExpanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }} />
                    </Group>
                </UnstyledButton>
                <Collapse in={expandedParameters.clientCertExpanded}>
                    <Stack gap={12} p={16}>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Client Certificate</Text>
                            <TextInput placeholder="Upload certificate file" size="xs" value={clientCertificateStates.clientCertFile} onChange={(e) => updateClientCertificateStates({ clientCertFile: e.currentTarget.value })} />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Client Certificate Password</Text>
                            <TextInput placeholder="Enter a VB expression" type="password" size="xs" value={clientCertificateStates.clientCertPass} onChange={(e) => updateClientCertificateStates({ clientCertPass: e.currentTarget.value })} />
                        </Stack>
                        <Group justify="space-between" align="center"><Text size="xs" fw={500} c={colors.textPrimary}>Enable SSL Client Certificate Validation</Text><Switch checked={clientCertificateStates.enableSSLValidation} onChange={(e) => updateClientCertificateStates({ enableSSLValidation: e.currentTarget.checked })} size="sm" /></Group>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Secure Client Certificate Password</Text>
                            <TextInput placeholder="Enter a VB expression" type="password" size="xs" value={clientCertificateStates.secureClientPassword} onChange={(e) => updateClientCertificateStates({ secureClientPassword: e.currentTarget.value })} />
                        </Stack>
                    </Stack>
                </Collapse>
            </Box>

            {/* Common */}
            <Box style={{ border: `1px solid ${colors.tertiary}`, borderRadius: '6px' }}>
                <UnstyledButton onClick={() => toggleExpand('commonExpanded')} style={{ width: '100%', padding: '12px', borderBottom: expandedParameters.commonExpanded ? `1px solid ${colors.tertiary}` : 'none' }}>
                    <Group justify="space-between">
                        <SectionHeader icon={Settings} title="Common" />
                        <ChevronDown size={16} color={colors.textSecondary} style={{ transform: expandedParameters.commonExpanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }} />
                    </Group>
                </UnstyledButton>
                <Collapse in={expandedParameters.commonExpanded}>
                    <Stack gap={12} p={16}>
                        <Group justify="space-between" align="center">
                            <Text size="xs" fw={500} c={colors.textPrimary}>Continue On Error</Text>
                            <Switch checked={commonStates.continueOnError} onChange={(e) => updateCommonStates({ continueOnError: e.currentTarget.checked })} size="sm" />
                        </Group>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Delay Name</Text>
                            <TextInput placeholder="Call Get Method" size="xs" value={commonStates.callGetMethod} onChange={(e) => updateCommonStates({ callGetMethod: e.currentTarget.value })} />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Timeout (milliseconds)</Text>
                            <TextInput placeholder="6000" size="xs" value={commonStates.timeout} onChange={(e) => updateCommonStates({ timeout: e.currentTarget.value })} />
                        </Stack>
                    </Stack>
                </Collapse>
            </Box>

            {/* Input */}
            <Box style={{ border: `1px solid ${colors.tertiary}`, borderRadius: '6px' }}>
                <UnstyledButton onClick={() => toggleExpand('inputExpanded')} style={{ width: '100%', padding: '12px', borderBottom: expandedParameters.inputExpanded ? `1px solid ${colors.tertiary}` : 'none' }}>
                    <Group justify="space-between">
                        <SectionHeader icon={FileText} title="Input" />
                        <ChevronDown size={16} color={colors.textSecondary} style={{ transform: expandedParameters.inputExpanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }} />
                    </Group>
                </UnstyledButton>
                <Collapse in={expandedParameters.inputExpanded}>
                    <Stack gap={12} p={16}>
                        <Stack gap={6}><Text size="xs" fw={500} c={colors.textPrimary}>Accept Format</Text>
                            <TextInput placeholder="application/json" size="xs" value={inputStates.acceptFormat} onChange={(e) => updateInputStates({ acceptFormat: e.currentTarget.value })} />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Request Method</Text>
                            <Select size="xs" data={['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']} value={inputStates.requestMethod} onChange={(v) => updateInputStates({ requestMethod: v || 'GET' })} />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Request URL</Text>
                            <TextInput placeholder="https://api.workflow.gre.net/ondemand/api/api..." size="xs" value={inputStates.requestUrl} onChange={(e) => updateInputStates({ requestUrl: e.currentTarget.value })} />
                        </Stack>
                    </Stack>
                </Collapse>
            </Box>

            {/* Misc */}
            <Box style={{ border: `1px solid ${colors.tertiary}`, borderRadius: '6px' }}>
                <UnstyledButton onClick={() => toggleExpand('miscExpanded')} style={{ width: '100%', padding: '12px', borderBottom: expandedParameters.miscExpanded ? `1px solid ${colors.tertiary}` : 'none' }}>
                    <Group justify="space-between">
                        <SectionHeader icon={AlertCircle} title="Misc" />
                        <ChevronDown size={16} color={colors.textSecondary} style={{ transform: expandedParameters.miscExpanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }} />
                    </Group>
                </UnstyledButton>
                <Collapse in={expandedParameters.miscExpanded}>
                    <Stack gap={12} p={16}>
                        <Group justify="space-between" align="center">
                            <Text size="xs" fw={500} c={colors.textPrimary}>Private</Text>
                            <Switch checked={private_} onChange={(e) => setPrivate_(e.currentTarget.checked)} size="sm" />
                        </Group>
                    </Stack>
                </Collapse>
            </Box>

            {/* OAuth1 */}
            <Box style={{ border: `1px solid ${colors.tertiary}`, borderRadius: '6px' }}>
                <UnstyledButton onClick={() => toggleExpand('oauth1Expanded')} style={{ width: '100%', padding: '12px', borderBottom: expandedParameters.oauth1Expanded ? `1px solid ${colors.tertiary}` : 'none' }}>
                    <Group justify="space-between">
                        <SectionHeader icon={Key} title="OAuth1" />
                        <ChevronDown size={16} color={colors.textSecondary} style={{ transform: expandedParameters.oauth1Expanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }} />
                    </Group>
                </UnstyledButton>
                <Collapse in={expandedParameters.oauth1Expanded}>
                    <Stack gap={12} p={16}>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Consumer</Text>
                            <TextInput placeholder="The key used by the customer" size="xs" value={oauth1States?.oauth1Consumer} onChange={(e) => updateOAuth1States({ oauth1Consumer: e.currentTarget.value })} />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Consumer Secret</Text>
                            <TextInput placeholder="The secret used by the customer" type="password" size="xs" value={oauth1States?.oauth1ConsumerSecret} onChange={(e) => updateOAuth1States({ oauth1ConsumerSecret: e.currentTarget.value })} />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>OAuth1 Token</Text>
                            <TextInput placeholder="The token used to access protected" size="xs" value={oauth1States?.oauth1Token} onChange={(e) => updateOAuth1States({ oauth1Token: e.currentTarget.value })} />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>OAuth1 Token Secret</Text>
                            <TextInput placeholder="The secret associated with token protected" type="password" size="xs" value={oauth1States?.oauth1TokenSecret} onChange={(e) => updateOAuth1States({ oauth1TokenSecret: e.currentTarget.value })} />
                        </Stack>
                    </Stack>
                </Collapse>
            </Box>

            {/* OAuth2 */}
            <Box style={{ border: `1px solid ${colors.tertiary}`, borderRadius: '6px' }}>
                <UnstyledButton onClick={() => toggleExpand('oauth2Expanded')} style={{ width: '100%', padding: '12px', borderBottom: expandedParameters.oauth2Expanded ? `1px solid ${colors.tertiary}` : 'none' }}>
                    <Group justify="space-between">
                        <SectionHeader icon={Shield} title="OAuth2" />
                        <ChevronDown size={16} color={colors.textSecondary} style={{ transform: expandedParameters.oauth2Expanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }} />
                    </Group>
                </UnstyledButton>
                <Collapse in={expandedParameters.oauth2Expanded}>
                    <Stack gap={12} p={16}>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>OAuth2 Token</Text>
                            <TextInput placeholder="The token used for authentication" size="xs" value={oauth2States?.oauth2Token} onChange={(e) => updateOAuth2States({ oauth2Token: e.currentTarget.value })} />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>OAuth2 Token Secret</Text>
                            <TextInput placeholder="The secret associated with token protected" type="password" size="xs" value={oauth2States?.oauth2TokenSecret} onChange={(e) => updateOAuth2States({ oauth2TokenSecret: e.currentTarget.value })} />
                        </Stack>
                    </Stack>
                </Collapse>
            </Box>

            {/* Options */}
            <Box style={{ border: `1px solid ${colors.tertiary}`, borderRadius: '6px' }}>
                <UnstyledButton onClick={() => toggleExpand('optionsExpanded')} style={{ width: '100%', padding: '12px', borderBottom: expandedParameters.optionsExpanded ? `1px solid ${colors.tertiary}` : 'none' }}>
                    <Group justify="space-between">
                        <SectionHeader icon={Code} title="Options" />
                        <ChevronDown size={16} color={colors.textSecondary} style={{ transform: expandedParameters.optionsExpanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }} />
                    </Group>
                </UnstyledButton>
                <Collapse in={expandedParameters.optionsExpanded}>
                    <Stack gap={12} p={16}>
                        <Stack gap={6}>
                            <Group justify="space-between">
                                <Text size="xs" fw={500} c={colors.textPrimary}>Attachment(s)</Text>
                                <Text size="xs" c={colors.textSecondary}>(Collection)</Text>
                            </Group>
                            <ActionIcon size="sm" onClick={() => addParameter('attachments')} style={{ background: colors.primary, color: colors.white }}>
                                <Plus size={14} />
                            </ActionIcon>
                            <ParameterInput field="attachments" />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Body</Text>
                            <TextInput placeholder="Enter a VB expression" size="xs" value={optionsStates.body} onChange={(e) => updateOptionsStates({ body: e.currentTarget.value })} />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Body Format</Text>
                            <Select size="xs" data={['application/json', 'application/xml', 'text/plain', 'application/x-www-form-urlencoded']} value={optionsStates.bodyFormat} onChange={(v) => updateOptionsStates({ bodyFormat: v || '' })} />
                        </Stack>
                        <Stack gap={6}>
                            <Group justify="space-between">
                                <Text size="xs" fw={500} c={colors.textPrimary}>Cookie(s)</Text>
                                <Text size="xs" c={colors.textSecondary}>(Collection)</Text>
                            </Group>
                            <ActionIcon size="sm" onClick={() => addParameter('cookies')} style={{ background: colors.primary, color: colors.white }}>
                                <Plus size={14} />
                            </ActionIcon>
                            <ParameterInput field="cookies" />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>File Attachments</Text>
                            <TextInput placeholder="Enter a VB expression" size="xs" value={optionsStates.fileAttachments} onChange={(e) => updateOptionsStates({ fileAttachments: e.currentTarget.value })} />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Filename for Response Attachment</Text>
                            <TextInput placeholder="The file name of the attachment" size="xs" value={optionsStates.fileAttachmentName} onChange={(e) => updateOptionsStates({ fileAttachmentName: e.currentTarget.value })} />
                        </Stack>
                        <Stack gap={6}>
                            <Group justify="space-between">
                                <Text size="xs" fw={500} c={colors.textPrimary}>Header(s)</Text>
                                <Text size="xs" c={colors.textSecondary}>(Collection)</Text>
                            </Group>
                            <ActionIcon size="sm" onClick={() => addParameter('header')} style={{ background: colors.primary, color: colors.white }}>
                                <Plus size={14} />
                            </ActionIcon>
                            <ParameterInput field="header" />
                        </Stack>
                        <Stack gap={6}>
                            <Group justify="space-between">
                                <Text size="xs" fw={500} c={colors.textPrimary}>Parameter(s)</Text>
                                <Text size="xs" c={colors.textSecondary}>(Collection)</Text>
                            </Group>
                            <ActionIcon size="sm" onClick={() => addParameter('parameters')} style={{ background: colors.primary, color: colors.white }}>
                                <Plus size={14} />
                            </ActionIcon>
                            <ParameterInput field="parameters" />
                        </Stack>
                        <Stack gap={6}>
                            <Group justify="space-between">
                                <Text size="xs" fw={500} c={colors.textPrimary}>URL Segment(s)</Text>
                                <Text size="xs" c={colors.textSecondary}>(Collection)</Text>
                            </Group>
                            <ActionIcon size="sm" onClick={() => addParameter('urlSegments')} style={{ background: colors.primary, color: colors.white }}>
                                <Plus size={14} />
                            </ActionIcon>
                            <ParameterInput field="urlSegments" />
                        </Stack>
                    </Stack>
                </Collapse>
            </Box>

            {/* Output */}
            <Box style={{ border: `1px solid ${colors.tertiary}`, borderRadius: '6px' }}>
                <UnstyledButton onClick={() => toggleExpand('outputExpanded')} style={{ width: '100%', padding: '12px', borderBottom: expandedParameters.outputExpanded ? `1px solid ${colors.tertiary}` : 'none' }}>
                    <Group justify="space-between">
                        <SectionHeader icon={FileText} title="Output" />
                        <ChevronDown size={16} color={colors.textSecondary} style={{ transform: expandedParameters.outputExpanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }} />
                    </Group>
                </UnstyledButton>
                <Collapse in={expandedParameters.outputExpanded}>
                    <Stack gap={12} p={16}>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Headers</Text>
                            <TextInput placeholder="GetToJson-Response" size="xs" value={outputStates.outputHeaders} onChange={(e) => updateOutputStates({ outputHeaders: e.currentTarget.value })} />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Response Attachment</Text>
                            <TextInput placeholder="(Optional)" size="xs" value={outputStates.responseAttachment} onChange={(e) => updateOutputStates({ responseAttachment: e.currentTarget.value })} />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Response Content</Text>
                            <TextInput placeholder="GetToJson-Response" size="xs" value={outputStates.responseContent} onChange={(e) => updateOutputStates({ responseContent: e.currentTarget.value })} />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Response Status</Text>
                            <TextInput placeholder="GetToJson-Status" size="xs" value={outputStates.responseStatus} onChange={(e) => updateOutputStates({ responseStatus: e.currentTarget.value })} />
                        </Stack>
                    </Stack>
                </Collapse>
            </Box>

            {/* Simple Authentication */}
            <Box style={{ border: `1px solid ${colors.tertiary}`, borderRadius: '6px' }}>
                <UnstyledButton onClick={() => toggleExpand('simpleAuthExpanded')} style={{ width: '100%', padding: '12px', borderBottom: expandedParameters.simpleAuthExpanded ? `1px solid ${colors.tertiary}` : 'none' }}>
                    <Group justify="space-between">
                        <SectionHeader icon={Lock} title="Simple Authentication" />
                        <ChevronDown size={16} color={colors.textSecondary} style={{ transform: expandedParameters.simpleAuthExpanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s ease' }} />
                    </Group>
                </UnstyledButton>
                <Collapse in={expandedParameters.simpleAuthExpanded}>
                    <Stack gap={12} p={16}>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Password</Text>
                            <TextInput placeholder="The password for authentication" type="password" size="xs" value={simpleAuthState.simplePassword} onChange={(e) => updateSimpleAuthStates({ simplePassword: e.currentTarget.value })} />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Secure Password</Text>
                            <TextInput placeholder="New System.Security.SecureString" type="password" size="xs" value={simpleAuthState.securePassword} onChange={(e) => updateSimpleAuthStates({ securePassword: e.currentTarget.value })} />
                        </Stack>
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>Username</Text>
                            <TextInput placeholder="OES_ADMIN" size="xs" value={simpleAuthState.simpleUsername} onChange={(e) => updateSimpleAuthStates({ simpleUsername: e.currentTarget.value })} />
                        </Stack>
                    </Stack>
                </Collapse>
            </Box>
        </Stack>
    );
};

export default ERPConfigProperties;
