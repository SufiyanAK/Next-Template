'use client';

import { colors } from '@/utils/customStyles';
import {
    Box,
    Stack,
    Text,
    Group,
    Badge,
    ScrollArea,
    Paper,
    Card,
    Avatar,
    Divider,
    Table,
    // ActionIcon,
    // Tooltip
} from '@mantine/core';
import {
    Mail,
    Calendar,
    Paperclip,
    User,
    // Download,
    FileText,
    Package,
    DollarSign,
    Hash,
    Eye,
    CheckCircle,
    Clock,
    AlertCircle,
    XCircle
} from 'lucide-react';
import { Email } from '@/types/email.types';

interface EmailContentProps {
    selectedEmail: Email | null;
}

const EmailContent = ({ selectedEmail }: EmailContentProps) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (contentType: string) => {
        if (contentType.includes('pdf')) return <FileText size={16} />;
        if (contentType.includes('image')) return <Eye size={16} color={colors.green} />;
        if (contentType.includes('excel') || contentType.includes('spreadsheet')) return <Package size={16} color={colors.primary} />;
        return <FileText size={16} color={colors.textSecondary} />;
    };

    if (!selectedEmail) {
        return (
            <Box style={{
                flex: 1,
                height: '100%',
                backgroundColor: `${colors.light}10`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Stack align="center" gap={20}>
                    <Box
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            backgroundColor: `${colors.primary}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Mail size={60} color={colors.primary} />
                    </Box>
                    <Stack align="center" gap={8}>
                        <Text size="xl" fw={600} c={colors.textPrimary}>
                            Select an Email
                        </Text>
                        <Text size="md" c={colors.textSecondary} style={{ textAlign: 'center', maxWidth: '400px' }}>
                            Choose an email from the sidebar to view its content, attachments, and processed data.
                        </Text>
                    </Stack>
                </Stack>
            </Box>
        );
    }

    return (
        <Box style={{ flex: 1, height: '100%', backgroundColor: `${colors.light}10` }}>
            <ScrollArea h="100%" type="scroll" scrollbarSize={6}>
                <Box p={24}>
                    <Stack gap={24}>
                        {/* Email Header */}
                        <Paper
                            p={24}
                            radius={12}
                            style={{
                                border: `1px solid ${colors.tertiary}`,
                                backgroundColor: colors.white
                            }}
                        >
                            <Stack gap={20}>
                                {/* Subject and Meta */}
                                <Group justify="space-between" align="flex-start">
                                    <Stack gap={8} style={{ flex: 1 }}>
                                        <Text size="xl" fw={700} c={colors.textPrimary} style={{ lineHeight: 1.2 }}>
                                            {selectedEmail.subject}
                                        </Text>
                                        <Group gap={16}>
                                            <Group gap={8}>
                                                <User size={16} color={colors.textSecondary} />
                                                <Text size="sm" c={colors.textSecondary}>
                                                    From: {selectedEmail.fromAddress}
                                                </Text>
                                            </Group>
                                            <Group gap={8}>
                                                <Calendar size={16} color={colors.textSecondary} />
                                                <Text size="sm" c={colors.textSecondary}>
                                                    {formatDate(selectedEmail.createdAt)}
                                                </Text>
                                            </Group>
                                        </Group>
                                    </Stack>

                                    <Badge
                                        variant="light"
                                        color={selectedEmail.hasAttachments ? colors.primary : 'gray'}
                                        size="lg"
                                        radius="xl"
                                    >
                                        {selectedEmail.hasAttachments ? 'Has Attachments' : 'Text Only'}
                                    </Badge>
                                </Group>

                                {/* Processing Info */}
                                <Group gap={16}>
                                    <Group gap={8}>
                                        <Hash size={16} color={colors.textSecondary} />
                                        <Text size="sm" c={colors.textSecondary}>
                                            Email ID: {selectedEmail.id}
                                        </Text>
                                    </Group>
                                    <Group gap={8}>
                                        <Calendar size={16} color={colors.textSecondary} />
                                        <Text size="sm" c={colors.textSecondary}>
                                            Processed: {formatDate(selectedEmail.processedAt)}
                                        </Text>
                                    </Group>
                                </Group>
                            </Stack>
                        </Paper>

                        {/* Attachments Section */}
                        {selectedEmail.hasAttachments && selectedEmail.Attachments.length > 0 && (
                            <Paper
                                p={24}
                                radius={12}
                                style={{
                                    border: `1px solid ${colors.tertiary}`,
                                    backgroundColor: colors.white
                                }}
                            >
                                <Stack gap={20}>
                                    <Group justify="space-between" align="center">
                                        <Group gap={8}>
                                            <Paperclip size={20} color={colors.primary} />
                                            <Text size="lg" fw={600} c={colors.textPrimary}>
                                                Attachments
                                            </Text>
                                            <Badge variant="light" color={colors.primary} radius="xl">
                                                {selectedEmail.Attachments.length}
                                            </Badge>
                                        </Group>
                                    </Group>

                                    <Stack gap={16}>
                                        {selectedEmail.Attachments.map((attachment) => (
                                            <Card
                                                key={attachment.id}
                                                p={16}
                                                radius={8}
                                                style={{
                                                    border: `1px solid ${colors.tertiary}`,
                                                    backgroundColor: `${colors.primary}03`
                                                }}
                                            >
                                                <Stack gap={16}>
                                                    {/* Attachment Header */}
                                                    <Group justify="space-between" align="center">
                                                        <Group gap={12}>
                                                            <Avatar color={colors.primary} size="md" radius="xl">
                                                                {getFileIcon(attachment.contentType)}
                                                            </Avatar>
                                                            <Stack gap={2}>
                                                                <Text size="sm" fw={500} c={colors.textPrimary}>
                                                                    {attachment.name}
                                                                </Text>
                                                                <Group gap={8}>
                                                                    <Text size="xs" c={colors.textSecondary}>
                                                                        {attachment.contentType}
                                                                    </Text>
                                                                    <Text size="xs" c={colors.textSecondary}>
                                                                        {formatFileSize(attachment.size)}
                                                                    </Text>
                                                                </Group>
                                                            </Stack>
                                                        </Group>

                                                        {/* <Tooltip label="Download attachment">
                                                            <ActionIcon
                                                                variant="light"
                                                                color={colors.primary}
                                                                size="sm"
                                                            >
                                                                <Download size={16} />
                                                            </ActionIcon>
                                                        </Tooltip> */}
                                                    </Group>

                                                    {/* Parsed Data */}
                                                    {attachment.parsedData && (
                                                        <>
                                                            <Divider />
                                                            <Stack gap={16}>
                                                                <Text size="md" fw={600} c={colors.textPrimary}>
                                                                    Extracted Data
                                                                </Text>

                                                                {/* PO Summary Card - Show if SAP data exists */}
                                                                {(attachment.parsedData.CompanyCode || attachment.parsedData.PurchaseOrderType) && (
                                                                    <Paper
                                                                        p={16}
                                                                        radius={8}
                                                                        style={{
                                                                            border: `1px solid ${colors.primary}30`,
                                                                            backgroundColor: `${colors.primary}05`,
                                                                            marginBottom: '8px'
                                                                        }}
                                                                    >
                                                                        <Group justify="space-between" align="center">
                                                                            <Group gap={12}>
                                                                                <Avatar size="sm" color={colors.primary} radius="xl">
                                                                                    <FileText size={16} />
                                                                                </Avatar>
                                                                                <Stack gap={2}>
                                                                                    <Text size="sm" fw={600} c={colors.textPrimary}>
                                                                                        SAP Purchase Order
                                                                                    </Text>
                                                                                    <Text size="xs" c={colors.textSecondary}>
                                                                                        Type: {attachment.parsedData.PurchaseOrderType || 'N/A'} • Company: {attachment.parsedData.CompanyCode || 'N/A'}
                                                                                    </Text>
                                                                                </Stack>
                                                                            </Group>
                                                                            <Badge variant="light" color={colors.primary} size="sm">
                                                                                Processed
                                                                            </Badge>
                                                                        </Group>
                                                                    </Paper>
                                                                )}

                                                                {/* SAP Purchase Order Info */}
                                                                <Stack gap={16}>
                                                                    {/* Company & Supplier Info */}
                                                                    <Group gap={24} wrap="wrap">
                                                                        {attachment.parsedData.CompanyCode && (
                                                                            <Group gap={8}>
                                                                                <Hash size={16} color={colors.textSecondary} />
                                                                                <Text size="sm" c={colors.textSecondary}>
                                                                                    Company: {attachment.parsedData.CompanyCode}
                                                                                </Text>
                                                                            </Group>
                                                                        )}
                                                                        {attachment.parsedData.Supplier && (
                                                                            <Group gap={8}>
                                                                                <User size={16} color={colors.textSecondary} />
                                                                                <Text size="sm" c={colors.textSecondary}>
                                                                                    Supplier: {attachment.parsedData.Supplier}
                                                                                </Text>
                                                                            </Group>
                                                                        )}
                                                                        {attachment.parsedData.PurchaseOrderType && (
                                                                            <Group gap={8}>
                                                                                <FileText size={16} color={colors.primary} />
                                                                                <Text size="sm" c={colors.textPrimary} fw={500}>
                                                                                    Type: {attachment.parsedData.PurchaseOrderType}
                                                                                </Text>
                                                                            </Group>
                                                                        )}
                                                                    </Group>

                                                                    {/* Organization & Currency Info */}
                                                                    <Group gap={24} wrap="wrap">
                                                                        {attachment.parsedData.PurchasingOrganization && (
                                                                            <Group gap={8}>
                                                                                <Package size={16} color={colors.textSecondary} />
                                                                                <Text size="sm" c={colors.textSecondary}>
                                                                                    Org: {attachment.parsedData.PurchasingOrganization}
                                                                                </Text>
                                                                            </Group>
                                                                        )}
                                                                        {attachment.parsedData.PurchasingGroup && (
                                                                            <Group gap={8}>
                                                                                <User size={16} color={colors.textSecondary} />
                                                                                <Text size="sm" c={colors.textSecondary}>
                                                                                    Group: {attachment.parsedData.PurchasingGroup}
                                                                                </Text>
                                                                            </Group>
                                                                        )}
                                                                        {attachment.parsedData.DocumentCurrency && (
                                                                            <Group gap={8}>
                                                                                <DollarSign size={16} color={colors.green} />
                                                                                <Text size="sm" c={colors.green} fw={500}>
                                                                                    Currency: {attachment.parsedData.DocumentCurrency}
                                                                                </Text>
                                                                            </Group>
                                                                        )}
                                                                    </Group>
                                                                </Stack>



                                                                {/* Purchase Order Items Table */}
                                                                {attachment.parsedData.to_PurchaseOrderItem && attachment.parsedData.to_PurchaseOrderItem.length > 0 && (
                                                                    <Box>
                                                                        <Text size="sm" fw={500} c={colors.textPrimary} mb={12}>
                                                                            Purchase Order Items
                                                                        </Text>
                                                                        <Table
                                                                            striped
                                                                            highlightOnHover
                                                                            style={{
                                                                                border: `1px solid ${colors.tertiary}`,
                                                                                borderRadius: '8px',
                                                                                overflow: 'hidden'
                                                                            }}
                                                                        >
                                                                            <Table.Thead style={{ backgroundColor: `${colors.primary}08` }}>
                                                                                <Table.Tr>
                                                                                    <Table.Th style={{ padding: '12px 16px' }}>
                                                                                        <Text size="sm" fw={600}>Material</Text>
                                                                                    </Table.Th>
                                                                                    <Table.Th style={{ padding: '12px 16px' }}>
                                                                                        <Text size="sm" fw={600}>Plant</Text>
                                                                                    </Table.Th>
                                                                                    <Table.Th style={{ padding: '12px 16px' }}>
                                                                                        <Text size="sm" fw={600}>Quantity</Text>
                                                                                    </Table.Th>
                                                                                    <Table.Th style={{ padding: '12px 16px' }}>
                                                                                        <Text size="sm" fw={600}>Unit</Text>
                                                                                    </Table.Th>
                                                                                    <Table.Th style={{ padding: '12px 16px' }}>
                                                                                        <Text size="sm" fw={600}>Net Price</Text>
                                                                                    </Table.Th>
                                                                                    <Table.Th style={{ padding: '12px 16px' }}>
                                                                                        <Text size="sm" fw={600}>Currency</Text>
                                                                                    </Table.Th>
                                                                                </Table.Tr>
                                                                            </Table.Thead>
                                                                            <Table.Tbody>
                                                                                {attachment.parsedData.to_PurchaseOrderItem.map((item, index) => (
                                                                                    <Table.Tr key={index}>
                                                                                        <Table.Td style={{ padding: '12px 16px' }}>
                                                                                            <Text size="sm" fw={500}>{item.Material}</Text>
                                                                                        </Table.Td>
                                                                                        <Table.Td style={{ padding: '12px 16px' }}>
                                                                                            <Text size="sm">{item.Plant}</Text>
                                                                                        </Table.Td>
                                                                                        <Table.Td style={{ padding: '12px 16px' }}>
                                                                                            <Text size="sm">{item.OrderQuantity}</Text>
                                                                                        </Table.Td>
                                                                                        <Table.Td style={{ padding: '12px 16px' }}>
                                                                                            <Text size="sm">{item.PurchaseOrderQuantityUnit}</Text>
                                                                                        </Table.Td>
                                                                                        <Table.Td style={{ padding: '12px 16px' }}>
                                                                                            <Text size="sm" fw={500}>
                                                                                                {item.NetPriceAmount}
                                                                                                {item.NetPriceQuantity && ` (per ${item.NetPriceQuantity})`}
                                                                                            </Text>
                                                                                        </Table.Td>
                                                                                        <Table.Td style={{ padding: '12px 16px' }}>
                                                                                            <Badge size="sm" variant="light" color={colors.primary}>
                                                                                                {item.DocumentCurrency}
                                                                                            </Badge>
                                                                                        </Table.Td>
                                                                                    </Table.Tr>
                                                                                ))}
                                                                            </Table.Tbody>
                                                                        </Table>
                                                                    </Box>
                                                                )}
                                                            </Stack>
                                                        </>
                                                    )}
                                                </Stack>
                                            </Card>
                                        ))}
                                    </Stack>
                                </Stack>
                            </Paper>
                        )}

                        {/* SAP Response Status Section */}
                        {selectedEmail.SAPResponse && (
                            <Paper
                                p={24}
                                radius={12}
                                style={{
                                    border: `1px solid ${colors.tertiary}`,
                                    backgroundColor: colors.white
                                }}
                            >
                                <Stack gap={20}>
                                    <Group justify="space-between" align="center">
                                        <Group gap={8}>
                                            <Package size={20} color={colors.primary} />
                                            <Text size="lg" fw={600} c={colors.textPrimary}>
                                                SAP Purchase Order Status
                                            </Text>
                                        </Group>
                                        <Badge
                                            variant="filled"
                                            color={selectedEmail.SAPResponse.status === 'SUCCESS' ? 'green' : 'red'}
                                            size="md"
                                            radius="xl"
                                        >
                                            {selectedEmail.SAPResponse.status === 'SUCCESS' ? 'SUCCESS' : 'FAILED'}
                                        </Badge>
                                    </Group>

                                    {selectedEmail.SAPResponse.status === 'SUCCESS' ? (
                                        <Paper
                                            p={16}
                                            radius={8}
                                            style={{
                                                border: `1px solid ${colors.green}30`,
                                                backgroundColor: `${colors.green}08`
                                            }}
                                        >
                                            <Stack gap={12}>
                                                <Group gap={12} align="center">
                                                    <CheckCircle size={20} color={colors.green} />
                                                    <Stack gap={4} style={{ flex: 1 }}>
                                                        <Text size="sm" fw={600} c={colors.green}>
                                                            Purchase Order Created Successfully
                                                        </Text>
                                                        <Group gap={8}>
                                                            <Text size="xs" c={colors.textSecondary}>
                                                                PO Number: {selectedEmail.SAPResponse.responseData?.d?.PurchaseOrder || 'N/A'}
                                                            </Text>
                                                            <Group gap={4}>
                                                                <Clock size={12} color={colors.textSecondary} />
                                                                <Text size="xs" c={colors.textSecondary}>
                                                                    {formatDate(selectedEmail.processedAt)}
                                                                </Text>
                                                            </Group>
                                                        </Group>
                                                    </Stack>
                                                    <Badge variant="filled" color="green" size="sm" radius="xl">
                                                        SUCCESS
                                                    </Badge>
                                                </Group>

                                                {/* Success Details */}
                                                {selectedEmail.SAPResponse.responseData?.d && (
                                                    <Stack gap={12} mt={8}>
                                                        <Text size="sm" fw={500} c={colors.textPrimary}>
                                                            Purchase Order Details
                                                        </Text>
                                                        <Group gap={24} wrap="wrap">
                                                            <Group gap={6}>
                                                                <Text size="xs" c={colors.textSecondary}>PO Number:</Text>
                                                                <Text size="xs" fw={500} c={colors.textPrimary}>
                                                                    {selectedEmail.SAPResponse.responseData.d.PurchaseOrder}
                                                                </Text>
                                                            </Group>
                                                            <Group gap={6}>
                                                                <Text size="xs" c={colors.textSecondary}>Company:</Text>
                                                                <Text size="xs" fw={500} c={colors.textPrimary}>
                                                                    {selectedEmail.SAPResponse.responseData.d.CompanyCode}
                                                                </Text>
                                                            </Group>
                                                            <Group gap={6}>
                                                                <Text size="xs" c={colors.textSecondary}>Supplier:</Text>
                                                                <Text size="xs" fw={500} c={colors.textPrimary}>
                                                                    {selectedEmail.SAPResponse.responseData.d.Supplier}
                                                                </Text>
                                                            </Group>
                                                            <Group gap={6}>
                                                                <Text size="xs" c={colors.textSecondary}>Currency:</Text>
                                                                <Badge size="xs" variant="light" color={colors.primary}>
                                                                    {selectedEmail.SAPResponse.responseData.d.DocumentCurrency}
                                                                </Badge>
                                                            </Group>
                                                        </Group>
                                                    </Stack>
                                                )}
                                            </Stack>
                                        </Paper>
                                    ) : (
                                        <Paper
                                            p={16}
                                            radius={8}
                                            style={{
                                                border: `1px solid #ff634730`,
                                                backgroundColor: `#ff634708`
                                            }}
                                        >
                                            <Stack gap={12}>
                                                <Group gap={12} align="flex-start">
                                                    <XCircle size={20} color="#ff6347" />
                                                    <Stack gap={4} style={{ flex: 1 }}>
                                                        <Text size="sm" fw={600} c="#ff6347">
                                                            Purchase Order Creation Failed
                                                        </Text>
                                                        <Group gap={8}>
                                                            <Text size="xs" c={colors.textSecondary}>
                                                                Error occurred during SAP processing
                                                            </Text>
                                                            <Group gap={4}>
                                                                <Clock size={12} color={colors.textSecondary} />
                                                                <Text size="xs" c={colors.textSecondary}>
                                                                    {formatDate(selectedEmail.processedAt)}
                                                                </Text>
                                                            </Group>
                                                        </Group>
                                                    </Stack>
                                                    <Badge variant="filled" color="red" size="sm" radius="xl">
                                                        FAILED
                                                    </Badge>
                                                </Group>

                                                {/* Error Details */}
                                                {selectedEmail.SAPResponse.responseData?.error && (
                                                    <Stack gap={12} mt={8}>
                                                        <Text size="sm" fw={500} c={colors.textPrimary}>
                                                            Error Details
                                                        </Text>
                                                        <Paper p={12} radius={6} style={{ backgroundColor: `#ff634708` }}>
                                                            <Stack gap={8}>
                                                                <Group gap={8}>
                                                                    <AlertCircle size={14} color="#ff6347" />
                                                                    <Text size="xs" fw={500} c="#ff6347">
                                                                        {selectedEmail.SAPResponse.responseData.error.message?.value || 'Unknown error'}
                                                                    </Text>
                                                                </Group>
                                                                {selectedEmail.SAPResponse.responseData.error.innererror?.errordetails && (
                                                                    <Stack gap={4} ml={22}>
                                                                        {selectedEmail.SAPResponse.responseData.error.innererror.errordetails.map((detail: any, index: number) => (
                                                                            <Group key={index} gap={6}>
                                                                                <Badge size="xs" color="red" variant="outline">
                                                                                    {detail.code}
                                                                                </Badge>
                                                                                <Text size="xs" c={colors.textSecondary}>
                                                                                    {detail.message}
                                                                                </Text>
                                                                            </Group>
                                                                        ))}
                                                                    </Stack>
                                                                )}
                                                            </Stack>
                                                        </Paper>
                                                    </Stack>
                                                )}
                                            </Stack>
                                        </Paper>
                                    )}
                                </Stack>
                            </Paper>
                        )}

                        {/* Empty State for No Attachments */}
                        {!selectedEmail.hasAttachments && !selectedEmail.SAPResponse && (
                            <Paper
                                p={32}
                                radius={12}
                                style={{
                                    border: `1px solid ${colors.tertiary}`,
                                    backgroundColor: colors.white,
                                    textAlign: 'center'
                                }}
                            >
                                <Stack align="center" gap={16}>
                                    <Avatar size={60} radius="xl" style={{ backgroundColor: `${colors.primary}15` }}>
                                        <Mail size={30} color={colors.primary} />
                                    </Avatar>
                                    <Stack align="center" gap={8}>
                                        <Text size="lg" fw={600} c={colors.textPrimary}>
                                            Text-only Email
                                        </Text>
                                        <Text size="sm" c={colors.textSecondary}>
                                            This email contains only text content without attachments.
                                        </Text>
                                    </Stack>
                                </Stack>
                            </Paper>
                        )}

                        {/* Email Body Content for Text-Only Emails with SAP Response */}
                        {!selectedEmail.hasAttachments && selectedEmail.SAPResponse && selectedEmail.body && (
                            <Paper
                                p={24}
                                radius={12}
                                style={{
                                    border: `1px solid ${colors.tertiary}`,
                                    backgroundColor: colors.white
                                }}
                            >
                                <Stack gap={16}>
                                    <Group justify="space-between" align="center">
                                        <Group gap={8}>
                                            <Mail size={20} color={colors.primary} />
                                            <Text size="lg" fw={600} c={colors.textPrimary}>
                                                Email Content
                                            </Text>
                                        </Group>
                                        {selectedEmail.SAPResponse && (
                                            <Badge
                                                variant="light"
                                                color={selectedEmail.SAPResponse.status === 'SUCCESS' ? 'green' : 'red'}
                                                size="sm"
                                                radius="xl"
                                            >
                                                {selectedEmail.SAPResponse.status === 'SUCCESS' ? 'Success' : 'Failed'}
                                            </Badge>
                                        )}
                                    </Group>
                                    <Box
                                        style={{
                                            maxHeight: '200px',
                                            overflow: 'hidden',
                                            position: 'relative'
                                        }}
                                    >
                                        <div
                                            dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
                                            style={{
                                                fontSize: '14px',
                                                lineHeight: '1.5',
                                                color: colors.textSecondary
                                            }}
                                        />
                                        <Box
                                            style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                height: '40px',
                                                background: `linear-gradient(transparent, ${colors.white})`,
                                                pointerEvents: 'none'
                                            }}
                                        />
                                    </Box>
                                </Stack>
                            </Paper>
                        )}
                    </Stack>
                </Box>
            </ScrollArea>
        </Box>
    );
};

export default EmailContent;