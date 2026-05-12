import { Route, Switch, Redirect } from "react-router-dom";
import routes from "routes"; // <-- Import the dictionary

import { PageNotFound } from "./components/Commons";
import Product from "./components/Product";
import ProductList from "./components/ProductList";

const App = () => (
  <Switch>
    {/* Notice how we use routes.something instead of "/something" */}
    <Route exact component={ProductList} path={routes.products.index} />
    <Route exact component={Product} path={routes.products.show} />
    <Redirect exact from={routes.root} to={routes.products.index} />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
