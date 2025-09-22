export interface UserDataResponse {
    data: string
    token: string
    refreshToken: string
}

export interface ForgotPasswordResponse {
    data: string
    isRequestSuccess: string;
    message: string;
}

export interface ForgotPasswordRequest {
    data: string
}

export interface LoginData {
    data: string
}

export interface LoginResponse {
    isRequestSuccess: string;
    message: string;
    data: {
        refreshToken: string;
        token: string;
    }
}