"use client";

import { getAccounts } from '@/store/actions/accounts.action';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { initialReplyEmailActivityStates, ReplyEmailActivityStates } from '@/types/activities/reply-email-activity.types';
import { colors } from '@/utils/customStyles';
import { getDataStructuresSelect } from '@/utils/meta-helpers';
import {
    Box,
    Button,
    CloseButton,
    Group,
    Modal,
    Select,
    Stack,
    Text,
    Textarea,
    Switch,
    Radio,
    Accordion
} from '@mantine/core';
import { Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ReplyEmailActivity } from '@/types/process.types';
import { useDashboard } from '@/contexts/dashboard-context';

interface ReplyEmailActivityComponentProps {
    opened: boolean;
    onClose: () => void;
    existingData?: any;
}

const ReplyEmailActivityComponent = ({ opened, onClose, existingData }: ReplyEmailActivityComponentProps) => {
    const { accountsList } = useAppSelector((state) => state.accountsState);
    const { meta } = useAppSelector((state) => state.metaState);
    const { processData, setProcessData } = useDashboard();

    const dispatch = useAppDispatch();

    const [replyEmailActivityStates, setReplyEmailActivityStates] = useState<ReplyEmailActivityStates>(initialReplyEmailActivityStates);

    // Get email output properties for the "Email to reply" dropdown
    const emailOutputOptions = getDataStructuresSelect(meta.enums || []);

    const updateReplyEmailActivityState = (key: keyof ReplyEmailActivityStates, value: any) => {
        setReplyEmailActivityStates((prevState) => ({
            ...prevState,
            [key]: value
        }));
    }

    const handleSave = () => {
        // Construct the reply email activity data
        const newActivity: ReplyEmailActivity = {
            type: 'reply-email',
            emailAccount: replyEmailActivityStates.emailAccount,
            useSharedMailbox: replyEmailActivityStates.useSharedMailbox,
            emailToReply: replyEmailActivityStates.emailToReply,
            replyBody: replyEmailActivityStates.htmlContent,
            replyToAll: replyEmailActivityStates.replyToAll === 'true',
            saveAsDraft: replyEmailActivityStates.saveAsDraft === 'true'
        };

        const existingActivities = processData?.activities || [];

        // Check if a reply-email activity already exists
        const existingReplyEmailIndex = existingActivities.findIndex(
            (activity) => activity.type === 'reply-email'
        );

        let updatedActivities;

        if (existingReplyEmailIndex !== -1) {
            // Update existing reply-email activity
            updatedActivities = existingActivities.map((activity, index) => {
                if (index === existingReplyEmailIndex) {
                    return newActivity;
                }
                return activity;
            });
        } else {
            // Create new reply-email activity
            updatedActivities = [...existingActivities, newActivity];
        }

        setProcessData({
            ...processData,
            activities: updatedActivities
        });

        onClose();
    }

    useEffect(() => {
        dispatch(getAccounts());
    }, [dispatch]);

    // Populate form with existing data
    useEffect(() => {
        if (opened && existingData) {
            setReplyEmailActivityStates({
                ...initialReplyEmailActivityStates,
                emailAccount: existingData.emailAccount || '',
                useSharedMailbox: existingData.useSharedMailbox || false,
                emailToReply: existingData.emailToReply || '',
                htmlContent: existingData.replyBody || '',
                replyToAll: existingData.replyToAll ? 'true' : 'false',
                saveAsDraft: existingData.saveAsDraft ? 'true' : 'false'
            });
        } else if (opened && !existingData) {
            // Reset form when opening without existing data
            setReplyEmailActivityStates(initialReplyEmailActivityStates);
        }
    }, [opened, existingData]);

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
                                    Reply Email
                                </Text>
                                <Text size="sm" c={colors.textSecondary}>
                                    Reply to an email from an account
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

                {/* Content - Accordion to make sections expandable */}
                <Box>
                    <Accordion defaultValue="account">
                        <Accordion.Item value="account">
                            <Accordion.Control>Email Account</Accordion.Control>
                            <Accordion.Panel>
                                <Stack gap={12}>
                                    <Select
                                        data={accountsList?.map((account) => account.user.email)}
                                        placeholder="Select email account"
                                        value={replyEmailActivityStates.emailAccount}
                                        onChange={(value) => updateReplyEmailActivityState('emailAccount', value || '')}
                                        size="sm"
                                        styles={{ dropdown: { border: `1px solid ${colors.light}` } }}
                                    />

                                    <Group align="center" gap={8}>
                                        <Switch checked={replyEmailActivityStates.useSharedMailbox} onChange={(event) => updateReplyEmailActivityState('useSharedMailbox', event.currentTarget.checked)} />
                                        <Text size="sm" c={colors.textSecondary}>Use shared mailbox</Text>
                                    </Group>
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="replyTo">
                            <Accordion.Control>Email to reply</Accordion.Control>
                            <Accordion.Panel>
                                <Select
                                    data={emailOutputOptions}
                                    placeholder="Select email variable"
                                    value={replyEmailActivityStates.emailToReply}
                                    onChange={(value) => updateReplyEmailActivityState('emailToReply', value || '')}
                                    size="sm"
                                    styles={{ input: { borderColor: colors.light, fontSize: '14px' } }}
                                />
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="body">
                            <Accordion.Control>Body</Accordion.Control>
                            <Accordion.Panel>
                                <Textarea
                                    placeholder="Body Content"
                                    value={replyEmailActivityStates.htmlContent}
                                    onChange={(event) => updateReplyEmailActivityState('htmlContent', event.currentTarget.value)}
                                    minRows={18}
                                    size="md"
                                    styles={{ input: { borderColor: colors.light, fontSize: '16px', minHeight: 140 } }}
                                />
                            </Accordion.Panel>
                        </Accordion.Item>

                        <Accordion.Item value="options">
                            <Accordion.Control>Reply Options</Accordion.Control>
                            <Accordion.Panel>
                                <Stack gap={12}>
                                    <Stack gap={4}>
                                        <Text size="sm" c={colors.textSecondary}>Reply to all</Text>
                                        <Group>
                                            <Radio value="true" label="True" checked={replyEmailActivityStates.replyToAll === 'true'} onChange={() => updateReplyEmailActivityState('replyToAll', 'true')} />
                                            <Radio value="false" label="False" checked={replyEmailActivityStates.replyToAll === 'false'} onChange={() => updateReplyEmailActivityState('replyToAll', 'false')} />
                                        </Group>
                                    </Stack>

                                    <Stack gap={4}>
                                        <Text size="sm" c={colors.textSecondary}>Save as Draft</Text>
                                        <Group>
                                            <Radio value="true" label="True" checked={replyEmailActivityStates.saveAsDraft === 'true'} onChange={() => updateReplyEmailActivityState('saveAsDraft', 'true')} />
                                            <Radio value="false" label="False" checked={replyEmailActivityStates.saveAsDraft === 'false'} onChange={() => updateReplyEmailActivityState('saveAsDraft', 'false')} />
                                        </Group>
                                    </Stack>
                                </Stack>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
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
                            onClick={handleSave}
                        >
                            Save Activity
                        </Button>
                    </Group>
                </Box>
            </Stack>
        </Modal>
    );
};

export default ReplyEmailActivityComponent;
