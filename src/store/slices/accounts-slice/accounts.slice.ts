import { getAccounts, getEmailsByAccountId } from '@/store/actions/accounts.action';
import { Account } from '@/types/accounts.types';
import { Email } from '@/types/email.types';
import { createSlice } from '@reduxjs/toolkit';

interface AccountsStateProps {
    accountsList: Array<Account> | null;
    emailsByAccountId: Array<Email> | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AccountsStateProps = {
    accountsList: null,
    emailsByAccountId: null,
    isLoading: false,
    error: null,
}

const accounts = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // Get Accounts Thunk Cases
            .addCase(getAccounts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAccounts.fulfilled, (state, action) => {
                state.accountsList = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getAccounts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Get Emails By Account ID Thunk Cases
            .addCase(getEmailsByAccountId.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getEmailsByAccountId.fulfilled, (state, action) => {
                state.emailsByAccountId = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getEmailsByAccountId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });

    }

});



export default accounts.reducer;
