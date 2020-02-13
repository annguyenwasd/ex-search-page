import React from "react";
import Layout from "./layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./pages/search";
import NotFound from "./pages/not-found";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" component={Search} exact />
          <Route path="/host" component={NotFound} />
          <Route component={NotFound} />
          <Route path="/help" component={NotFound} />
          <Route path="/sign-up" component={NotFound} />
          <Route path="/login" component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
