import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Layout from "./hoc/Layout/Layout";
import WeatherApp from "./containers/WeatherApp/WeatherApp";
import SiteInfo from "./components/SiteInfo";
import SearchHistory from "./containers/SearchHistory";

function App() {
  const routes = (
    <Switch>
      <Route path="/searchhistory" component={SearchHistory} />
      <Route path="/siteinfo" component={SiteInfo} />
      <Route path="/" exact component={WeatherApp} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="App">
      <Layout>{routes}</Layout>
    </div>
  );
}

export default App;
