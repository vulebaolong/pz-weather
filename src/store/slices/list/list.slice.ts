import { createSlice } from "@reduxjs/toolkit";
import { TListInitialState } from "./list.type";

const initialState: TListInitialState = {
   list: [],
};

const listSlice = createSlice({
   name: "listSlice",
   initialState,
   reducers: {
      SET_LIST: (state, { payload }) => {
         const existingItem = state.list.find(
            (item) => item.location.name === payload.location.name
         );

         if (!existingItem) {
            state.list = [...state.list, payload];
         }
      },
      REMOVE_LIST: (state, { payload }) => {
         state.list = state.list.filter((item) => item.location.name !== payload);
      },

      RESET_DETAIL: () => initialState,
   },
});

export const { RESET_DETAIL, SET_LIST, REMOVE_LIST } = listSlice.actions;

export default listSlice.reducer;
