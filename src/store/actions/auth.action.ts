import {
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    LoginData,
    LoginResponse,
    UserDataResponse
} from "@/types/auth.types";
import { apiPost } from "@/utils/api-requests";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Thunk to handle login
export const loginUser = createAsyncThunk<UserDataResponse | null, LoginData>(
    "screen/loginScreen",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await apiPost("/Auth/IAuthFeature/Login", userData);

            console.log('Login Response::', response)

            // Validate response status
            if (response.status !== 200) {
                const errorMessage =
                    response.data?.message || `Login failed with status ${response.status}`;
                return rejectWithValue(errorMessage);
            }

            // Parse and validate response data
            const result: LoginResponse = response.data;
            if (!result.isRequestSuccess) {
                return rejectWithValue(result.message || "Request was not successful");
            }

            if (result.data?.token && result.data?.refreshToken) {
                console.log('token:', result.data?.token);
                console.log('refresh token:', result.data?.refreshToken)
                // tokenStorage.saveToken(result.data.token);
                // tokenStorage.saveRefreshToken(result.data.refreshToken);
            }

            return result.data as UserDataResponse;
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
