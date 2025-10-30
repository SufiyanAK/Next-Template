import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet } from '@/utils/api-requests';
import API_ENDPOINTS from '@/constants/api-endpoints';
import { MetaEnumStates } from '@/types/meta.types';

// Thunk to get Meta Information
export const getMeta = createAsyncThunk<MetaEnumStates>(
    "/screen/home-screen/meta-data",
    async (_, { rejectWithValue }) => {
        const response = await apiGet(API_ENDPOINTS.auth.meta);

        console.log("Response Meta: ", response)

        // Validate response status
        if (response.status !== 200) {
            const errorMessage =
                response.data?.message || `Login failed with status ${response.status}`;

            return rejectWithValue(errorMessage);
        }

        // The response now directly contains token and user
        const result = response.data as MetaEnumStates;

        return result as MetaEnumStates;
    });
