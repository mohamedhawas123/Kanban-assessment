import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
    selectedColumn: string | null;
    isAddModalOpen: boolean;
    isEditModalOpen: boolean;
    isDeleteModalOpen: boolean;
    editingTask: any | null;
    deletingTask: any | null;
    isFetching: boolean;
    isAdding: boolean;
    isUpdating: boolean;
    isDeleting: boolean;

}

const initialState: UiState = {
    selectedColumn: null,
    isAddModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    editingTask: null,
    deletingTask: null,
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        openAddModal: (state, action: PayloadAction<string | null>) => {
            state.selectedColumn = action.payload;
            state.isAddModalOpen = true;
        },
        closeAddModal: (state) => {
            state.isAddModalOpen = false;
            state.selectedColumn = null;
        },
        openEditModal: (state, action: PayloadAction<any>) => {
            state.editingTask = action.payload;
            state.isEditModalOpen = true;
        },
        closeEditModal: (state) => {
            state.isEditModalOpen = false;
            state.editingTask = null;
        },
        openDeleteModal: (state, action: PayloadAction<any>) => {
            state.deletingTask = action.payload;
            state.isDeleteModalOpen = true;
        },
        closeDeleteModal: (state) => {
            state.isDeleteModalOpen = false;
            state.deletingTask = null;
        },
        setFetching: (s, a: PayloadAction<boolean>) => { s.isFetching = a.payload; },
        setAdding: (s, a: PayloadAction<boolean>) => { s.isAdding = a.payload; },
        setUpdating: (s, a: PayloadAction<boolean>) => { s.isUpdating = a.payload; },
        setDeleting: (s, a: PayloadAction<boolean>) => { s.isDeleting = a.payload; },
    },
});

export const {
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
     setFetching, setAdding, setUpdating, setDeleting,
} = uiSlice.actions;


export default uiSlice.reducer;
