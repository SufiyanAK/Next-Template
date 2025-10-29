'use client';

import AccountsTabComponent from '@/components/features/dashboard/accounts-tab';
import { Box } from '@mantine/core';
import { useRouter } from 'next/navigation';

const AccountsScreen = () => {
    const router = useRouter();

    const handleAccountClick = (accountId: number) => {
        router.push(`/dashboard/accounts/${accountId}`);
    };

    return (
        <Box style={{ height: '100%', overflow: 'hidden' }}>
            <AccountsTabComponent onAccountClick={handleAccountClick} />
        </Box>
    );
};

export default AccountsScreen;