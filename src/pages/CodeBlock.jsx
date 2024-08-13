import React, { useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import RoleIndicator from "../components/RoleIndicator";
import AmountStudents from "../components/AmountStudents";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { socket } from "../socket";

export default function CodeBlock({ id, description }) {
  const navigate = useNavigate();
  const [role, setRole] = React.useState(null);
  const [amount, setAmount] = React.useState(null);

  useEffect(() => {
    socket.emit("join", { roomId: id });

    socket.on("joined", ({ role }) => {
      setRole(role);
      if (role === "student") {
        socket.on("teacher left", () => {
          navigate("/");
        });
      }
    });
    socket.on("amount changed", ({ amount }) => {
      setAmount(amount);
    });
  }, [id, navigate]);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        code block 1 - Programming exercise
      </h1>

      <CodeEditor
        exId={id}
        exDescription={description}
        readOnly={role === "teacher"}
      />
      {role && <RoleIndicator role={role} />}
      {amount && <AmountStudents amount={amount} />}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => {
            navigate("/");
            socket.emit("leave room");
          }}
        >
          BACK TO LOBBY
        </Button>
      </Box>
    </>
  );
}
