// * Initial state interface for Recent Processes
export interface RecentProcess {
    id: string;
    name: string;
    description: string;
    processCategoryId: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// * Initial state interface for Process Creation
export interface ProcessCreationStates {
    name: string;
    description: string;
    processCategoryId: string;
}

// * Initial state for Process Creation Response
export interface ProcessCreationResponse extends ProcessCreationStates {
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    id: string;
    isPublished: boolean;
}

// * Activity Types
export interface KeyValuePair {
    key: string;
    value: string;
}

export interface ReadEmailActivity {
    type: 'read-email';
    accountId: number;
    emailFolder: string;
    attachmentsOnly: boolean;
    additionalFilters: KeyValuePair[];
}

export interface AssignActivity {
    type: 'assign';
    field: string;
    value: string;
}

export interface ReplyEmailActivity {
    type: 'reply-email';
    replyBody: string;
    replyToAll: boolean;
    saveAsDraft: boolean;
}

export interface AuthConfig {
    authType: string;
    username: string;
    password: string;
}

export interface ErpConfigActivity {
    type: 'erp-config';
    endpointUrl: string;
    requestMethod: string;
    timeout: number;
    auth: AuthConfig;
    headers: KeyValuePair[];
    params: KeyValuePair[];
}

// * Union type for all activity types
export type Activity =
    | ReadEmailActivity
    | AssignActivity
    | ReplyEmailActivity
    | ErpConfigActivity;

// * Initial state for Process Update
export interface ProcessUpdateStates extends ProcessCreationStates {
    activities: Activity[];
}