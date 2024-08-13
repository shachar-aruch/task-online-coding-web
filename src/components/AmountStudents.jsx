import { Box, Typography } from "@mui/material";

export default function AmountStudents({ amount }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 35,
        right: 50,
        padding: 2,
        backgroundColor: "lightblue",
        borderRadius: 1,
        "&:hover": {
          bgcolor: "primary.dark",
        },
      }}
    >
      <Typography color="black" fontSize={20}>
        number of students in the room
      </Typography>
      <Typography color="black" fontSize={30} align="center">
        {amount}
      </Typography>
    </Box>
  );
}
