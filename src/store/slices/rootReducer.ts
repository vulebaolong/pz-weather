import { combineReducers } from "redux";
import detail from "./detail/detail.slice";
import list from "./list/list.slice";

const combinedReducer = combineReducers({
   detail,
   list,
});

export const rootReducer = (state: any, action: any) => {
   // RESET STORE (all slice) TO INIT
   if (action.type === "detailSlice/RESET_DETAIL") state = undefined;
   return combinedReducer(state, action);
};
