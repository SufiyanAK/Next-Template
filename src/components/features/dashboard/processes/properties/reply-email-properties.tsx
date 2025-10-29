'use client';

import { colors } from '@/utils/customStyles';
import {
    Box,
    Collapse,
    Group,
    Select,
    Stack,
    Text,
    UnstyledButton,
    TextInput,
    ActionIcon
} from '@mantine/core';
import {
    ChevronDown,
    Plus,
    X
} from 'lucide-react';
import { useState } from 'react';

const ReplyEmailProperties = () => {
    const [configExpanded, setConfigExpanded] = useState(true);
    const [recipientsExpanded, setRecipientsExpanded] = useState(true);

    // Form state
    const [attachments, setAttachments] = useState<string[]>([]);
    const [newSubject, setNewSubject] = useState('');
    const [preferredTimezone, setPreferredTimezone] = useState('(UTC) Coordinated Universal Time');
    const [importance, setImportance] = useState('Normal');
    const [attachmentInput, setAttachmentInput] = useState('');
    const [toList, setToList] = useState<string[]>([]);
    const [ccList, setCcList] = useState<string[]>([]);
    const [bccList, setBccList] = useState<string[]>([]);
    const [toInput, setToInput] = useState('');
    const [ccInput, setCcInput] = useState('');
    const [bccInput, setBccInput] = useState('');

    const addAttachment = () => {
        if (attachmentInput.trim()) {
            setAttachments(prev => [...prev, attachmentInput.trim()]);
            setAttachmentInput('');
        }
    };

    const removeAttachment = (idx: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== idx));
    };

    const addRecipient = (type: 'to' | 'cc' | 'bcc') => {
        if (type === 'to' && toInput.trim()) {
            setToList(prev => [...prev, toInput.trim()]);
            setToInput('');
        } else if (type === 'cc' && ccInput.trim()) {
            setCcList(prev => [...prev, ccInput.trim()]);
            setCcInput('');
        } else if (type === 'bcc' && bccInput.trim()) {
            setBccList(prev => [...prev, bccInput.trim()]);
            setBccInput('');
        }
    };

    const removeRecipient = (type: 'to' | 'cc' | 'bcc', idx: number) => {
        if (type === 'to') {
            setToList(prev => prev.filter((_, i) => i !== idx));
        } else if (type === 'cc') {
            setCcList(prev => prev.filter((_, i) => i !== idx));
        } else if (type === 'bcc') {
            setBccList(prev => prev.filter((_, i) => i !== idx));
        }
    };

    return (
        <Stack gap={16} p={16}>
            {/* Input */}
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
                        <Text fw={500} size="sm" c={colors.textPrimary}>
                            Input
                        </Text>
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
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>
                                Attachment(s)
                            </Text>
                            <TextInput
                                placeholder="Enter a VB expression"
                                value={attachmentInput}
                                onChange={(e) => setAttachmentInput(e.currentTarget.value)}
                                size="xs"
                                rightSection={
                                    <ActionIcon size="xs" onClick={addAttachment} style={{ background: colors.primary, color: colors.white }}>
                                        <Plus size={14} />
                                    </ActionIcon>
                                }
                            />
                            <Stack gap={4}>
                                {attachments.map((att, idx) => (
                                    <Group key={idx} justify="space-between" align="center" p={6} style={{ background: colors.red, borderRadius: 4 }}>
                                        <Text size="xs">{att}</Text>
                                        <ActionIcon size="xs" onClick={() => removeAttachment(idx)}>
                                            <X size={12} />
                                        </ActionIcon>
                                    </Group>
                                ))}
                            </Stack>
                        </Stack>

                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>
                                New Subject
                            </Text>
                            <TextInput
                                placeholder="The new subject of the email"
                                value={newSubject}
                                onChange={(e) => setNewSubject(e.currentTarget.value)}
                                size="xs"
                            />
                        </Stack>

                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>
                                Preferred timezone
                            </Text>
                            <Select
                                size="xs"
                                data={['(UTC) Coordinated Universal Time', '(UTC-05:00) Eastern Time', '(UTC-06:00) Central Time', '(UTC-07:00) Mountain Time', '(UTC-08:00) Pacific Time']}
                                value={preferredTimezone}
                                onChange={(v) => setPreferredTimezone(v || '')}
                                styles={{
                                    input: {
                                        fontSize: '12px',
                                        borderColor: colors.tertiary
                                    }
                                }}
                            />
                        </Stack>

                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>
                                Importance
                            </Text>
                            <Select
                                size="xs"
                                data={['Low', 'Normal', 'High']}
                                value={importance}
                                onChange={(v) => setImportance(v || '')}
                                styles={{
                                    input: {
                                        fontSize: '12px',
                                        borderColor: colors.tertiary
                                    }
                                }}
                            />
                        </Stack>
                    </Stack>
                </Collapse>
            </Box>

            {/* Recipients */}
            <Box style={{ border: `1px solid ${colors.tertiary}`, borderRadius: '6px' }}>
                <UnstyledButton
                    onClick={() => setRecipientsExpanded(!recipientsExpanded)}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderBottom: recipientsExpanded ? `1px solid ${colors.tertiary}` : 'none',
                    }}
                >
                    <Group justify="space-between">
                        <Text fw={500} size="sm" c={colors.textPrimary}>
                            Recipients
                        </Text>
                        <ChevronDown
                            size={16}
                            color={colors.textSecondary}
                            style={{
                                transform: recipientsExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                                transition: 'transform 0.2s ease'
                            }}
                        />
                    </Group>
                </UnstyledButton>

                <Collapse in={recipientsExpanded}>
                    <Stack gap={12} p={16}>
                        {/* To */}
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>
                                To
                            </Text>
                            <TextInput
                                placeholder="Press enter to input new value"
                                value={toInput}
                                onChange={(e) => setToInput(e.currentTarget.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addRecipient('to');
                                    }
                                }}
                                size="xs"
                                rightSection={
                                    <ActionIcon size="xs" onClick={() => addRecipient('to')} style={{ background: colors.primary, color: colors.white }}>
                                        <Plus size={14} />
                                    </ActionIcon>
                                }
                            />
                            <Stack gap={4}>
                                {toList.map((item, idx) => (
                                    <Group key={idx} justify="space-between" align="center" p={6} style={{ background: '#f1f5f9', borderRadius: 4 }}>
                                        <Text size="xs">{item}</Text>
                                        <ActionIcon size="xs" onClick={() => removeRecipient('to', idx)}>
                                            <X size={12} />
                                        </ActionIcon>
                                    </Group>
                                ))}
                            </Stack>
                        </Stack>

                        {/* CC */}
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>
                                CC
                            </Text>
                            <TextInput
                                placeholder="Press enter to input new value"
                                value={ccInput}
                                onChange={(e) => setCcInput(e.currentTarget.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addRecipient('cc');
                                    }
                                }}
                                size="xs"
                                rightSection={
                                    <ActionIcon size="xs" onClick={() => addRecipient('cc')} style={{ background: colors.primary, color: colors.white }}>
                                        <Plus size={14} />
                                    </ActionIcon>
                                }
                            />
                            <Stack gap={4}>
                                {ccList.map((item, idx) => (
                                    <Group key={idx} justify="space-between" align="center" p={6} style={{ background: '#f1f5f9', borderRadius: 4 }}>
                                        <Text size="xs">{item}</Text>
                                        <ActionIcon size="xs" onClick={() => removeRecipient('cc', idx)}>
                                            <X size={12} />
                                        </ActionIcon>
                                    </Group>
                                ))}
                            </Stack>
                        </Stack>

                        {/* BCC */}
                        <Stack gap={6}>
                            <Text size="xs" fw={500} c={colors.textPrimary}>
                                BCC
                            </Text>
                            <TextInput
                                placeholder="Press enter to input new value"
                                value={bccInput}
                                onChange={(e) => setBccInput(e.currentTarget.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addRecipient('bcc');
                                    }
                                }}
                                size="xs"
                                rightSection={
                                    <ActionIcon size="xs" onClick={() => addRecipient('bcc')} style={{ background: colors.primary, color: colors.white }}>
                                        <Plus size={14} />
                                    </ActionIcon>
                                }
                            />
                            <Stack gap={4}>
                                {bccList.map((item, idx) => (
                                    <Group key={idx} justify="space-between" align="center" p={6} style={{ background: '#f1f5f9', borderRadius: 4 }}>
                                        <Text size="xs">{item}</Text>
                                        <ActionIcon size="xs" onClick={() => removeRecipient('bcc', idx)}>
                                            <X size={12} />
                                        </ActionIcon>
                                    </Group>
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>
                </Collapse>
            </Box>
        </Stack>
    );
};

export default ReplyEmailProperties;
