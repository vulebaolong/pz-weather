import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { get } from "../api/api";
import { ENDPOINT } from "../constants/endpoint.contant";
import { REMOVE_LIST, SET_LIST } from "../store/slices/list/list.slice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Detail } from "../type/api.type";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { navigate } from "../helpers/navigate.helpler";
import { SET_DATA_DETAIL, SET_LOADING_DETAIL } from "../store/slices/detail/detail.slice";
import { toast } from "react-toastify";

const arr = ["London", "Vietnam"];

export default function List() {
   const dispatch = useAppDispatch();

   const { list } = useAppSelector((state) => state.list);

   useEffect(() => {
      arr.forEach((location) => {
         get(
            ENDPOINT.CURRENT() + `&q=${location}&aqi=no`,
            (data: Detail) => {
               console.log(data);
               dispatch(SET_LIST(data));
            },
            (error) => {
               console.log(`Error fetching data for ${location}:`, error);
            },
            () => {}
         );
      });
   }, []);

   const handleRemove = (name: string) => {
      dispatch(REMOVE_LIST(name));
   };

   const handleClickDetail = (name: string) => {
      navigate("/detail");
      dispatch(SET_LOADING_DETAIL(true));

      get(
         ENDPOINT.CURRENT() + `&q=${name}&aqi=no`,
         (data: Detail) => {
            console.log(data);
            dispatch(SET_DATA_DETAIL(data));
         },
         (error) => {
            console.log(error);
            toast.error(`Error!`);
         },
         () => {
            dispatch(SET_LOADING_DETAIL(false));
         }
      );
   };

   return (
      <Stack sx={{ gap: `20px`, alignItems: `center` }}>
         {list.map((item, i) => {
            return (
               <Stack
                  onClick={() => {
                     handleClickDetail(item.location.name);
                  }}
                  key={i}
                  sx={{
                     cursor: `pointer`,
                     width: `328px`,
                     p: `10px 30px`,
                     flexDirection: `row`,
                     borderRadius: `20px`,
                     backgroundColor: `rgba(255,255,255,0.3)`,
                     alignItems: `center`,
                     justifyContent: `space-between`,
                     position: `relative`,
                  }}
               >
                  <IconButton
                     size="small"
                     sx={{
                        position: `absolute`,
                        top: `2px`,
                        right: `2px`,
                        color: `red`,
                     }}
                     onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(item.location.name);
                     }}
                  >
                     <DeleteRoundedIcon />
                  </IconButton>
                  <Box>
                     <Typography sx={{ fontSize: `20px`, fontWeight: `700`, color: `white` }}>
                        {item.location.name}
                     </Typography>
                     <Typography sx={{ color: `white` }}>{item.location.country}</Typography>
                  </Box>
                  <Typography
                     sx={{
                        fontSize: `50px`,
                        color: `white`,
                        fontWeight: `900`,
                        textAlign: `center`,
                     }}
                  >
                     {item.current.temp_c}
                     <span style={{ verticalAlign: `top`, fontSize: `20px` }}>0</span>C
                  </Typography>
               </Stack>
            );
         })}
      </Stack>
   );
}
