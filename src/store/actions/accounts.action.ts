import API_ENDPOINTS from "@/constants/api-endpoints";
import { Account } from "@/types/accounts.types";
import { Email } from "@/types/email.types";
import { apiGet } from "@/utils/api-requests";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to handle login
export const getAccounts = createAsyncThunk<Array<Account> | null>(
    "screen/AccountsScreen/getAccounts",
    async (_, { rejectWithValue }) => {
        const response = await apiGet(API_ENDPOINTS.getAllAccounts);

        // Validate response status
        if (response.status !== 200) {
            const errorMessage =
                response.data?.message || `Login failed with status ${response.status}`;

            return rejectWithValue(errorMessage);
        }

        // The response now directly contains token and user
        const result = response.data;

        return result as Account[];
    }

);

export const getEmailsByAccountId = createAsyncThunk<Array<Email> | null, { accountId: number }>(
    "screen/AccountsScreen/getEmailsByAccountId",
    async ({ accountId }, { rejectWithValue }) => {
        const response = await apiGet(API_ENDPOINTS.getEmailsByAccountId, { accountId });

        // Validate response status
        if (response.status !== 200) {
            const errorMessage =
                response.data?.message || `Login failed with status ${response.status}`;

            return rejectWithValue(errorMessage);
        }

        // The response now directly contains token and user
        const result = response.data;

        return result as Email[];
    }

);
