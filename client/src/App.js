import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";
const App = () => {
  return (
    <Router>
      <Fragment className="App">
        <Navbar />
        <switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
        </switch>
      </Fragment>
    </Router>
  );
}

export default App;
