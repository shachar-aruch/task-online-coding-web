import { Box, Button, Typography } from "@mui/material";
import { socket } from "../socket";

export default function RoleIndicator({ role, id }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 650,
        right: 100,
      }}
    >
      <Typography
        sx={{
          padding: 2,
          backgroundColor: "lightblue",
          borderRadius: 1,
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
        color="black"
        fontSize={20}
      >
        {role}
      </Typography>
      {role === "viewer" && (
        <Button
          variant="contained"
          sx={{ color: "black", backgroundColor: "lightblue", marginTop: 5 }}
          onClick={() => socket.emit("choose student", { roomId: id })}
        >
          ask to edit code
        </Button>
      )}
    </Box>
  );
}
