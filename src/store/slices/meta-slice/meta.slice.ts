
import { getMeta } from '@/store/actions/meta.action';
import { MetaEnumStates, MetaEnumTypes } from '@/types/meta.types';
import { createSlice } from '@reduxjs/toolkit';

interface MetaStateProps {
    meta: MetaEnumStates;
    isLoading: boolean;
    error: string | null;
}

const initialState: MetaStateProps = {
    meta: {
        enums: [],
        enumTypes: {} as MetaEnumTypes,
        processCategories: []
    },
    isLoading: false,
    error: null,
}

const metaItemsSlice = createSlice({
    name: 'metaItems',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // Get Accounts Thunk Cases
            .addCase(getMeta.pending, (state) => {
                console.log("Get accounts in pending");
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getMeta.fulfilled, (state, action) => {
                console.log("Get meta fulfilled");
                state.meta = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getMeta.rejected, (state, action) => {
                console.log("Get accounts rejected");
                state.isLoading = false;
                state.error = action.payload as string;
            })
    }

});



export default metaItemsSlice.reducer;
