import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
    selectedColumn: string | null;
    isAddModalOpen: boolean;
    isEditModalOpen: boolean;
    isDeleteModalOpen: boolean;
    editingTask: any | null;
    deletingTask: any | null;

}

const initialState: UiState = {
    selectedColumn: null,
    isAddModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    editingTask: null,
    deletingTask: null,
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
    },
});

export const {
  openAddModal,
  closeAddModal,
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal,
} = uiSlice.actions;


export default uiSlice.reducer;
