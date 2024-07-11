import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<any>) => {
            const { userData } = action.payload;	
            console.log(userData);
            state.userData = userData;
            return state
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