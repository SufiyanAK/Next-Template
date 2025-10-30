export interface EmailAttachment {
    id: number;
    name: string;
    contentType: string;
    size: number;
    parsedData: {
        // Legacy format support
        items?: Array<{
            item: string;
            qty: number;
            price: number;
            total: number;
        }>;
        purchaseOrder?: string;
        date?: string;
        grandTotal?: number;

        // SAP Purchase Order format
        CompanyCode?: string;
        PurchaseOrderType?: string;
        Supplier?: string;
        DocumentCurrency?: string;
        PurchasingOrganization?: string;
        PurchasingGroup?: string;
        to_PurchaseOrderItem?: Array<{
            Plant: string;
            OrderQuantity: string;
            PurchaseOrderQuantityUnit: string;
            DocumentCurrency: string;
            NetPriceAmount: string;
            NetPriceQuantity: string;
            Material: string;
        }>;

        [key: string]: any; // For other dynamic properties
    };
}

export interface Email {
    id: number;
    subject: string;
    fromAddress: string;
    body?: string;
    hasAttachments: boolean;
    processedAt: string;
    createdAt: string;
    Attachments: EmailAttachment[];
    SAPResponse?: {
        id: number;
        status: 'SUCCESS' | 'FAILED';
        responseData: any;
    } | null;
}