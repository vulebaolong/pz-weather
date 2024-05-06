import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import SearchWeather from "../component/SearchWeather";

export default function MainLayout() {
   return (
      <Box
         sx={{
            backgroundColor: `#4084ff`,
            width: `100vw`,
            height: `100vh`,
            overflowY: `auto`,
         }}
      >
         <Box sx={{ py: `50px` }}>
            <SearchWeather />
            <Container>
               {/* body */}
               <Box sx={{ mt: `50px`, pt: `40px` }}>{<Outlet />}</Box>
            </Container>
         </Box>
      </Box>
   );
}
