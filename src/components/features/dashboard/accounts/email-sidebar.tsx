'use client';

import { colors } from '@/utils/customStyles';
import {
    Box,
    Stack,
    Text,
    Group,
    Badge,
    ScrollArea,
    Loader,
    Alert,
    Avatar,
    UnstyledButton
} from '@mantine/core';
import { Mail, AlertCircle, Paperclip, Calendar, User } from 'lucide-react';
import { Email } from '@/types/email.types';

interface EmailSidebarProps {
    emails: Email[] | null;
    loading: boolean;
    error: string | null;
    selectedEmailId: number | null;
    onEmailSelect: (email: Email) => void;
    accountEmail?: string;
}

const EmailSidebar = ({
    emails,
    loading,
    error,
    selectedEmailId,
    onEmailSelect,
    accountEmail
}: EmailSidebarProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return 'Today';
        } else if (diffDays === 2) {
            return 'Yesterday';
        } else if (diffDays <= 7) {
            return `${diffDays - 1} days ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
            });
        }
    };

    const truncateSubject = (subject: string, maxLength: number = 40) => {
        if (subject.length <= maxLength) return subject;
        return subject.substring(0, maxLength) + '...';
    };

    if (loading) {
        return (
            <Box style={{
                width: '350px',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 50,
                borderRight: `1px solid ${colors.tertiary}`,
                backgroundColor: colors.white,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Stack align="center" gap={16}>
                    <Loader size="md" color={colors.primary} />
                    <Text size="sm" c={colors.textSecondary}>
                        Loading emails...
                    </Text>
                </Stack>
            </Box>
        );
    }

    if (error) {
        return (
            <Box style={{
                width: '350px',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 50,
                borderRight: `1px solid ${colors.tertiary}`,
                backgroundColor: colors.white,
                padding: '20px'
            }}>
                <Alert
                    icon={<AlertCircle size={16} />}
                    title="Error"
                    color="red"
                    variant="light"
                >
                    {error}
                </Alert>
            </Box>
        );
    }

    return (
        <Box style={{
            width: '350px',
            height: 'calc(100vh - 206.3px)',
            borderRight: `1px solid ${colors.tertiary}`,
            backgroundColor: colors.white,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <Box p={20} style={{
                borderBottom: `1px solid ${colors.tertiary}`,
                flexShrink: 0
            }}>
                <Stack gap={8}>
                    <Group gap={12}>
                        <Avatar color={colors.primary} size="md" radius="xl">
                            <Mail size={16} />
                        </Avatar>
                        <Stack gap={2}>
                            <Text size="md" fw={600} c={colors.textPrimary}>
                                Emails
                            </Text>
                            {accountEmail && (
                                <Text size="xs" c={colors.textSecondary}>
                                    {accountEmail}
                                </Text>
                            )}
                        </Stack>
                    </Group>
                    <Badge variant="light" color={colors.primary} size="sm" radius="xl">
                        {emails?.length} {emails?.length === 1 ? 'email' : 'emails'}
                    </Badge>
                </Stack>
            </Box>

            {/* Email List */}
            <ScrollArea
                flex={1}
                type="scroll"
                scrollbarSize={6}
                scrollHideDelay={1000}
                style={{ minHeight: 0 }}
                viewportProps={{ style: { maxHeight: '100%' } }}
            >
                {emails?.length === 0 ? (
                    <Box style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '300px'
                    }}>
                        <Stack align="center" gap={12}>
                            <Mail size={48} color={colors.light} />
                            <Text size="md" fw={600} c={colors.textPrimary}>
                                No emails found
                            </Text>
                            <Text size="sm" c={colors.textSecondary} style={{ textAlign: 'center', maxWidth: '250px' }}>
                                This account doesn&apos;t have any processed emails yet.
                            </Text>
                        </Stack>
                    </Box>
                ) : (
                    <Stack gap={0} p={8} style={{ minHeight: 'min-content' }}>
                        {emails?.map((email) => (
                            <UnstyledButton
                                key={email.id}
                                onClick={() => onEmailSelect(email)}
                                style={{
                                    width: '100%',
                                    borderRadius: '8px',
                                    padding: '12px',
                                    backgroundColor: selectedEmailId === email.id
                                        ? `${colors.primary}08`
                                        : 'transparent',
                                    border: selectedEmailId === email.id
                                        ? `1px solid ${colors.primary}`
                                        : '1px solid transparent',
                                    transition: 'all 0.2s ease',
                                    ':hover': {
                                        backgroundColor: selectedEmailId === email.id
                                            ? `${colors.primary}12`
                                            : `${colors.primary}05`
                                    }
                                }}
                            >
                                <Stack gap={8}>
                                    {/* Email Header */}
                                    <Group justify="space-between" align="flex-start">
                                        <Group gap={8}>
                                            <Avatar size="sm" color={colors.primary} radius="xl">
                                                <User size={10} />
                                            </Avatar>
                                            <Text size="xs" c={colors.textSecondary} style={{ flex: 1 }}>
                                                {email.fromAddress.length > 25
                                                    ? email.fromAddress.substring(0, 25) + '...'
                                                    : email.fromAddress}
                                            </Text>
                                        </Group>
                                        <Text size="xs" c={colors.textSecondary}>
                                            {formatDate(email.createdAt)}
                                        </Text>
                                    </Group>

                                    {/* Subject */}
                                    <Text size="sm" fw={500} c={colors.textPrimary} style={{ lineHeight: 1.3 }}>
                                        {truncateSubject(email.subject)}
                                    </Text>

                                    {/* Email Meta */}
                                    <Group justify="space-between" align="center">
                                        <Group gap={12}>
                                            {email.hasAttachments && (
                                                <Group gap={4}>
                                                    <Paperclip size={12} color={colors.textSecondary} />
                                                    <Text size="xs" c={colors.textSecondary}>
                                                        {email.Attachments.length}
                                                    </Text>
                                                </Group>
                                            )}
                                            <Group gap={4}>
                                                <Calendar size={12} color={colors.textSecondary} />
                                                <Text size="xs" c={colors.textSecondary}>
                                                    {formatDate(email.processedAt)}
                                                </Text>
                                            </Group>
                                        </Group>

                                        <Badge
                                            variant="dot"
                                            color={
                                                email.SAPResponse?.status === 'SUCCESS'
                                                    ? 'green'
                                                    : email.SAPResponse?.status === 'FAILED'
                                                        ? 'red'
                                                        : email.hasAttachments
                                                            ? colors.primary
                                                            : 'gray'
                                            }
                                            size="xs"
                                        >
                                            {email.SAPResponse?.status === 'SUCCESS'
                                                ? 'Success'
                                                : email.SAPResponse?.status === 'FAILED'
                                                    ? 'Failed'
                                                    : email.hasAttachments
                                                        ? 'Attachment'
                                                        : 'Text'
                                            }
                                        </Badge>
                                    </Group>
                                </Stack>
                            </UnstyledButton>
                        ))}
                    </Stack>
                )}
            </ScrollArea>
        </Box>
    );
};

export default EmailSidebar;