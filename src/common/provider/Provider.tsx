import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode, useMemo } from "react";
import { Provider as ProviderRedux } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../../store/store";
import { BrowserRouter } from "react-router-dom";

export default function Provider({ children }: { children: ReactNode }) {
   const theme = useMemo(
      () =>
         createTheme({
            components: {
               MuiContainer: {
                  defaultProps: {
                     maxWidth: "lg",
                  },
               },
            },
         }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
   );
   return (
      <ProviderRedux store={store}>
         <BrowserRouter>
            <ThemeProvider theme={theme}>
               <CssBaseline />
               {children}
               <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable={false}
                  pauseOnHover
               />
            </ThemeProvider>
         </BrowserRouter>
      </ProviderRedux>
   );
}
