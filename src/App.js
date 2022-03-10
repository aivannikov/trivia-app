import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import HomePage from "./pages/HomePage";
import "./App.css";

const App = () => {
  return (
    <Container className="app">
      <HomePage />
    </Container>
  )
}

export default App;
