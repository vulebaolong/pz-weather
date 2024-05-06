import { createSlice } from "@reduxjs/toolkit";
import { TUserInitialState } from "./user.type";

const initialState: TUserInitialState = {
  
};

const userSlice = createSlice({
   name: "userSlice",
   initialState,
   reducers: {
      RESET_USER: () => initialState,
   },
});

export const { RESET_USER } = userSlice.actions;

export default userSlice.reducer;
