import ReactDOM from "react-dom/client";
import "./api/interceptor.ts"
import App from "./App.tsx";
import "./index.css";
import Provider from "./common/provider/Provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <>
      <Provider>
         <App />
      </Provider>
   </>
);
