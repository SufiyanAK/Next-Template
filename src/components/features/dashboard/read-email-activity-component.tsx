'use client';

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
    TextInput
} from '@mantine/core';
import {
    Mail,
    Plus
} from 'lucide-react';
import { useState } from 'react';

interface ReadEmailActivityComponentProps {
    opened: boolean;
    onClose: () => void;
}

const ReadEmailActivityComponent = ({ opened, onClose }: ReadEmailActivityComponentProps) => {
    const [receiverAddress, setReceiverAddress] = useState('');
    const [emailFolder, setEmailFolder] = useState('Inbox');
    const [filterSubject, setFilterSubject] = useState('');
    const [filterCondition, setFilterCondition] = useState('Contains');
    const [filterValue, setFilterValue] = useState('');

    const folderOptions = [
        'Inbox',
        // 'Sent Items',
        // 'Drafts',
        // 'Deleted Items',
        // 'Junk Email',
        // 'Outbox'
    ];

    const conditionOptions = [
        'Contains',
        'Equals',
        'Starts with',
        'Ends with',
        'Does not contain'
    ];

    const subjectOptions = [
        'Subject',
        'From',
    ];

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size="xl"
            padding={0}
            centered
            withCloseButton={false}
            styles={{
                content: {
                    overflow: 'visible'
                },
                body: {
                    padding: 0
                }
            }}
        >
            <Stack
                py={20}
                px={16}
                gap={24}
                style={{
                    borderRadius: '6px 6px 0px 0px',
                }}
            >
                {/* Header */}
                <Box>
                    <Group justify="space-between" align="center">
                        <Group gap={12}>
                            <Box
                                style={{
                                    padding: '8px',
                                    backgroundColor: `${colors.primary}`,
                                    borderRadius: '6px',
                                }}
                            >
                                <Mail size={20} color={colors.white} />
                            </Box>
                            <Stack gap={2}>
                                <Text fw={600} size="md" c={colors.textPrimary}>
                                    Read Email
                                </Text>
                                <Text size="sm" c={colors.textSecondary}>
                                    Process emails from inbox
                                </Text>
                            </Stack>
                        </Group>

                        <Group gap={8}>
                            <CloseButton
                                onClick={onClose}
                                size="md"
                                style={{
                                    color: colors.textSecondary
                                }}
                            />
                        </Group>
                    </Group>
                </Box>

                {/* Content */}
                <Box>
                    <Stack gap={20}>
                        {/* Receiver's Address */}
                        <Stack gap={8}>
                            <Text fw={500} size="sm" c={colors.textPrimary}>
                                Receiver&apos;s Address
                            </Text>
                            <TextInput
                                placeholder="Email address to read from"
                                value={receiverAddress}
                                onChange={(event) => setReceiverAddress(event.currentTarget.value)}
                                size="sm"
                                styles={{
                                    input: {
                                        borderColor: colors.light,
                                        fontSize: '14px',
                                        '&:focus': {
                                            borderColor: colors.primary
                                        }
                                    }
                                }}
                            />
                        </Stack>

                        {/* Email Folder */}
                        <Stack gap={8}>
                            <Text fw={500} size="sm" c={colors.textPrimary}>
                                Email Folder
                            </Text>
                            <Select
                                data={folderOptions}
                                value={emailFolder}
                                onChange={(value) => setEmailFolder(value || 'Inbox')}
                                size="sm"
                                styles={{
                                    input: {
                                        borderColor: colors.light,
                                        fontSize: '14px',
                                        '&:focus': {
                                            borderColor: colors.primary
                                        }
                                    }
                                }}
                            />
                        </Stack>

                        {/* Additional Filters */}
                        <Stack gap={12}>
                            <Group align="center">
                                <Text fw={500} size="sm" c={colors.textPrimary}>
                                    Additional Filters
                                </Text>
                                <Button
                                    variant="subtle"
                                    size="xs"
                                    leftSection={<Plus size={14} />}
                                    c={colors.primary}
                                    style={{
                                        fontSize: '12px'
                                    }}
                                >
                                    Add Filter
                                </Button>
                            </Group>

                            {/* Filter Row */}
                            <Group gap={8} align="end">
                                <Box style={{ flex: '0 0 120px' }}>
                                    <Select
                                        data={subjectOptions}
                                        value={filterSubject}
                                        onChange={(value) => setFilterSubject(value || '')}
                                        placeholder="Subject"
                                        size="sm"
                                        styles={{
                                            input: {
                                                borderColor: colors.light,
                                                fontSize: '13px',
                                                '&:focus': {
                                                    borderColor: colors.primary
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                <Box style={{ flex: '0 0 120px' }}>
                                    <Select
                                        data={conditionOptions}
                                        value={filterCondition}
                                        onChange={(value) => setFilterCondition(value || 'Contains')}
                                        placeholder="Contains"
                                        size="sm"
                                        styles={{
                                            input: {
                                                borderColor: colors.light,
                                                fontSize: '13px',
                                                '&:focus': {
                                                    borderColor: colors.primary
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                <Box style={{ flex: 1 }}>
                                    <TextInput
                                        placeholder="Value"
                                        value={filterValue}
                                        onChange={(event) => setFilterValue(event.currentTarget.value)}
                                        size="sm"
                                        styles={{
                                            input: {
                                                borderColor: colors.light,
                                                fontSize: '13px',
                                                '&:focus': {
                                                    borderColor: colors.primary
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                <Box style={{ flex: '0 0 auto' }}>
                                    <CloseButton
                                        size="sm"
                                        style={{
                                            color: colors.textSecondary,
                                            backgroundColor: 'transparent',
                                            border: `1px solid ${colors.light}`,
                                            borderRadius: '4px'
                                        }}
                                    />
                                </Box>
                            </Group>
                        </Stack>
                    </Stack>
                </Box>

                {/* Footer */}
                <Box>
                    <Group justify="flex-end" gap={12}>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onClose}
                            c={colors.textSecondary}
                            style={{
                                borderColor: colors.light
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="filled"
                            size="sm"
                            bg={colors.primary}
                        >
                            Save Activity
                        </Button>
                    </Group>
                </Box>
            </Stack>
        </Modal>
    );
};

export default ReadEmailActivityComponent;