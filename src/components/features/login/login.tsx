'use client';

import { loginUser } from '@/store/actions/auth.action';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import customStyles, { colors } from '@/utils/customStyles';
import {
    Anchor,
    Box,
    Button,
    Checkbox,
    Group,
    Image,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title
} from '@mantine/core';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const LoginComponent = () => {
    const router = useRouter();

    const { authenticatedUser, isLoading } = useAppSelector((state: RootState) => state.authState);

    console.log("authenticatedUser =>>>>> ", authenticatedUser);

    const dispatch = useAppDispatch();
    const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });

    const handleLogin = async () => {
        dispatch(loginUser({
            userData: {
                email: loginCredentials.email,
                password: loginCredentials.password
            },
            onSuccess: (response) => {
                console.log('Login successful:', response);
                toast.success('Login successful!');
                router.push('/home');
            },
            onError: (error) => {
                console.error('Login failed:', error);
                toast.error(`Login failed: ${error}`);
            }
        }));
    }

    return (
        <Group justify='center' style={{ minHeight: '100vh' }} bg={customStyles.colors.primary}>
            <Box
                w={180}
                h={150}
                style={{
                    position: 'absolute', top: 100, left: 80,
                    backgroundColor: colors.white,
                    borderRadius: '100%',
                    filter: 'blur(70px)',
                    zIndex: 1
                }}
            >

            </Box>
            <Paper radius={16} style={{ width: '100%', maxWidth: 500, padding: 24, border: 'none' }}>
                <Stack gap="lg">
                    {/* Logo and branding */}
                    <Group gap="xs" align="center">
                        <Box>
                            <Image
                                component={NextImage}
                                src="/images/qbotz-logo.png"
                                alt="Logo"
                                width={80}
                                height={80}
                            />
                        </Box>
                    </Group>

                    {/* Welcome text */}
                    <Stack gap="xs" mb={32}>
                        <Title order={2} size="h1" fw={700} c={colors.textPrimary}>
                            Welcome
                        </Title>
                        <Text size="sm" c={colors.textSecondary}>
                            Please sign in to your account to continue
                        </Text>
                    </Stack>

                    {/* Login Form */}
                    <Stack gap="md">
                        <TextInput
                            radius={8}
                            label="Email address"
                            placeholder="name@company.com"
                            value={loginCredentials.email}
                            onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })}
                            size="md"
                            styles={{
                                label: { color: colors.textPrimary, marginBottom: 4 },
                                input: {
                                    borderColor: colors.light,
                                    '&:focus': { borderColor: colors.light }
                                }
                            }}
                        />

                        <PasswordInput
                            radius={8}
                            label="Password"
                            placeholder="********"
                            value={loginCredentials.password}
                            onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
                            size="md"
                            styles={{
                                label: { color: colors.textPrimary, marginBottom: 4 },
                                input: {
                                    borderColor: colors.light,
                                    '&:focus': { borderColor: colors.light }
                                }
                            }}
                        />

                        <Group justify="space-between">
                            <Checkbox
                                disabled
                                label="Remember me"
                                size="sm"
                                styles={{
                                    label: { color: colors.secondary }
                                }}
                            />
                            <Anchor
                                style={{ cursor: 'not-allowed' }}
                                size="sm"
                                c={colors.primary}
                            >
                                Forgot password?
                            </Anchor>
                        </Group>

                        <Button
                            size="md"
                            fullWidth
                            loading={isLoading}
                            disabled={isLoading}
                            style={{
                                backgroundColor: colors.primary,
                                border: 'none',
                                borderRadius: 8,
                                height: 48
                            }}
                            onClick={handleLogin}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </Button>

                        <Group justify="center" gap="xs">
                            <Text size="sm" c={colors.secondary}>
                                Don&apos;t have an account?
                            </Text>
                            <Anchor
                                style={{ cursor: 'not-allowed' }}
                                size="sm"
                                c={colors.primary}
                            >
                                Create new account
                            </Anchor>
                        </Group>
                    </Stack>
                </Stack>
            </Paper>
        </Group>
    )
};

export default LoginComponent;