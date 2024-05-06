import { createSlice } from "@reduxjs/toolkit";
import { TDetailInitialState } from "./detail.type";

const initialState: TDetailInitialState = {
   dataDetail: null,
   loadingClickDetail: false,
};

const detailSlice = createSlice({
   name: "detailSlice",
   initialState,
   reducers: {
      SET_DATA_DETAIL: (state, { payload }) => {
         state.dataDetail = payload;
      },
      SET_LOADING_DETAIL: (state, { payload }) => {
         state.loadingClickDetail = payload;
      },
      RESET_DETAIL: () => initialState,
   },
});

export const { RESET_DETAIL, SET_DATA_DETAIL, SET_LOADING_DETAIL } = detailSlice.actions;

export default detailSlice.reducer;
