'use client';

import { colors } from '@/utils/customStyles';
import {
    Box,
    Collapse,
    Group,
    NumberInput,
    Select,
    Stack,
    Switch,
    Text,
    UnstyledButton,
    TextInput
} from '@mantine/core';
import {
    ChevronDown,
    Mail,
    FileText,
    User,
    Users,
    Calendar,
    Paperclip,
    Settings,
    Lock,
    Eye,
    AlertCircle
} from 'lucide-react';
import { useState } from 'react';

const ReadEmailProperties = () => {
    const [configExpanded, setConfigExpanded] = useState(true);
    const [outputExpanded, setOutputExpanded] = useState(true);

    // Form state
    const [limitEmailsTo, setLimitEmailsTo] = useState<number | string>(11);
    const [includeSubfolders, setIncludeSubfolders] = useState(false);
    const [unreadOnly, setUnreadOnly] = useState(false);
    const [withAttachmentsOnly, setWithAttachmentsOnly] = useState(false);
    const [importance, setImportance] = useState('Any');
    const [markAsRead, setMarkAsRead] = useState(false);

    // Output mapping state
    const [mailSubjectMapping, setMailSubjectMapping] = useState('email.subject');
    const [mailBodyMapping, setMailBodyMapping] = useState('email.body');
    const [senderMapping, setSenderMapping] = useState('email.sender');
    const [recipientsMapping, setRecipientsMapping] = useState('email.recipients');
    const [receivedDateMapping, setReceivedDateMapping] = useState('email.receivedDate');
    const [attachmentsMapping, setAttachmentsMapping] = useState('email.attachments');

    return (
        <Stack gap={16} p={16}>
            {/* Configuration Properties */}
            <Box style={{ border: `1px solid ${colors.tertiary}`, borderRadius: '6px' }}>
                <UnstyledButton
                    onClick={() => setConfigExpanded(!configExpanded)}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderBottom: configExpanded ? `1px solid ${colors.tertiary}` : 'none',
                    }}
                >
                    <Group justify="space-between">
                        <Group gap={8}>
                            <Settings size={16} color={colors.primary} />
                            <Text fw={500} size="sm" c={colors.textPrimary}>
                                Configuration Properties
                            </Text>
                        </Group>
                        <ChevronDown
                            size={16}
                            color={colors.textSecondary}
                            style={{
                                transform: configExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                                transition: 'transform 0.2s ease'
                            }}
                        />
                    </Group>
                </UnstyledButton>

                <Collapse in={configExpanded}>
                    <Stack gap={12} p={16}>
                        {/* Limit Emails To */}
                        <Stack gap={6}>
                            <Group gap={6}>
                                <AlertCircle size={14} color={colors.textSecondary} />
                                <Text size="xs" fw={500} c={colors.textPrimary}>
                                    Limit Emails To
                                </Text>
                            </Group>
                            <NumberInput
                                placeholder="Enter number"
                                value={limitEmailsTo}
                                onChange={setLimitEmailsTo}
                                size="xs"
                                min={1}
                            />
                            <Text size="xs" c={colors.textSecondary}>
                                Maximum number of emails to process
                            </Text>
                        </Stack>

                        {/* Include Subfolders */}
                        <Group justify="space-between" align="center">
                            <Group gap={6}>
                                <FileText size={14} color={colors.textSecondary} />
                                <Stack gap={0}>
                                    <Text size="xs" fw={500} c={colors.textPrimary}>
                                        Include Subfolders
                                    </Text>
                                </Stack>
                            </Group>
                            <Switch
                                checked={includeSubfolders}
                                onChange={(e) => setIncludeSubfolders(e.currentTarget.checked)}
                                size="sm"
                            />
                        </Group>

                        {/* Unread Only */}
                        <Group justify="space-between" align="center">
                            <Group gap={6}>
                                <Eye size={14} color={colors.textSecondary} />
                                <Stack gap={0}>
                                    <Text size="xs" fw={500} c={colors.textPrimary}>
                                        Unread Only
                                    </Text>
                                </Stack>
                            </Group>
                            <Switch
                                checked={unreadOnly}
                                onChange={(e) => setUnreadOnly(e.currentTarget.checked)}
                                size="sm"
                            />
                        </Group>

                        {/* With Attachments Only */}
                        <Group justify="space-between" align="center">
                            <Group gap={6}>
                                <Paperclip size={14} color={colors.textSecondary} />
                                <Stack gap={0}>
                                    <Text size="xs" fw={500} c={colors.textPrimary}>
                                        With Attachments Only
                                    </Text>
                                </Stack>
                            </Group>
                            <Switch
                                checked={withAttachmentsOnly}
                                onChange={(e) => setWithAttachmentsOnly(e.currentTarget.checked)}
                                size="sm"
                            />
                        </Group>

                        {/* Importance */}
                        <Stack gap={6}>
                            <Group gap={6}>
                                <AlertCircle size={14} color={colors.textSecondary} />
                                <Text size="xs" fw={500} c={colors.textPrimary}>
                                    Importance
                                </Text>
                            </Group>
                            <Select
                                size="xs"
                                data={['Any', 'Low', 'Normal', 'High']}
                                value={importance}
                                onChange={(v) => setImportance(v || 'Any')}
                                styles={{
                                    input: {
                                        fontSize: '12px',
                                        borderColor: colors.tertiary
                                    }
                                }}
                            />
                        </Stack>

                        {/* Mark as Read */}
                        <Group justify="space-between" align="center">
                            <Group gap={6}>
                                <Lock size={14} color={colors.textSecondary} />
                                <Stack gap={0}>
                                    <Text size="xs" fw={500} c={colors.textPrimary}>
                                        Mark as Read
                                    </Text>
                                </Stack>
                            </Group>
                            <Switch
                                checked={markAsRead}
                                onChange={(e) => setMarkAsRead(e.currentTarget.checked)}
                                size="sm"
                            />
                        </Group>

                        {/* Output: Number of emails processed */}
                        <Stack gap={6}>
                            <Group gap={6}>
                                <Mail size={14} color={colors.textSecondary} />
                                <Text size="xs" fw={500} c={colors.textPrimary}>
                                    Output: Number of emails processed
                                </Text>
                            </Group>
                            <Group grow>
                                <TextInput
                                    placeholder="Emails processed"
                                    size="xs"
                                    disabled
                                    value="Emails processed"
                                />
                                <TextInput
                                    placeholder="Number"
                                    size="xs"
                                    disabled
                                    value="Number"
                                />
                            </Group>
                        </Stack>
                    </Stack>
                </Collapse>
            </Box>

            {/* Output Properties */}
            <Box style={{ border: `1px solid ${colors.tertiary}`, borderRadius: '6px' }}>
                <UnstyledButton
                    onClick={() => setOutputExpanded(!outputExpanded)}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderBottom: outputExpanded ? `1px solid ${colors.tertiary}` : 'none',
                    }}
                >
                    <Group justify="space-between">
                        <Group gap={8}>
                            <FileText size={16} color={colors.primary} />
                            <Text fw={500} size="sm" c={colors.textPrimary}>
                                Output Properties
                            </Text>
                        </Group>
                        <ChevronDown
                            size={16}
                            color={colors.textSecondary}
                            style={{
                                transform: outputExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                                transition: 'transform 0.2s ease'
                            }}
                        />
                    </Group>
                </UnstyledButton>

                <Collapse in={outputExpanded}>
                    <Stack gap={12} p={16}>
                        {/* Email Properties */}
                        <Stack gap={8}>
                            <Group gap={8}>
                                <Mail size={16} color={colors.primary} />
                                <Text size="sm" fw={500} c={colors.textPrimary}>
                                    Email Properties
                                </Text>
                            </Group>

                            <Stack gap={6} pl={24}>
                                {/* Mail Subject */}
                                <Group gap={8} align="flex-start">
                                    <FileText size={14} color={colors.textSecondary} style={{ minWidth: '14px', marginTop: '4px' }} />
                                    <Text size="xs" c={colors.textSecondary} style={{ minWidth: '80px' }}>
                                        Mail Subject
                                    </Text>
                                    <TextInput
                                        placeholder="Mapped variable"
                                        size="xs"
                                        value={mailSubjectMapping}
                                        onChange={(e) => setMailSubjectMapping(e.currentTarget.value)}
                                        style={{ flex: 1 }}
                                    />
                                    <Text size="xs" c={colors.textSecondary} style={{ padding: '6px 8px', background: '#f1f5f9', borderRadius: 4 }}>
                                        String
                                    </Text>
                                </Group>

                                {/* Mail Body */}
                                <Group gap={8} align="flex-start">
                                    <FileText size={14} color={colors.textSecondary} style={{ minWidth: '14px', marginTop: '4px' }} />
                                    <Text size="xs" c={colors.textSecondary} style={{ minWidth: '80px' }}>
                                        Mail Body
                                    </Text>
                                    <TextInput
                                        placeholder="Mapped variable"
                                        size="xs"
                                        value={mailBodyMapping}
                                        onChange={(e) => setMailBodyMapping(e.currentTarget.value)}
                                        style={{ flex: 1 }}
                                    />
                                    <Text size="xs" c={colors.textSecondary} style={{ padding: '6px 8px', background: '#f1f5f9', borderRadius: 4 }}>
                                        String
                                    </Text>
                                </Group>

                                {/* Sender Address */}
                                <Group gap={8} align="flex-start">
                                    <User size={14} color={colors.textSecondary} style={{ minWidth: '14px', marginTop: '4px' }} />
                                    <Text size="xs" c={colors.textSecondary} style={{ minWidth: '80px' }}>
                                        Sender Address
                                    </Text>
                                    <TextInput
                                        placeholder="Mapped variable"
                                        size="xs"
                                        value={senderMapping}
                                        onChange={(e) => setSenderMapping(e.currentTarget.value)}
                                        style={{ flex: 1 }}
                                    />
                                    <Text size="xs" c={colors.textSecondary} style={{ padding: '6px 8px', background: '#f1f5f9', borderRadius: 4 }}>
                                        String
                                    </Text>
                                </Group>

                                {/* Recipients */}
                                <Group gap={8} align="flex-start">
                                    <Users size={14} color={colors.textSecondary} style={{ minWidth: '14px', marginTop: '4px' }} />
                                    <Text size="xs" c={colors.textSecondary} style={{ minWidth: '80px' }}>
                                        Recipients (To/CC/BCC)
                                    </Text>
                                    <TextInput
                                        placeholder="Mapped variable"
                                        size="xs"
                                        value={recipientsMapping}
                                        onChange={(e) => setRecipientsMapping(e.currentTarget.value)}
                                        style={{ flex: 1 }}
                                    />
                                    <Text size="xs" c={colors.textSecondary} style={{ padding: '6px 8px', background: '#f1f5f9', borderRadius: 4 }}>
                                        Array
                                    </Text>
                                </Group>

                                {/* Received Date/Time */}
                                <Group gap={8} align="flex-start">
                                    <Calendar size={14} color={colors.textSecondary} style={{ minWidth: '14px', marginTop: '4px' }} />
                                    <Text size="xs" c={colors.textSecondary} style={{ minWidth: '80px' }}>
                                        Received Date/Time
                                    </Text>
                                    <TextInput
                                        placeholder="Mapped variable"
                                        size="xs"
                                        value={receivedDateMapping}
                                        onChange={(e) => setReceivedDateMapping(e.currentTarget.value)}
                                        style={{ flex: 1 }}
                                    />
                                    <Text size="xs" c={colors.textSecondary} style={{ padding: '6px 8px', background: '#f1f5f9', borderRadius: 4 }}>
                                        Date/Time
                                    </Text>
                                </Group>

                                {/* Attachments */}
                                <Group gap={8} align="flex-start">
                                    <Paperclip size={14} color={colors.textSecondary} style={{ minWidth: '14px', marginTop: '4px' }} />
                                    <Text size="xs" c={colors.textSecondary} style={{ minWidth: '80px' }}>
                                        Attachments
                                    </Text>
                                    <TextInput
                                        placeholder="Mapped variable"
                                        size="xs"
                                        value={attachmentsMapping}
                                        onChange={(e) => setAttachmentsMapping(e.currentTarget.value)}
                                        style={{ flex: 1 }}
                                    />
                                    <Text size="xs" c={colors.textSecondary} style={{ padding: '6px 8px', background: '#f1f5f9', borderRadius: 4 }}>
                                        Array
                                    </Text>
                                </Group>
                            </Stack>
                        </Stack>

                        {/* Map Output To */}
                        <Stack gap={8} pt={8} style={{ borderTop: `1px solid ${colors.tertiary}` }}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>
                                Map Output To
                            </Text>
                            <Stack gap={8} pl={12}>
                                <Group align="center">
                                    <FileText size={14} color={colors.textSecondary} />
                                    <Text size="xs" c={colors.textPrimary} style={{ minWidth: '80px' }}>
                                        Mail Subject
                                    </Text>
                                    <TextInput
                                        placeholder="email.subject"
                                        size="xs"
                                        value={mailSubjectMapping}
                                        onChange={(e) => setMailSubjectMapping(e.currentTarget.value)}
                                        style={{ flex: 1 }}
                                    />
                                </Group>
                                <Group align="center">
                                    <FileText size={14} color={colors.textSecondary} />
                                    <Text size="xs" c={colors.textPrimary} style={{ minWidth: '80px' }}>
                                        Mail Body
                                    </Text>
                                    <TextInput
                                        placeholder="email.body"
                                        size="xs"
                                        value={mailBodyMapping}
                                        onChange={(e) => setMailBodyMapping(e.currentTarget.value)}
                                        style={{ flex: 1 }}
                                    />
                                </Group>
                                <Group align="center">
                                    <User size={14} color={colors.textSecondary} />
                                    <Text size="xs" c={colors.textPrimary} style={{ minWidth: '80px' }}>
                                        Sender
                                    </Text>
                                    <TextInput
                                        placeholder="email.sender"
                                        size="xs"
                                        value={senderMapping}
                                        onChange={(e) => setSenderMapping(e.currentTarget.value)}
                                        style={{ flex: 1 }}
                                    />
                                </Group>
                                <Group align="center">
                                    <Users size={14} color={colors.textSecondary} />
                                    <Text size="xs" c={colors.textPrimary} style={{ minWidth: '80px' }}>
                                        Recipients
                                    </Text>
                                    <TextInput
                                        placeholder="email.recipients"
                                        size="xs"
                                        value={recipientsMapping}
                                        onChange={(e) => setRecipientsMapping(e.currentTarget.value)}
                                        style={{ flex: 1 }}
                                    />
                                </Group>
                                <Group align="center">
                                    <Calendar size={14} color={colors.textSecondary} />
                                    <Text size="xs" c={colors.textPrimary} style={{ minWidth: '80px' }}>
                                        Received Date
                                    </Text>
                                    <TextInput
                                        placeholder="email.receivedDate"
                                        size="xs"
                                        value={receivedDateMapping}
                                        onChange={(e) => setReceivedDateMapping(e.currentTarget.value)}
                                        style={{ flex: 1 }}
                                    />
                                </Group>
                                <Group align="center">
                                    <Paperclip size={14} color={colors.textSecondary} />
                                    <Text size="xs" c={colors.textPrimary} style={{ minWidth: '80px' }}>
                                        Attachments
                                    </Text>
                                    <TextInput
                                        placeholder="email.attachments"
                                        size="xs"
                                        value={attachmentsMapping}
                                        onChange={(e) => setAttachmentsMapping(e.currentTarget.value)}
                                        style={{ flex: 1 }}
                                    />
                                </Group>
                            </Stack>
                        </Stack>
                    </Stack>
                </Collapse>
            </Box>
        </Stack>
    );
};

export default ReadEmailProperties;
