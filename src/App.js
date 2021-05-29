import React from "react";
import { GlobalStyles } from "./Components/GlobalStyles";
import "./App.css";
import "react-datetime/css/react-datetime.css";
import MainApp from "./Components/MainApp";
import { Container } from "./Components/Styled";
import AuthService from "./services/auth.service";
import { MeProvider } from "./lib/meState";

export default function App() {
  AuthService.checkTokenExpiration;
  return (
    <MeProvider>
      <GlobalStyles />
      <Container>
        <MainApp />
      </Container>
    </MeProvider>
  );
}
