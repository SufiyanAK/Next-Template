export interface User {
    id: number;
    email: string;
}

export interface Account {
    id: number;
    provider: string;
    createdAt: string;
    updatedAt: string;
    user: User;
}

export interface GetAllAccountsResponse {
    data: Account[];
}

export interface GetEmailsByAccountIdResponse {
    data: any[]; // You can define the email structure based on your actual response
}