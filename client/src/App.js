import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import GameTable from "./pages/GameTable";
import SumUp from "./pages/SumUp";
import Chat from "./pages/Chat";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/play" component={GameTable} />
          <Route exact path="/sum" component={SumUp} />
          <Route exact path="/chat" component={Chat} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
