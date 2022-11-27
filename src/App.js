import React from "react";
import { Container } from "@mui/material";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import {Switch, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import {GoogleOAuthProvider} from '@react-oauth/google';
const App = () => {
  return (
    <>
    <GoogleOAuthProvider clientId="701061650597-l6sdamctn22vgdbc1lciv9re84in4t8l.apps.googleusercontent.com">
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
      </GoogleOAuthProvider>
    </>
  );
};
export default App;
