
import React from "react";
import {Container} from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar";

import { BrowserRouter,Routes ,Route } from "react-router-dom";

import Home from "./components/home/home";
import Auth from "./components/Auth/Auth";
const App = () => {

  return (
    <BrowserRouter>
      <Container maxwidth = "lg">
        <Navbar/>
        <Routes >
          <Route path="/" exact element={<Home/>}/>
          <Route path="/auth" exact element={<Auth/>}/>
        </Routes>
      </Container>
  </BrowserRouter>
  )
}//notes 12 on xs means full width on mobile devices

export default App