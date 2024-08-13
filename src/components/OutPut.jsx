import {
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import { checkOutputById, executeCode } from "../api";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Confetti from "react-confetti";

export default function OutPut({ editorRef, exId }) {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const runCode = async () => {
    setIsCorrect(false);
    setOutput(["loading..."]);
    const sourceCode = editorRef.current.getValue();
    console.log(sourceCode);
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(sourceCode);
      result.stderr ? setIsError(true) : setIsError(false);
      if (await checkOutputById(exId, result.output.trim())) {
        setIsCorrect(true);
      }
      setOutput(result.output.split("\n"));
    } catch (error) {
      console.log(error);
      setToast(true);
      setOutput(["An error occurred. Unable to run the code"]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setToast(false);
  };

  return (
    <Box sx={{ width: "30%" }}>
      <Typography mb={2}> Output</Typography>
      <Button
        variant="contained"
        sx={{ marginBottom: "16px" }}
        onClick={() => runCode()}
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={24} /> : null}
      >
        Run Code
      </Button>
      <Box
        height={"63vh"}
        p={2}
        border="1px solid"
        borderRadius={4}
        color={isError ? "red" : ""}
        borderColor={isError ? "red" : "grey"}
      >
        {output
          ? output.map((line, i) => <Typography key={i}>{line}</Typography>)
          : 'Click "Run Code" to see the output here'}
      </Box>

      <Snackbar
        open={toast}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          An error occurred. Unable to run the code
        </Alert>
      </Snackbar>

      {isCorrect && <Confetti />}
    </Box>
  );
}
