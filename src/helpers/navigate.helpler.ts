import { NavigateFunction, NavigateOptions, To } from "react-router-dom";

let navigateFunction: NavigateFunction;

export let navigate = (to: To | number, options?: NavigateOptions) => {
   if (typeof to === "number") {
      navigateFunction(to);
      return;
   }

   navigateFunction(to, options);
};

export const setNavigate = (navigateSet: NavigateFunction) => {
   navigateFunction = navigateSet;
};
