import CreateProjectCardComponent from "@/components/common/create-project-card";
import { colors } from "@/utils/customStyles";
import { Box, Container, Divider, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { Clock, File, Folder, Plus } from "lucide-react";

const recentProjects = [
    {
        id: 1,
        name: "Invoice Processing",
        description: "Automated invoice data extraction and entry",
        date: "15/10/2023"
    },
    {
        id: 2,
        name: "Customer Onboarding",
        description: "New customer data verification and system setup",
        date: "15/10/2023"
    },
    {
        id: 3,
        name: "Email Automation",
        description: "Automated email response and categorization",
        date: "15/10/2023"
    }
];

const HomeComponent = () => {
    return (
        <Box
            style={{
                minHeight: 'calc(100vh - 66px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Container size="lg" py={40} style={{ width: '100%' }}>
                <Stack gap={40} justify="center" align="center">
                    {/* Header Section */}
                    <Stack align="center" gap={8}>
                        <Title order={1} size="h1" c={colors.textPrimary}>
                            RPA Designer
                        </Title>
                        <Text c={colors.textSecondary} size="lg">
                            Create, manage, and run automated workflows
                        </Text>
                    </Stack>

                    {/* Action Cards */}
                    <Group
                        w="100%"
                        justify="center"
                        gap={24}
                        style={{
                            '@media (maxWidth: 768px)': {
                                flexDirection: 'column',
                                alignItems: 'center'
                            }
                        }}
                    >
                        <CreateProjectCardComponent
                            hasIcon={true}
                            Icon={<Plus size={20} color={colors.primary} />}
                            title="Create New Project"
                            description="Start building a new automation workflow from scratch"
                            onClickPath="/projects/new"
                        />
                        <CreateProjectCardComponent
                            hasIcon={true}
                            Icon={<Folder size={20} color={colors.secondary} />}
                            color={colors.secondary}
                            title="Open Recent Project"
                            description="Continue working on an existing automation project"
                            onClickPath="/projects/recent"
                        />
                    </Group>

                    {/* Recent Projects Section */}
                    <Box mt={20} w="100%">
                        {/* Section Header */}
                        <Box
                            bg={colors.primary}
                            px={20}
                            py={12}
                            style={{ borderRadius: '8px 8px 0 0' }}
                        >
                            <Text c={colors.white} size="lg">
                                Recent Projects
                            </Text>
                        </Box>

                        {/* Projects List */}
                        <Paper
                            style={{
                                border: `1px solid ${colors.light}`,
                                borderRadius: '0 0 8px 8px',
                                borderTop: 'none'
                            }}
                        >
                            {recentProjects.map((project, index) => (
                                <Box key={project.id}>
                                    <Group
                                        p={16}
                                        justify="space-between"
                                        style={{
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: colors.background
                                            }
                                        }}
                                    >
                                        <Group gap={12}>
                                            <File size={20} color={colors.primary} />
                                            <Stack gap={4}>
                                                <Text fw={600} c={colors.textPrimary}>
                                                    {project.name}
                                                </Text>
                                                <Text size="sm" c={colors.textSecondary}>
                                                    {project.description}
                                                </Text>
                                            </Stack>
                                        </Group>
                                        <Group gap={8}>
                                            <Clock size={16} color={colors.textSecondary} />
                                            <Text size="sm" c={colors.textSecondary}>
                                                {project.date}
                                            </Text>
                                        </Group>
                                    </Group>
                                    {index < recentProjects.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </Paper>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default HomeComponent;