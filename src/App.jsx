import React from "react";
import News from "./components/News.jsx";
import Newest from "./components/Newest.jsx";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <div>
          <div className="nav">
            <ul>
              <li>
                <Link to="/">News</Link>
              </li>
              <li>
                <Link to="/news">Newest</Link>
              </li>
            </ul>
          </div>
          <Route exact path="/" component={News} />
          <Route path="/news" component={Newest} />
        </div>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
