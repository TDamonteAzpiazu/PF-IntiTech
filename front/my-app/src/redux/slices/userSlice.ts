import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    userData: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<any>) => {
            const { userData } = action.payload;	
            state.userData = userData;
        },

        logout: (state) => {
            state.userData = null;
        },
        update: (state, action: PayloadAction<any>) => {
            const { userData } = action.payload;
            state.userData = userData;
        }
    },
});

export const { login, logout, update } = userSlice.actions;
export default userSlice.reducer