import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [
    {
        token: "",
        userData: null,
    },
]

 const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<any>) => {
            const { token, userData } = action.payload;	
            state.push({ token, userData });
        },

        logout: (state) => {
            state.token = "";
            state.userData = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer