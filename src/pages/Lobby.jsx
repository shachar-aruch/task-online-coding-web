import Button from "@mui/material/Button";

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Lobby({ exercises }) {
  const navigate = useNavigate();
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <h1>Choose code block</h1>
      {exercises.map(({ id }) => (
        <Button
          key={id}
          variant="contained"
          style={{ margin: "10px 0" }}
          onClick={() => navigate(`/CodeBlock${id}`)}
        >
          {`code block ${id} - Programming exercise`}
        </Button>
      ))}
    </div>
  );
}
