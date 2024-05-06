import { Stack, SxProps, Typography } from "@mui/material";
import IconEmpty from "./icon/IconEmpty";

export default function Nodata({ sx }: { sx?: SxProps }) {
   return (
      <Stack
         sx={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            ...sx,
         }}
      >
         <IconEmpty />
         <Typography>No data</Typography>
      </Stack>
   );
}
