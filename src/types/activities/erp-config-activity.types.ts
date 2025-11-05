// * Initial state interface for ERP Config Activity
export interface ERPConfigActivityState {
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    bodyParams: Array<{ id: number; name: string; value: string }>;
    timeout: string;
    sslVerify: boolean;
    authType: string;
    username: string;
    password: string;
    headerRows: Array<{ id: number; name: string; value: string }>;
}

export const initialERPConfigActivityState: ERPConfigActivityState = {
    endpoint: '',
    method: 'GET',
    bodyParams: [],
    timeout: '30s',
    sslVerify: true,
    authType: 'Basic',
    username: '',
    password: '',
    headerRows: [],
}