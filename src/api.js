import axios from "axios";

const EMKC = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (sourceCode) => {
  const response = await EMKC.post("/execute", {
    language: "js",
    version: "18.15.0",
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};

const SERVER = axios.create({
  baseURL: "https://task-online-coding-server-production.up.railway.app/",
});

export const getAllExercises = async () => {
  return (await SERVER.get("/exercises")).data;
};

export const checkOutputById = async (id, output) => {
  return (await SERVER.post("/exercises/output", { id, output })).data.pass;
};
