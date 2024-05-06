import SearchIcon from "@mui/icons-material/Search";
import { Box, CircularProgress, Container, IconButton, Stack, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { get } from "./api/api";
import { Search, SearchIconWrapper, StyledInputBase } from "./component/StyleMui";
import { ENDPOINT } from "./constants/endpoint.contant";
import { Detail, TItemSearch } from "./type/api.type";
import Nodata from "./component/Nodata";
import LocationOnIcon from "@mui/icons-material/LocationOn";

let timer: number | undefined = undefined;

function App() {
   const [searchTerm, setSearchTerm] = useState("");
   const [listSearch, setListSearch] = useState<null | TItemSearch[]>(null);
   const [dataDetail, setDataDetail] = useState<null | Detail>(null);
   const [loadingClickDetail, setLoadingClickDetail] = useState(false);

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
      }, 20);

      return () => clearTimeout(timer);
   }, [searchTerm]);

   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
   };

   const handleClickDetail = (name: string) => {
      setSearchTerm("");
      setListSearch([]);
      setLoadingClickDetail(true);
      get(
         ENDPOINT.CURRENT() + `&q=${name}&aqi=no`,
         (data: Detail) => {
            console.log(data);
            setDataDetail(data);
         },
         (error) => {
            console.log(error);
            toast.error(`Error!`);
         },
         () => {
            setLoadingClickDetail(false);
         }
      );
   };

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

   const handleClickCurrent = () => {
      if ("geolocation" in navigator) {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               const latitude = position.coords.latitude;
               const longitude = position.coords.longitude;

               // Gọi hàm get() với latitude và longitude nhận được
               get(
                  `${ENDPOINT.CURRENT()}&q=${latitude},${longitude}&aqi=no`,
                  (data: Detail) => {
                     console.log(data);
                     setDataDetail(data);
                  },
                  (error) => {
                     console.log(error);
                     toast.error(`Error!`);
                  },
                  () => {
                     setLoadingClickDetail(false);
                  }
               );
            },
            (error) => {
               console.error("Error:", error);
            }
         );
      } else {
         console.log("Geolocation is not supported by this browser.");
      }
   };

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
            <Container>
               <Stack sx={{ width: `100%`, flexDirection: `row`, gap: `20px` }}>
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
                                    "backgroundColor": `rgba(255,255,255,0.8)`,
                                    // backgroundColor: `#699fff`,
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
                              </Stack>
                           );
                        })}
                     </Box>
                  </Search>
                  <IconButton onClick={handleClickCurrent}>
                     <LocationOnIcon />
                  </IconButton>
               </Stack>

               <Box sx={{ mt: `50px` }}>{renderContent()}</Box>
            </Container>
         </Box>
      </Box>
   );
}

export default App;
