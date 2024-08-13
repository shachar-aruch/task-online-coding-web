import { Box, Typography } from "@mui/material";

export default function RoleIndicator({ role }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 650,
        right: 100,
        padding: 2,
        backgroundColor: "lightblue",
        borderRadius: 1,
        "&:hover": {
          bgcolor: "primary.dark",
        },
      }}
    >
      <Typography color="black" fontSize={20}>
        {role}
      </Typography>
    </Box>
  );
}
