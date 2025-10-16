import API_ENDPOINTS from "@/constants/api-endpoints";
import {
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    LoginData,
    LoginResponse
} from "@/types/auth.types";
import { apiPost } from "@/utils/api-requests";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from "cookies-next";

// Interface for login parameters including response handler
interface LoginUserParams {
    userData: LoginData;
    onSuccess?: (response: LoginResponse) => void;
    onError?: (error: string) => void;
}


// Thunk to handle login
export const loginUser = createAsyncThunk<LoginResponse | null, LoginUserParams>(
    "screen/loginScreen",
    async ({ userData, onSuccess, onError }, { rejectWithValue }) => {
        try {
            const response = await apiPost(API_ENDPOINTS.login, userData);

            // Validate response status
            if (response.status !== 200) {
                const errorMessage =
                    response.data?.message || `Login failed with status ${response.status}`;

                // Call error handler if provided
                if (onError) {
                    onError(errorMessage);
                }

                return rejectWithValue(errorMessage);
            }

            // The response now directly contains token and user
            const result: LoginResponse = response.data;

            if (result.token && result.user) {
                // Store token in localStorage for axios interceptor
                if (typeof window !== 'undefined') {
                    localStorage.setItem('RPAAuthToken', result.token);
                    
                    // Also set cookie for server-side middleware access
                    setCookie('RPAAuthToken', result.token);
                }

                // Call success handler if provided
                if (onSuccess) {
                    onSuccess(result);
                }
            }

            return result as LoginResponse;
        } catch (error: any) {
            // Network or unexpected error handling
            if (axios.isAxiosError(error)) {
                // console.error("Axios Error:", {
                //     message: error.message,
                //     code: error.code,
                //     response: error.response,
                //     request: error.request,
                // });

                const errorMessage =
                    error.response?.data?.message ||
                    (error.code === "ERR_NETWORK" ? "Network Error" : error.message);

                // Call error handler if provided
                if (onError) {
                    onError(errorMessage);
                }

                return rejectWithValue(errorMessage);
            }

            const unexpectedError = "An unexpected error occurred";

            // Call error handler if provided
            if (onError) {
                onError(unexpectedError);
            }

            return rejectWithValue(unexpectedError);
        }
    }
);


// Thunk to handle forget password
export const forgetPassword = createAsyncThunk<
    ForgotPasswordResponse | null,
    ForgotPasswordRequest
>(
    "screen/forgetPasswordScreen",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await apiPost("/Auth/IAuthFeature/ForgetPassword", userData);

            console.log('Forget Password Response::', response)

            // Validate response status
            if (response.status !== 200) {
                const errorMessage =
                    response.data?.message || `Forget password failed with status ${response.status}`;
                return rejectWithValue(errorMessage);
            }

            // Parse and validate response data
            const result: ForgotPasswordResponse = response.data;
            if (!result.isRequestSuccess) {
                return rejectWithValue(result.message || "Request was not successful");
            }

            return result as ForgotPasswordResponse;
        } catch (error: any) {
            // Network or unexpected error handling
            if (axios.isAxiosError(error)) {
                console.error("Axios Error:", {
                    message: error.message,
                    code: error.code,
                    response: error.response,
                    request: error.request,
                });

                const errorMessage =
                    error.response?.data?.message ||
                    (error.code === "ERR_NETWORK" ? "Network Error" : error.message);
                return rejectWithValue(errorMessage);
            }

            console.error("Unexpected Error:", error);
            return rejectWithValue("An unexpected error occurred");
        }
    }
)
