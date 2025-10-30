'use client';

import { getAccounts } from '@/store/actions/accounts.action';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { initialReadEmailActivityStates, ReadEmailActivityStates } from '@/types/activities/read-email-activity.types';
import { colors } from '@/utils/customStyles';
import { getEmailFiltersSelect, getEmailFoldersSelect } from '@/utils/meta-helpers';
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
    Mail
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface ReadEmailActivityComponentProps {
    opened: boolean;
    onClose: () => void;
}

const ReadEmailActivityComponent = ({ opened, onClose }: ReadEmailActivityComponentProps) => {
    const { accountsList } = useAppSelector((state) => state.accountsState)
    const { meta } = useAppSelector((state) => state.metaState);

    const dispatch = useAppDispatch();

    const [readEmailActivityStates, setReadEmailActivityStates] = useState<ReadEmailActivityStates>(initialReadEmailActivityStates);

    const conditionOptions = [
        'Contains',
        'Equals',
        'Starts with',
        'Ends with',
        'Does not contain'
    ];

    // * Functions: Read Email Activity States
    const updateReadEmailActivityState = (key: keyof ReadEmailActivityStates, value: string) => {
        setReadEmailActivityStates((prevState) => ({
            ...prevState,
            [key]: value
        }));
    }

    // * Functions: Meta Options
    const folderOptions = getEmailFoldersSelect(meta.enums || []);
    const filterOptions = getEmailFiltersSelect(meta.enums || []);

    useEffect(() => {
        dispatch(getAccounts())
    }, [dispatch])

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
                            <Select
                                data={accountsList?.map((account) => account.user.email)}
                                placeholder="Email address to read from"
                                onChange={(value) => updateReadEmailActivityState('receiverAddress', value || '')}
                                size="sm"
                                styles={{
                                    dropdown: {
                                        border: `1px solid ${colors.light}`,
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
                                value={readEmailActivityStates.emailFolder}
                                placeholder='Select Option'
                                onChange={(value) => updateReadEmailActivityState('emailFolder', value || 'Inbox')}
                                size="sm"
                                styles={{
                                    input: {
                                        borderColor: colors.light,
                                        fontSize: '14px',
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
                                {/* <Button
                                        variant="subtle"
                                        size="xs"
                                        leftSection={<Plus size={14} />}
                                        c={colors.primary}
                                        style={{
                                            fontSize: '12px'
                                        }}
                                    >
                                        Add Filter
                                    </Button> */}
                            </Group>

                            {/* Filter Row */}
                            <Group gap={8} align="end">
                                <Box style={{ flex: '0 0 120px' }}>
                                    <Select
                                        data={filterOptions}
                                        value={readEmailActivityStates.filterSubject}
                                        onChange={(value) => updateReadEmailActivityState('filterSubject', value || '')}
                                        placeholder="Subject"
                                        size="sm"
                                        styles={{
                                            input: {
                                                borderColor: colors.light,
                                                fontSize: '13px',
                                            }
                                        }}
                                    />
                                </Box>

                                <Box style={{ flex: '0 0 120px' }}>
                                    <Select
                                        data={conditionOptions}
                                        value={readEmailActivityStates.filterCondition}
                                        onChange={(value) => updateReadEmailActivityState('filterCondition', value || 'Contains')}
                                        placeholder="Contains"
                                        size="sm"
                                        styles={{
                                            input: {
                                                borderColor: colors.light,
                                                fontSize: '13px',
                                            }
                                        }}
                                    />
                                </Box>

                                <Box style={{ flex: 1 }}>
                                    <TextInput
                                        placeholder="Value"
                                        value={readEmailActivityStates.filterValue}
                                        onChange={(event) => updateReadEmailActivityState('filterValue', event.currentTarget.value)}
                                        size="sm"
                                        styles={{
                                            input: {
                                                borderColor: colors.light,
                                                fontSize: '13px',
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