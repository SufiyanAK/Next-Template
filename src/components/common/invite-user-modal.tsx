'use client';

import { colors } from '@/utils/customStyles';
import { Box, Button, CloseButton, Group, Modal, Stack, Text, TextInput } from '@mantine/core';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { apiPost } from '@/utils/api-requests';
import API_ENDPOINTS from '@/constants/api-endpoints';

interface InviteUserModalProps {
    opened: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const InviteUserModal = ({ opened, onClose, onSuccess }: InviteUserModalProps) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInvite = async () => {
        if (!email || !email.trim()) {
            toast.error('Please enter an email address');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        try {
            await apiPost(API_ENDPOINTS.auth.inviteUser, { email: email.trim() });
            toast.success('Invitation sent successfully!');
            setEmail(''); // Reset the email field
            onClose();
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to send invitation';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setEmail(''); // Reset the email field when closing
            onClose();
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            size="md"
            padding={0}
            centered
            withCloseButton={false}
            styles={{ content: { overflow: 'visible' }, body: { padding: 0 } }}
        >
            <Stack py={20} px={16} gap={24} style={{ borderRadius: '6px 6px 0px 0px' }}>
                <Box>
                    <Group justify="space-between" align="center">
                        <Group gap={12}>
                            <Box style={{ padding: '8px', backgroundColor: `${colors.primary}`, borderRadius: '6px' }}>
                                <UserPlus size={20} color={colors.white} />
                            </Box>
                            <Stack gap={2}>
                                <Text fw={600} size="md" c={colors.textPrimary}>Invite User</Text>
                                <Text size="sm" c={colors.textSecondary}>Send an invitation to add a new account</Text>
                            </Stack>
                        </Group>

                        <Group gap={8}>
                            <CloseButton
                                onClick={handleClose}
                                size="md"
                                style={{ color: colors.textSecondary }}
                                disabled={isLoading}
                            />
                        </Group>
                    </Group>
                </Box>

                <Box>
                    <TextInput
                        label="Email Address"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        size="sm"
                        disabled={isLoading}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !isLoading) {
                                handleInvite();
                            }
                        }}
                        styles={{
                            input: {
                                borderColor: colors.tertiary,
                                '&:focus': {
                                    borderColor: colors.primary
                                }
                            }
                        }}
                    />
                </Box>

                <Box>
                    <Group justify="flex-end" gap={12}>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleClose}
                            c={colors.textSecondary}
                            style={{ borderColor: colors.light }}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="filled"
                            size="sm"
                            bg={colors.primary}
                            onClick={handleInvite}
                            loading={isLoading}
                        >
                            Invite
                        </Button>
                    </Group>
                </Box>
            </Stack>
        </Modal>
    );
};

export default InviteUserModal;
