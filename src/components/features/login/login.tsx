import {
    Group,
    Stack,
    Title,
    Text,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Anchor,
    Box,
    Paper
} from '@mantine/core';
import customStyles, { colors } from '@/utils/customStyles';

const LoginComponent = () => {
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
                        <Box
                            style={{
                                width: 50,
                                height: 50,
                                backgroundColor: colors.primary,
                                borderRadius: 8,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '18px'
                            }}
                        >
                            RPA
                        </Box>
                        <Text size="xl" fw={600} c={colors.textPrimary}>
                            Platform
                        </Text>
                    </Group>

                    {/* Welcome text */}
                    <Stack gap="xs" mb={32}>
                        <Title order={2} size="h1" fw={700} c={colors.textPrimary}>
                            Welcome back
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
                                label="Remember me"
                                size="sm"
                                styles={{
                                    label: { color: colors.secondary }
                                }}
                            />
                            <Anchor size="sm" c={colors.primary}>
                                Forgot password?
                            </Anchor>
                        </Group>

                        <Button
                            size="md"
                            fullWidth
                            style={{
                                backgroundColor: colors.primary,
                                border: 'none',
                                borderRadius: 8,
                                height: 48
                            }}
                        >
                            Sign In
                        </Button>

                        <Group justify="center" gap="xs">
                            <Text size="sm" c={colors.secondary}>
                                Don&apos;t have an account?
                            </Text>
                            <Anchor size="sm" c={colors.primary}>
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