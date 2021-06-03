import React from "react";

import Footer from "./Footer";
import Main from "./Main";
import Navigation from "./Navigation";
import LoginHooks from "./LoginHooks";
import LogoutHooks from "./LogoutHooks";

import { useMeState } from "../lib/meState";

export default function MainApp() {
  const { me } = useMeState();
  return (
    <>
      {me ? <LogoutHooks /> : <LoginHooks />}

      <Navigation />
      <Main />
      <Footer />
    </>
  );
}
