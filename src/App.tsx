import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "./helpers/navigate.helpler";
import Router from "./routes/routes";

function App() {
   const navigate = useNavigate();
   useEffect(() => {
      setNavigate(navigate);
   }, [navigate]);

   return <Router />;
}

export default App;
