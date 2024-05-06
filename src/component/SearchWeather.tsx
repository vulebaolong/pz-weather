import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { get } from "../api/api";
import { ENDPOINT } from "../constants/endpoint.contant";
import { SET_DATA_DETAIL, SET_LOADING_DETAIL } from "../store/slices/detail/detail.slice";
import { useAppDispatch } from "../store/store";
import { Detail, TItemSearch } from "../type/api.type";
import { Search, SearchIconWrapper, StyledInputBase } from "./StyleMui";
import { navigate } from "../helpers/navigate.helpler";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { SET_LIST } from "../store/slices/list/list.slice";

let timer: number | undefined = undefined;

export default function SearchWeather() {
   const dispatch = useAppDispatch();
   const [searchTerm, setSearchTerm] = useState("");
   const [listSearch, setListSearch] = useState<null | TItemSearch[]>(null);

   useEffect(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
         if (searchTerm) {
            get(
               ENDPOINT.SEARCH() + `&q=${searchTerm}&aqi=no`,
               (data: TItemSearch[]) => {
                  console.log(data);
                  setListSearch(data);
               },
               () => {},
               () => {}
            );
         }
      }, 300);

      return () => clearTimeout(timer);
   }, [searchTerm]);

   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
   };

   const handleClickDetail = (name: string) => {
      navigate("/detail");
      setSearchTerm("");
      setListSearch([]);
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

   const handleClickCurrent = () => {
      navigate("/detail");
      dispatch(SET_LOADING_DETAIL(true));

      if ("geolocation" in navigator) {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               const latitude = position.coords.latitude;
               const longitude = position.coords.longitude;

               get(
                  `${ENDPOINT.CURRENT()}&q=${latitude},${longitude}&aqi=no`,
                  (data: Detail) => {
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
            },
            (error) => {
               console.error("Error:", error);
               dispatch(SET_LOADING_DETAIL(false));
            }
         );
      } else {
         console.log("Geolocation is not supported by this browser.");
      }
   };

   const handleAdd = (name: string) => {
      get(
         `${ENDPOINT.CURRENT()}&q=${name}&aqi=no`,
         (data: Detail) => {
            setSearchTerm("");
            setListSearch([]);
            dispatch(SET_LIST(data));
            toast.success(`Add successfully`);
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
      <Stack
         sx={{ width: `100%`, flexDirection: `row`, gap: `20px`, position: `fixed`, top: `20px` }}
      >
         <Search sx={{ position: `relative`, flex: `1` }}>
            <SearchIconWrapper>
               <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
               placeholder="Search…"
               inputProps={{ "aria-label": "search" }}
               onChange={handleSearchChange}
               value={searchTerm}
            />
            <Box
               sx={{
                  position: `absolute`,
                  top: `100%`,
                  left: `0`,
                  width: `100%`,
               }}
            >
               {listSearch?.map((item) => {
                  return (
                     <Stack
                        key={item.id}
                        sx={{
                           "flexDirection": `row`,
                           "alignItems": `center`,
                           "justifyContent": `space-between`,
                           "backgroundColor": `rgba(255,255,255,0.8)`,
                           "p": `5px`,
                           "cursor": `pointer`,
                           "&:hover": {
                              backgroundColor: `rgba(255,255,255,0.6)`,
                           },
                        }}
                        onClick={() => {
                           handleClickDetail(item.name);
                        }}
                     >
                        <Typography>{item.name}</Typography>
                        <IconButton
                           onClick={(e) => {
                              e.stopPropagation();
                              handleAdd(item.name);
                           }}
                           size="small"
                           sx={{
                              color: `blue`,
                           }}
                        >
                           <AddCircleOutlineRoundedIcon />
                        </IconButton>
                     </Stack>
                  );
               })}
            </Box>
         </Search>

         <IconButton onClick={handleClickCurrent}>
            <LocationOnIcon />
         </IconButton>
      </Stack>
   );
}
