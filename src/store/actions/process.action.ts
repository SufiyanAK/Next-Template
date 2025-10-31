import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, apiPost } from '@/utils/api-requests';
import API_ENDPOINTS from '@/constants/api-endpoints';
import { ProcessCreationResponse, RecentProcess } from '@/types/process.types';

// * Thunk to get Recent Processes
export const getRecentProcesses = createAsyncThunk<Array<RecentProcess>>(
    'process/getRecentProcesses',
    async (_, { rejectWithValue }) => {
        const response = await apiGet(API_ENDPOINTS.process.getRecent);

        if (response.status !== 200) {
            const errorMessage =
                response?.message || `Recent processes fetched failed ${response.status}`;

            return rejectWithValue(errorMessage);
        }

        // The response now directly contains token and user
        const result = response.data;

        return result as Array<RecentProcess>;
    }
);

// Interface for create process parameters including response handlers
interface CreateProcessParams {
    processData: {
        name: string;
        categoryId: number;
        description: string;
    };
    onSuccess?: (response: ProcessCreationResponse) => void;
    onError?: (error: string) => void;
}

// * Thunk to create new Process
export const createNewProcess = createAsyncThunk<ProcessCreationResponse, CreateProcessParams>(
    'process/createNewProcess',
    async ({ processData, onSuccess, onError }, { rejectWithValue }) => {
        try {
            const response = await apiPost(API_ENDPOINTS.process.create, processData);

            if (response.status !== 200) {
                const errorMessage =
                    response?.message || `Failed to create process with status ${response.status}`;

                // Call error handler if provided
                if (onError) {
                    onError(errorMessage);
                }

                return rejectWithValue(errorMessage);
            }

            const result = response.data.process as ProcessCreationResponse;

            // Call success handler if provided
            if (onSuccess) {
                onSuccess(result);
            }

            return result;
        } catch (error: any) {
            const errorMessage = error?.message || 'An unexpected error occurred';

            // Call error handler if provided
            if (onError) {
                onError(errorMessage);
            }

            return rejectWithValue(errorMessage);
        }
    }
);