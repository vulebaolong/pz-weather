import { Box, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../store/store";
import Nodata from "./Nodata";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { navigate } from "../helpers/navigate.helpler";

export default function Detail() {
   const { dataDetail, loadingClickDetail } = useAppSelector((state) => state.detail);
   const renderContent = () => {
      if (loadingClickDetail) {
         return (
            <Stack sx={{ alignItems: `center`, justifyContent: `center`, width: `100%` }}>
               <CircularProgress size={50} sx={{ color: `white` }} />
            </Stack>
         );
      }
      if (dataDetail === null) return <Nodata />;

      return (
         <Stack>
            <Box
               sx={{ width: `200px`, height: `200px`, mx: `auto` }}
               src="/images/weather.png"
               alt="weather"
               component={`img`}
            />
            <Typography
               sx={{
                  fontSize: `150px`,
                  color: `white`,
                  fontWeight: `900`,
                  textAlign: `center`,
               }}
            >
               {dataDetail.current.temp_c}
               <span style={{ verticalAlign: `top`, fontSize: `50px` }}>0</span>C
            </Typography>
            <Stack
               sx={{
                  flexDirection: `row`,
                  gap: `10px`,
                  alignItems: `center`,
                  justifyContent: `center`,
               }}
            >
               <Box
                  sx={{
                     borderRadius: `10px`,
                     p: `5px 10px`,
                     backgroundColor: `rgba(255,255,255,0.6)`,
                  }}
               >
                  <Typography sx={{ fontSize: `20px` }}>{dataDetail.location.name}</Typography>
               </Box>
               <Box
                  sx={{ width: `100px`, height: `100px` }}
                  src={dataDetail.current.condition.icon}
                  alt="weather"
                  component={`img`}
               />
            </Stack>
         </Stack>
      );
   };
   return (
      <Box>
         <IconButton
            onClick={() => {
               navigate(-1);
            }}
         >
            <ArrowBackIosNewRoundedIcon />
         </IconButton>
         {renderContent()}
      </Box>
   );
}
