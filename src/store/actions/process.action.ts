import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, apiPost } from '@/utils/api-requests';
import API_ENDPOINTS from '@/constants/api-endpoints';
import { RecentProcess } from '@/types/process.types';

// * Thunk to get Recent Processes
export const getRecentProcesses = createAsyncThunk<Array<RecentProcess>>(
    'process/getRecentProcesses',
    async (_, { rejectWithValue }) => {
        const response = await apiGet(API_ENDPOINTS.process.getRecent);

        if (response.status !== 200) {
            const errorMessage =
                response.data?.message || `Login failed with status ${response.status}`;

            return rejectWithValue(errorMessage);
        }

        // The response now directly contains token and user
        const result = response.data;

        return result as Array<RecentProcess>;
    }
);