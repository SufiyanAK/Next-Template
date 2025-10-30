import { getRecentProcesses } from '@/store/actions/process.action';
import { RecentProcess } from '@/types/process.types';
import { createSlice } from '@reduxjs/toolkit';

interface ProcessStateProps {
    recentProjects: Array<RecentProcess>;
    processesByCategory: { [categoryId: number]: Array<RecentProcess> };
    loadingCategories: { [categoryId: number]: boolean };
    isLoading: boolean;
    error: string | null;
}

const initialState: ProcessStateProps = {
    recentProjects: [],
    processesByCategory: {},
    loadingCategories: {},
    isLoading: false,
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
                console.log("Get recent processes in pending");
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getRecentProcesses.fulfilled, (state, action) => {
                console.log("Get recent processes fulfilled");
                state.recentProjects = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getRecentProcesses.rejected, (state, action) => {
                console.log("Get recent processes rejected");
                state.isLoading = false;
                state.error = action.payload as string;
            })
        // Get Processes by Category ID Thunk Cases
        // .addCase(getProcessesByCategoryId.pending, (state, action) => {
        //     console.log("Get processes by category ID in pending");
        //     const categoryId = action.meta.arg;
        //     state.loadingCategories[categoryId] = true;
        // })
        // .addCase(getProcessesByCategoryId.fulfilled, (state, action) => {
        //     console.log("Get processes by category ID fulfilled");
        //     const categoryId = action.meta.arg;
        //     state.processesByCategory[categoryId] = action.payload;
        //     state.loadingCategories[categoryId] = false;
        // })
        // .addCase(getProcessesByCategoryId.rejected, (state, action) => {
        //     console.log("Get processes by category ID rejected");
        //     const categoryId = action.meta.arg;
        //     state.loadingCategories[categoryId] = false;
        // })
    }

});



export default ProcessSlice.reducer;
