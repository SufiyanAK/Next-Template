import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiPut } from '@/utils/api-requests';
import API_ENDPOINTS from '@/constants/api-endpoints';
import { ProcessCreationResponse, ProcessDetailResponse, ProcessUpdatePayload, ProcessUpdateResponse, RecentProcess } from '@/types/process.types';

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
        processCategoryId: number;
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

// Interface for update process parameters including response handlers
interface UpdateProcessParams {
    processId: string;
    processData: ProcessUpdatePayload;
    onSuccess?: (response: ProcessUpdateResponse) => void;
    onError?: (error: string) => void;
}

// * Thunk to update Process
export const updateProcess = createAsyncThunk<ProcessUpdateResponse, UpdateProcessParams>(
    'process/updateProcess',
    async ({ processId, processData, onSuccess, onError }, { rejectWithValue }) => {
        try {
            // Replace {id} in the endpoint with actual processId
            const response = await apiPost(API_ENDPOINTS.process.update, processData, { id: processId });

            if (response.status !== 200) {
                const errorMessage =
                    response?.message || `Failed to update process with status ${response.status}`;

                // Call error handler if provided
                if (onError) {
                    onError(errorMessage);
                }

                return rejectWithValue(errorMessage);
            }

            const result = response.data as ProcessUpdateResponse;

            // Call success handler if provided
            if (onSuccess) {
                onSuccess(result);
            }

            return result;
        } catch (error: any) {
            const errorMessage = error?.message || 'An unexpected error occurred while updating process';

            // Call error handler if provided
            if (onError) {
                onError(errorMessage);
            }

            return rejectWithValue(errorMessage);
        }
    }
);

// Interface for get process by ID parameters including response handlers
interface GetProcessByIdParams {
    processId: string;
}

// * Thunk to get Process by ID
export const getProcessById = createAsyncThunk<ProcessDetailResponse, GetProcessByIdParams>(
    'process/getProcessById',
    async ({ processId }, { rejectWithValue }) => {
        const response = await apiGet(API_ENDPOINTS.process.getById, { id: processId });

        if (response.status !== 200) {
            const errorMessage =
                response?.message || `Failed to fetch process with status ${response.status}`;

            return rejectWithValue(errorMessage);
        }

        const result = response.data as ProcessDetailResponse;

        return result;
    }
);

// Interface for publish process parameters including response handlers
interface PublishProcessParams {
    processId: string;
    onSuccess?: (response: any) => void;
    onError?: (error: string) => void;
}

// * Thunk to publish Process
export const publishProcess = createAsyncThunk<any, PublishProcessParams>(
    'process/publishProcess',
    async ({ processId, onSuccess, onError }, { rejectWithValue }) => {
        try {
            // Replace {id} in the endpoint with actual processId
            const response = await apiPut(API_ENDPOINTS.process.publish, {}, { id: processId });

            if (response.status !== 200) {
                const errorMessage =
                    response?.message || `Failed to publish process with status ${response.status}`;

                // Call error handler if provided
                if (onError) {
                    onError(errorMessage);
                }

                return rejectWithValue(errorMessage);
            }

            const result = response.data;

            // Call success handler if provided
            if (onSuccess) {
                onSuccess(result);
            }

            return result;
        } catch (error: any) {
            const errorMessage = error?.message || 'An unexpected error occurred while publishing process';

            // Call error handler if provided
            if (onError) {
                onError(errorMessage);
            }

            return rejectWithValue(errorMessage);
        }
    }
);