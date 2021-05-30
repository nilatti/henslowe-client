import React from "react";

import Footer from "./Footer";
import Main from "./Main";
import Navigation from "./Navigation";
import LoginHooks from "./LoginHooks";
import LogoutHooks from "./LogoutHooks";

export default function MainApp() {
  return (
    <>
      <LoginHooks />
      <LogoutHooks />
      <Navigation />
      <Main />
      <Footer />
    </>
  );
}
