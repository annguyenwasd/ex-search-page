import React from "react";
import Layout from "./layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./pages/search";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" component={Search} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
