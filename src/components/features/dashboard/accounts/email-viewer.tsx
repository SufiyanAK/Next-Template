'use client';

import { Box } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Email } from '@/types/email.types';
import EmailSidebar from './email-sidebar';
import EmailContent from './email-content';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getEmailsByAccountId } from '@/store/actions/accounts.action';

interface EmailViewerProps {
    accountId: number;
    accountEmail: string;
}

const EmailViewer = ({ accountId, accountEmail }: EmailViewerProps) => {
    const { isLoading, error, emailsByAccountId } = useAppSelector((state) => state.accountsState);

    const dispatch = useAppDispatch();

    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

    useEffect(() => {
        if (accountId) {
            dispatch(getEmailsByAccountId({ accountId }));
        }
    }, [dispatch, accountId]);

    const handleEmailSelect = (email: Email) => {
        setSelectedEmail(email);
    };

    return (
        <Box style={{
            display: 'flex',
            height: 'calc(100vh - 206.3px)',
            overflow: 'hidden',
            backgroundColor: '#fafafa',
        }}>
            <EmailSidebar
                emails={emailsByAccountId}
                loading={isLoading}
                error={error}
                selectedEmailId={selectedEmail?.id || null}
                onEmailSelect={handleEmailSelect}
                accountEmail={accountEmail}
            />
            <EmailContent selectedEmail={selectedEmail} />
        </Box>
    );
};

export default EmailViewer;