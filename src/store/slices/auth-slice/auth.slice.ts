import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, forgetPassword } from '@/store/actions/auth.action';
import { ForgotPasswordResponse, User, LoginResponse } from '@/types/auth.types';

interface AuthState {
    authenticatedUser: User | null;
    authToken: string | null;
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
            state.forgotPasswordResponse = null;
            state.forgotPasswordLoading = false;
            state.forgotPasswordError = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(
                loginUser.fulfilled,
                (state, action: PayloadAction<LoginResponse | null>) => {
                    if (action.payload) {
                        state.authenticatedUser = action.payload.user;
                        state.isAuthenticated = true;
                        state.authToken = action.payload.token;
                        state.isLoading = false;
                        state.error = null;
                    }
                },
            )
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string);
            })
            .addCase(forgetPassword.pending, state => {
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
                state.forgotPasswordLoading = false;
                state.forgotPasswordError = (action.payload as string);
            });
    },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
