export interface Role {
    id: number;
    name: string;
    type: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: number;
    roleId: number;
    email: string;
    displayName: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface ForgotPasswordResponse {
    data: string;
    isRequestSuccess: string;
    message: string;
}

export interface ForgotPasswordRequest {
    data: string;
}

export interface LoginData {
    email: string;
    password: string;
}