'use client';

import { logoutUser } from "@/store/slices/auth-slice/auth.slice";
import { useAppDispatch } from "@/store/store";
import { colors } from "@/utils/customStyles";
import { ActionIcon, Anchor, Group, Menu, Text } from "@mantine/core";
import { Bell, ChevronDown, HelpCircle, LogOut, Settings, User, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const HeaderComponent = () => {
    const dispatch = useAppDispatch()
    const router = useRouter();

    const handleLogout = () => {
        // Clear authentication state
        dispatch(logoutUser());

        // Clear local storage (if you store tokens there)
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');

        // Redirect to login page
        router.push('/login');
    };

    return (
        <Group px={16} py={12} bg={colors.primary} justify="space-between" style={{ minHeight: '60px' }}>
            {/* Left Section - Logo and Title */}
            <Group gap={12}>
                <Anchor
                    href="/home"
                    underline="never"
                    style={{
                        width: 36,
                        height: 36,
                        backgroundColor: colors.white,
                        color: colors.primary,
                        borderRadius: 6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}
                >
                    RPA
                </Anchor>
                <Text
                    size="lg"
                    fw={600}
                    c={colors.white}
                    style={{ fontSize: '18px' }}
                >
                    QBotz.io
                </Text>
            </Group>

            {/* Right Section - Action Icons and User Profile */}
            <Group gap={8}>
                <ActionIcon
                    variant="transparent"
                    size="lg"
                    c={colors.white}
                    style={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                    }}
                >
                    <Settings size={20} />
                </ActionIcon>

                <ActionIcon
                    variant="transparent"
                    size="lg"
                    c={colors.white}
                    style={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                    }}
                >
                    <HelpCircle size={20} />
                </ActionIcon>

                <ActionIcon
                    variant="transparent"
                    size="lg"
                    c={colors.white}
                    style={{
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                    }}
                >
                    <Bell size={20} />
                </ActionIcon>

                {/* User Profile Section with Dropdown */}
                <Menu shadow="md" width={200} position="bottom-end">
                    <Menu.Target>
                        <Group
                            gap={8}
                            ml={8}
                            p={4}
                            bg={colors.white}
                            style={{
                                cursor: 'pointer',
                                padding: '6px 8px',
                                borderRadius: '50px',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}
                        >
                            <ActionIcon
                                variant="filled"
                                size="lg"
                                bg={colors.primary}
                                c={colors.white}
                                radius="xl"
                            >
                                <User size={18} />
                            </ActionIcon>
                            <Text
                                size="sm"
                                fw={500}
                                c={colors.primary}
                            >
                                Admin
                            </Text>
                            <ChevronDown color={colors.primary} size={16} />
                        </Group>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item
                            leftSection={<UserCircle size={16} />}
                            onClick={() => {
                                // Handle profile click
                                console.log('Profile clicked');
                            }}
                        >
                            Profile
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<Settings size={16} />}
                            onClick={() => {
                                // Handle account settings click
                                console.log('Account Settings clicked');
                            }}
                        >
                            Account Settings
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                            color="red"
                            leftSection={<LogOut size={16} />}
                            onClick={handleLogout}
                        >
                            Logout
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Group>
    )
}

export default HeaderComponent