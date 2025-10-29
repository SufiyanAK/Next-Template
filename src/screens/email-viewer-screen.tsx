'use client';

import EmailViewer from '@/components/features/dashboard/accounts/email-viewer';
import { Box, Button, Group, Loader, Alert, Text } from '@mantine/core';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { apiGet } from '@/utils/api-requests';
import API_ENDPOINTS from '@/constants/api-endpoints';
import { Account } from '@/types/accounts.types';

interface EmailViewerScreenProps {
    accountId: number;
}

const EmailViewerScreen = ({ accountId }: EmailViewerScreenProps) => {
    const router = useRouter();
    const [account, setAccount] = useState<Account | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAccountDetails = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // First get all accounts and find the specific one
            const response = await apiGet(API_ENDPOINTS.getAllAccounts);

            if (response.success && response.data) {
                const accountsData = Array.isArray(response.data) ? response.data : response.data.data;
                const foundAccount = accountsData.find((acc: Account) => acc.id === accountId);

                if (foundAccount) {
                    setAccount(foundAccount);
                } else {
                    setError(`Account with ID ${accountId} not found`);
                }
            } else {
                setError('Failed to fetch account details');
            }
        } catch (error: any) {
            console.error('Error fetching account:', error);
            setError(error.message || 'An error occurred while fetching account details');
        } finally {
            setLoading(false);
        }
    }, [accountId]);

    useEffect(() => {
        fetchAccountDetails();
    }, [fetchAccountDetails]);

    const handleBackToAccounts = () => {
        router.push('/dashboard/accounts');
    };

    if (loading) {
        return (
            <Box style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>
                <Loader size="md" />
            </Box>
        );
    }

    if (error || !account) {
        return (
            <Box p={20}>
                <Alert
                    icon={<AlertCircle size={16} />}
                    title="Error"
                    color="red"
                    variant="light"
                    mb={20}
                >
                    {error || 'Account not found'}
                </Alert>
                <Button
                    variant="subtle"
                    leftSection={<ArrowLeft size={16} />}
                    onClick={handleBackToAccounts}
                >
                    Back to Accounts
                </Button>
            </Box>
        );
    }

    return (
        <Box style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Group p={16} style={{ borderBottom: '1px solid #e9ecef', backgroundColor: 'white' }}>
                <Button
                    variant="subtle"
                    leftSection={<ArrowLeft size={16} />}
                    onClick={handleBackToAccounts}
                    size="sm"
                >
                    Back to Accounts
                </Button>
                <Text size="sm" c="dimmed">
                    Viewing emails for: {account.user.email}
                </Text>
            </Group>
            <Box style={{ flex: 1 }}>
                <EmailViewer
                    accountId={account.id}
                    accountEmail={account.user.email}
                />
            </Box>
        </Box>
    );
};

export default EmailViewerScreen;