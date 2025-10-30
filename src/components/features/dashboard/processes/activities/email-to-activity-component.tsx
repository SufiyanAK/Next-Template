'use client';

import { getAccounts } from '@/store/actions/accounts.action';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { colors } from '@/utils/customStyles';
import {
    Box,
    Button,
    CloseButton,
    Group,
    Modal,
    Stack,
    Text,
    TextInput,
    Select,
    ActionIcon
} from '@mantine/core';
import { Mail, AtSign, X, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EmailToActivityProps {
    opened: boolean;
    onClose: () => void;
}

const EmailToActivityComponent = ({ opened, onClose }: EmailToActivityProps) => {
    const dispatch = useAppDispatch();
    const { accountsList } = useAppSelector((s) => s.accountsState);

    const [fromAddress, setFromAddress] = useState('');
    const [toInput, setToInput] = useState('');
    const [ccInput, setCcInput] = useState('');
    const [toList, setToList] = useState<string[]>([]);
    const [ccList, setCcList] = useState<string[]>([]);

    useEffect(() => {
        dispatch(getAccounts());
    }, [dispatch]);

    const handleSave = () => {
        // TODO: persist into node data
        console.log('Save Email To activity', { fromAddress, to: toList, cc: ccList });
        onClose();
    };

    const addTo = (value?: string) => {
        const v = (value ?? toInput).trim();
        if (!v) return;
        setToList(prev => prev.concat(v));
        setToInput('');
    };

    const addCc = (value?: string) => {
        const v = (value ?? ccInput).trim();
        if (!v) return;
        setCcList(prev => prev.concat(v));
        setCcInput('');
    };

    const handleToKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTo();
        }
    };

    const handleCcKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addCc();
        }
    };

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
            <Stack py={20} px={16} gap={24} style={{ borderRadius: '6px 6px 0px 0px' }}>
                <Box>
                    <Group justify="space-between" align="center">
                        <Group gap={12}>
                            <Box style={{ padding: '8px', backgroundColor: `${colors.primary}`, borderRadius: '6px' }}>
                                <Mail size={20} color={colors.white} />
                            </Box>
                            <Stack gap={2}>
                                <Text fw={600} size="md" c={colors.textPrimary}>Email To</Text>
                                <Text size="sm" c={colors.textSecondary}>Send an email message</Text>
                            </Stack>
                        </Group>

                        <Group gap={8}>
                            <CloseButton onClick={onClose} size="md" style={{ color: colors.textSecondary }} />
                        </Group>
                    </Group>
                </Box>

                <Box>
                    <Stack gap={16}>
                        <Select
                            data={accountsList?.map((a) => a.user.email) || []}
                            placeholder="From address"
                            value={fromAddress}
                            onChange={(v) => setFromAddress(v || '')}
                            size="sm"
                            styles={{ dropdown: { border: `1px solid ${colors.light}` } }}
                        />

                        <div>
                            <Text fw={500} size="sm" c={colors.textPrimary}>To</Text>
                            <Group gap={8} mt={8} mb={8}>
                                {toList.map((t) => (
                                    <Box key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', background: '#f1f5f9', borderRadius: 6 }}>
                                        <AtSign size={14} />
                                        <Text size="sm">{t}</Text>
                                        <ActionIcon color="red" size="sm" onClick={() => setToList(prev => prev.filter(x => x !== t))}>
                                            <X size={14} />
                                        </ActionIcon>
                                    </Box>
                                ))}
                            </Group>
                            <TextInput
                                placeholder="recipient@example.com"
                                value={toInput}
                                onChange={(e) => setToInput(e.currentTarget.value)}
                                onKeyDown={handleToKeyDown}
                                size="sm"
                                leftSection={<AtSign size={14} />}
                                rightSection={
                                    <Plus
                                        size={16}
                                        onClick={() => addTo()}
                                        style={{
                                            cursor: 'pointer',
                                        }} />}
                            />
                        </div>

                        <div>
                            <Text fw={500} size="sm" c={colors.textPrimary}>CC</Text>
                            <Group gap={8} mt={8} mb={8}>
                                {ccList.map((t) => (
                                    <Box key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', background: '#f1f5f9', borderRadius: 6 }}>
                                        <AtSign size={14} />
                                        <Text size="sm">{t}</Text>
                                        <ActionIcon color="red" size="sm" onClick={() => setCcList(prev => prev.filter(x => x !== t))}>
                                            <X size={14} />
                                        </ActionIcon>
                                    </Box>
                                ))}
                            </Group>
                            <TextInput
                                placeholder="cc@example.com"
                                value={ccInput}
                                onChange={(e) => setCcInput(e.currentTarget.value)}
                                onKeyDown={handleCcKeyDown}
                                size="sm"
                                leftSection={<AtSign size={14} />}
                                rightSection={<Plus size={16} onClick={() => addCc()} style={{ cursor: 'pointer' }} />}
                            />
                        </div>
                    </Stack>
                </Box>

                <Box>
                    <Group justify="flex-end" gap={12}>
                        <Button variant="outline" size="sm" onClick={onClose} c={colors.textSecondary} style={{ borderColor: colors.light }}>Cancel</Button>
                        <Button variant="filled" size="sm" bg={colors.primary} onClick={handleSave}>Save Activity</Button>
                    </Group>
                </Box>
            </Stack>
        </Modal>
    );
};

export default EmailToActivityComponent;
