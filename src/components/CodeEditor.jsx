import { Box, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import OutPut from "./OutPut";
import { socket } from "../socket";

export default function CodeEditor({ exDescription, exId, readOnly }) {
  const [value, setValue] = useState("");
  const editorRef = useRef();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    editor.setPosition({ lineNumber: 2, column: 1 });
  };

  useEffect(() => {
    socket.on("code change", ({ value }) => {
      setValue(value);
    });
  }, []);

  return (
    <Box
      sx={{
        padding: "16px",
      }}
    >
      <Stack direction="row" spacing={4}>
        <Box sx={{ width: "50%" }}>
          <Editor
            height={"80vh"}
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue={`/* ${exDescription} */\n`}
            onMount={onMount}
            value={value}
            onChange={(value) => {
              setValue(value);
              !readOnly && socket.emit("code change", { value, roomId: exId });
            }}
            options={{ readOnly: readOnly }}
          />
        </Box>
        <OutPut editorRef={editorRef} exId={exId} />
      </Stack>
    </Box>
  );
}
