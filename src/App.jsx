import { useState } from "react"; // 1. Import useState

import { Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

import { PageNotFound } from "./components/Commons";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
import CartItemsContext from "./contexts/CartItemsContext"; // 2. Import your Context

const App = () => {
  // 3. Move the Master State here!
  const [cartItems, setCartItems] = useState([]);

  return (
    // 4. Wrap the app and broadcast the state
    <CartItemsContext.Provider value={[cartItems, setCartItems]}>
      <Switch>
        <Route exact component={ProductList} path={routes.products.index} />
        <Route exact component={Product} path={routes.products.show} />
        <Redirect exact from={routes.root} to={routes.products.index} />
        <Route component={PageNotFound} path="*" />
      </Switch>
    </CartItemsContext.Provider>
  );
};

export default App;
