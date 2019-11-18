import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./Login";
import Nav from "./Nav";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const auth = { isLoggedIn, isAdmin, setIsLoggedIn, setIsAdmin };

  return (
    <BrowserRouter>
      <Nav {...auth} />
      <Header />
      <Route exact path="/" component={Main} />
    </BrowserRouter>
  );
}

export default App;
