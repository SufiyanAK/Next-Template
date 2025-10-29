'use client';

import { colors } from '@/utils/customStyles';
import {
    Box,
    Stack,
    Text,
    Paper,
    Group,
    Badge,
    Loader,
    Alert,
    TextInput,
    Table,
    Avatar,
    ActionIcon,
    Menu,
    Button
} from '@mantine/core';
import { Search, AlertCircle, User, MoreVertical, Trash2, Edit, Shield, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Account } from '@/types/accounts.types';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getAccounts } from '@/store/actions/accounts.action';
import InviteUserModal from '@/components/common/invite-user-modal';

interface AccountsTabComponentProps {
    onAccountClick: (accountId: number) => void;
}

const AccountsTabComponent = ({ onAccountClick }: AccountsTabComponentProps) => {

    const { isLoading, error, accountsList } = useAppSelector((state) => state.accountsState)

    const dispatch = useAppDispatch();

    const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [inviteModalOpened, setInviteModalOpened] = useState(false);

    useEffect(() => {
        dispatch(getAccounts());
    }, [dispatch]);

    const handleAccountClick = (account: Account) => {
        setSelectedAccountId(account.id);
        onAccountClick(account.id);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusBadge = (account: Account) => {
        // Simulate status based on recent activity (you can modify this logic)
        const daysSinceUpdate = Math.floor((Date.now() - new Date(account.updatedAt).getTime()) / (1000 * 60 * 60 * 24));
        const isActive = daysSinceUpdate <= 7;

        return (
            <Badge
                variant="light"
                color={isActive ? 'green' : 'gray'}
                // size="lg"
                style={{ fontSize: '0.875rem' }}
                styles={{
                    root: {
                        padding: '12px 16px',
                        borderRadius: '8px'
                    }
                }}
            >
                {isActive ? 'Active' : 'Inactive'}
            </Badge>
        );
    };

    const handleInviteSuccess = () => {
        // Refresh accounts list after successful invitation
        dispatch(getAccounts());
    };

    const getRoleIcon = (provider: string) => {
        switch (provider.toLowerCase()) {
            case 'gmail':
            case 'google':
                return <Mail size={16} />;
            case 'outlook':
            case 'microsoft':
                return <Shield size={16} />;
            default:
                return <User size={16} />;
        }
    };

    if (isLoading) {
        return (
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px'
            }}>
                <Stack align="center" gap={16}>
                    <Loader size="md" color={colors.primary} />
                    <Text size="sm" c={colors.textSecondary}>
                        Loading accounts...
                    </Text>
                </Stack>
            </Box>
        );
    };

    if (error) {
        return (
            <Box p={20}>
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
    };

    if (accountsList?.length === 0) {
        return (
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px'
            }}>
                <Stack align="center" gap={16}>
                    <Box
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            backgroundColor: `${colors.light}30`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Mail size={40} color={colors.light} />
                    </Box>
                    <Text size="xl" fw={600} c={colors.textPrimary}>
                        No Accounts Found
                    </Text>
                    <Text size="md" c={colors.textSecondary} style={{ maxWidth: '400px', textAlign: 'center' }}>
                        You haven&apos;t connected any email accounts yet. Connect an account to start processing emails.
                    </Text>
                </Stack>
            </Box>
        );
    };

    return (
        <Box p={20}>
            <Stack gap={20}>
                {/* Header */}
                <Group justify="space-between" align="center">
                    <Stack gap={4}>
                        <Text size="xl" fw={700} c={colors.textPrimary}>
                            Account Management
                        </Text>
                        <Text size="sm" c={colors.textSecondary}>
                            Manage and monitor your connected email accounts
                        </Text>
                    </Stack>
                    <Button
                        variant="filled"
                        size="sm"
                        radius={6}
                        bg={colors.primary}
                        leftSection={<User size={16} />}
                        onClick={() => setInviteModalOpened(true)}
                    >
                        Add Account
                    </Button>
                </Group>

                {/* Search Bar */}
                <Group justify="space-between" align="center">
                    <TextInput
                        placeholder="Search accounts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        leftSection={<Search size={16} />}
                        w={300}
                        radius={8}
                        styles={{
                            input: {
                                border: `1px solid ${colors.tertiary}`,
                                '&:focus': {
                                    borderColor: colors.primary
                                }
                            }
                        }}
                    />
                    <Badge variant="light" color={colors.primary} size="lg" radius="xl">
                        {accountsList?.length || 0} {(accountsList?.length || 0) === 1 ? 'account' : 'accounts'}
                    </Badge>
                </Group>

                {/* Table */}
                <Paper
                    radius={12}
                    style={{
                        border: `1px solid ${colors.tertiary}`,
                        overflow: 'hidden'
                    }}
                >
                    <Table highlightOnHover>
                        <Table.Thead style={{ backgroundColor: `${colors.primary}08` }}>
                            <Table.Tr>
                                <Table.Th style={{ padding: '16px 20px' }}>
                                    <Text size="sm" fw={600} c={colors.textPrimary}>Name</Text>
                                </Table.Th>
                                <Table.Th style={{ padding: '16px 20px' }}>
                                    <Text size="sm" fw={600} c={colors.textPrimary}>Role</Text>
                                </Table.Th>
                                <Table.Th style={{ padding: '16px 20px' }}>
                                    <Text size="sm" fw={600} c={colors.textPrimary}>Status</Text>
                                </Table.Th>
                                <Table.Th style={{ padding: '16px 20px' }}>
                                    <Text size="sm" fw={600} c={colors.textPrimary}>Last Active</Text>
                                </Table.Th>
                                <Table.Th style={{ padding: '16px 20px', width: '50px' }}></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {accountsList?.map((account) => (
                                <Table.Tr
                                    key={account.id}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: selectedAccountId === account.id ? `${colors.primary}08` : 'transparent',
                                    }}
                                    onClick={() => handleAccountClick(account)}
                                >
                                    <Table.Td style={{ padding: '16px 20px' }}>
                                        <Group gap={12}>
                                            <Avatar
                                                size="md"
                                                radius="xl"
                                                color={colors.primary}
                                                style={{
                                                    // backgroundColor: colors.tertiary,
                                                    // color: colors.primary
                                                }}
                                            >
                                                {account.user.email.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <Stack gap={2}>
                                                <Text size="sm" fw={500} c={colors.textPrimary}>
                                                    {account.user.email.split('@')[0]}
                                                </Text>
                                                <Text size="xs" c={colors.textSecondary}>
                                                    {account.user.email}
                                                </Text>
                                            </Stack>
                                        </Group>
                                    </Table.Td>
                                    <Table.Td style={{ padding: '16px 20px' }}>
                                        <Group gap={8}>
                                            <Box c={colors.primary}>
                                                {getRoleIcon(account.provider)}
                                            </Box>
                                            <Text size="sm" c={colors.textPrimary} tt="capitalize">
                                                {account.provider}
                                            </Text>
                                        </Group>
                                    </Table.Td>
                                    <Table.Td style={{ padding: '16px 20px' }}>
                                        {getStatusBadge(account)}
                                    </Table.Td>
                                    <Table.Td style={{ padding: '16px 20px' }}>
                                        <Text size="sm" c={colors.textSecondary}>
                                            {formatDate(account.updatedAt)}
                                        </Text>
                                    </Table.Td>
                                    <Table.Td style={{ padding: '16px 20px' }}>
                                        <Menu shadow="md" width={200}>
                                            <Menu.Target>
                                                <ActionIcon
                                                    variant="subtle"
                                                    size="sm"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <MoreVertical size={16} />
                                                </ActionIcon>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Item leftSection={<Edit size={14} />}>
                                                    Edit Account
                                                </Menu.Item>
                                                <Menu.Item leftSection={<Shield size={14} />}>
                                                    Manage Permissions
                                                </Menu.Item>
                                                <Menu.Divider />
                                                <Menu.Item
                                                    leftSection={<Trash2 size={14} />}
                                                    color="red"
                                                >
                                                    Delete Account
                                                </Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Paper>

                {accountsList && accountsList.length > 0 && (
                    <Box style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px'
                    }}>
                        <Stack align="center" gap={12}>
                            <Search size={48} color={colors.light} />
                            <Text size="lg" fw={600} c={colors.textPrimary}>
                                No accounts found
                            </Text>
                            <Text size="sm" c={colors.textSecondary}>
                                Try adjusting your search terms
                            </Text>
                        </Stack>
                    </Box>
                )}
            </Stack>

            {/* Invite User Modal */}
            <InviteUserModal
                opened={inviteModalOpened}
                onClose={() => setInviteModalOpened(false)}
                onSuccess={handleInviteSuccess}
            />
        </Box>
    );
};

export default AccountsTabComponent;