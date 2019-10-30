import React from "react";
import "./App.css";
import { useState } from "react";
import { Route } from "react-router-dom";
import Results from "./components/ResultsPage";
import SearchBar from "./components/SearchBar";

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="App">
      <Navbar color="dark" light expand="md">
        <NavbarBrand style={{ color: "white" }} href="/">
          Versus
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar></Nav>
        </Collapse>
      </Navbar>
      {/* I am routing to get the correct component based on the url */}
      {/* This is the index */}
      <Route exact path="/" component={SearchBar} />
      {/* This the search results */}
      <Route exact path="/:query" component={Results} />
    </div>
  );
}

export default App;
