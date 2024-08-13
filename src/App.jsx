import "./App.css";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Lobby from "./pages/Lobby";
import CodeBlock from "./pages/CodeBlock";
import { getAllExercises } from "./api";

function App() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      setExercises(await getAllExercises());
    };

    fetchExercises();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lobby exercises={exercises} />} />
        {exercises.map(({ id, description }) => (
          <Route
            key={id}
            path={`/CodeBlock${id}`}
            element={<CodeBlock id={id} description={description} />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
