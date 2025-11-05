import { createNewProcess, getProcessById, getRecentProcesses, publishProcess, updateProcess } from '@/store/actions/process.action';
import { Activity, ProcessCreationResponse, ProcessDetailResponse, ProcessUpdateResponse, RecentProcess } from '@/types/process.types';
import { createSlice } from '@reduxjs/toolkit';

// Helper function to transform ProcessDetailResponse to the required structure
const transformProcessDetail = (process: ProcessDetailResponse | null) => {
    if (!process) return null;

    return {
        name: process.name,
        description: process.description,
        processCategoryId: process.processCategoryId,
        activities: process.activities.map((activity) => {
            const baseActivity = {
                type: activity.type,
                ...activity.details
            };
            return baseActivity as Activity;
        })
    };
};

interface ProcessStateProps {
    recentProjects: Array<RecentProcess>;
    processesByCategory: { [categoryId: number]: Array<RecentProcess> };
    createdProcess: ProcessCreationResponse | null;
    updatedProcess: ProcessUpdateResponse | null;
    currentProcess: ProcessDetailResponse | null;
    transformedProcess: {
        name: string;
        description: string;
        processCategoryId: number;
        activities: Activity[];
    } | null;
    loadingCategories: { [categoryId: number]: boolean };
    isLoading: boolean;
    isUpdating: boolean;
    isFetchingProcess: boolean;
    isPublishing: boolean;
    error: string | null;
}

const initialState: ProcessStateProps = {
    recentProjects: [],
    createdProcess: null,
    updatedProcess: null,
    currentProcess: null,
    transformedProcess: null,
    processesByCategory: {},
    loadingCategories: {},
    isLoading: false,
    isUpdating: false,
    isFetchingProcess: false,
    isPublishing: false,
    error: null,
}

const ProcessSlice = createSlice({
    name: 'metaItems',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // Get Recent Process Thunk Cases
            .addCase(getRecentProcesses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getRecentProcesses.fulfilled, (state, action) => {
                state.recentProjects = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getRecentProcesses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Create New Process Thunk Cases
            .addCase(createNewProcess.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createNewProcess.fulfilled, (state, action) => {
                state.createdProcess = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(createNewProcess.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Update Process Thunk Cases
            .addCase(updateProcess.pending, (state) => {
                state.isUpdating = true;
                state.error = null;
            })
            .addCase(updateProcess.fulfilled, (state, action) => {
                state.updatedProcess = action.payload;
                state.isUpdating = false;
                state.error = null;
            })
            .addCase(updateProcess.rejected, (state, action) => {
                state.isUpdating = false;
                state.error = action.payload as string;
            })
            // Get Process by ID Thunk Cases
            .addCase(getProcessById.pending, (state) => {
                state.isFetchingProcess = true;
                state.error = null;
            })
            .addCase(getProcessById.fulfilled, (state, action) => {
                state.currentProcess = action.payload;
                state.transformedProcess = transformProcessDetail(action.payload);
                state.isFetchingProcess = false;
                state.error = null;
            })
            .addCase(getProcessById.rejected, (state, action) => {
                state.isFetchingProcess = false;
                state.error = action.payload as string;
            })
            // Publish Process Thunk Cases
            .addCase(publishProcess.pending, (state) => {
                state.isPublishing = true;
                state.error = null;
            })
            .addCase(publishProcess.fulfilled, (state) => {
                state.isPublishing = false;
                state.error = null;
                // Update the current process isPublished status if it exists
                if (state.currentProcess) {
                    state.currentProcess.isPublished = true;
                }
            })
            .addCase(publishProcess.rejected, (state, action) => {
                state.isPublishing = false;
                state.error = action.payload as string;
            })
        // Get Processes by Category ID Thunk Cases
        // .addCase(getProcessesByCategoryId.pending, (state, action) => {
        //     const categoryId = action.meta.arg;
        //     state.loadingCategories[categoryId] = true;
        // })
        // .addCase(getProcessesByCategoryId.fulfilled, (state, action) => {
        //     const categoryId = action.meta.arg;
        //     state.processesByCategory[categoryId] = action.payload;
        //     state.loadingCategories[categoryId] = false;
        // })
        // .addCase(getProcessesByCategoryId.rejected, (state, action) => {
        //     const categoryId = action.meta.arg;
        //     state.loadingCategories[categoryId] = false;
        // })
    }

});



export default ProcessSlice.reducer;
