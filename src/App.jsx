import { Route, Switch, Redirect } from "react-router-dom";

import { PageNotFound } from "./components/Commons";
import Product from "./components/Product";
import ProductList from "./components/ProductList";

const App = () => (
  <Switch>
    {/* The Catalog */}
    <Route exact component={ProductList} path="/products" />
    {/* The Dynamic Route for a Specific Item */}
    <Route exact component={Product} path="/products/:slug" />
    {/* If they go to the root "/", automatically send them to the catalog */}
    <Redirect exact from="/" to="/products" />
    {/* The Fallback */}
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
