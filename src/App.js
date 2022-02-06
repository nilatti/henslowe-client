import React from "react";
import { GlobalStyles } from "./Components/GlobalStyles.js";
import "./App.css";
import "react-datetime/css/react-datetime.css";
import MainApp from "./Components/MainApp.js";
import { Container } from "./Components/Styled.js";
import { MeProvider } from "./lib/meState.js";

export default function App() {
  return (
    <MeProvider>
      <GlobalStyles />
      <Container>
        <MainApp />
      </Container>
    </MeProvider>
  );
}
