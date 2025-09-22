import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, forgetPassword } from '@/store/actions/auth.action';
import { ForgotPasswordResponse, UserDataResponse } from '@/types/auth.types';

interface AuthState {
    authenticatedUser: UserDataResponse | null;
    authToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    forgotPasswordResponse: ForgotPasswordResponse | null;
    forgotPasswordLoading: boolean;
    forgotPasswordError: string | null;
}

const initialState: AuthState = {
    authenticatedUser: null,
    authToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    forgotPasswordResponse: null,
    forgotPasswordLoading: false,
    forgotPasswordError: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: state => {
            state.authenticatedUser = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
            state.authToken = null;
            state.refreshToken = null;
            state.forgotPasswordResponse = null;
            state.forgotPasswordLoading = false;
            state.forgotPasswordError = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, state => {
                console.log('Login request is pending');
                state.isLoading = true;
                state.error = null;
            })
            .addCase(
                loginUser.fulfilled,
                (state, action: PayloadAction<UserDataResponse | null>) => {
                    if (action.payload) {
                        state.authenticatedUser = action.payload;
                        state.isAuthenticated = true;
                        state.authToken = action.payload.token;
                        state.refreshToken = action.payload.refreshToken;
                        state.isLoading = false;
                        state.error = null;
                    }
                },
            )
            .addCase(loginUser.rejected, (state, action) => {
                console.log('Login Error in slice', action.payload);
                state.isLoading = false;
                state.error = (action.payload as string);
            })
            .addCase(forgetPassword.pending, state => {
                console.log('Forget Password request is pending');
                state.forgotPasswordLoading = true;
                state.forgotPasswordError = null;
            })
            .addCase(
                forgetPassword.fulfilled,
                (state, action: PayloadAction<ForgotPasswordResponse | null>) => {
                    if (action.payload) {
                        state.forgotPasswordResponse = action.payload;
                        state.forgotPasswordLoading = false;
                        state.forgotPasswordError = null;
                    }
                },
            )
            .addCase(forgetPassword.rejected, (state, action) => {
                console.log('Forget Password Error in slice', action.payload);
                state.forgotPasswordLoading = false;
                state.forgotPasswordError = (action.payload as string);
            });
    },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
