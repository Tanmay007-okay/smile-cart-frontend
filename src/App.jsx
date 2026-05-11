import { Route, Switch, NavLink } from "react-router-dom";

// Import our three "buildings" (components)
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import Product from "./components/Product";

const App = () => (
  <>
    {/* 1. THE NAVIGATION BAR */}
    <div className="mx-4 mt-4 flex space-x-2">
      <NavLink exact activeClassName="underline font-bold" to="/">
        Home
      </NavLink>
      <NavLink exact activeClassName="underline font-bold" to="/product">
        Product
      </NavLink>
    </div>
    {/* 2. THE ROUTER DISPLAY CASE */}
    <Switch>
      {/* If the URL is exactly "/", show the Home component */}
      <Route exact component={Home} path="/" />
      {/* If the URL is exactly "/product", show the Product component */}
      <Route exact component={Product} path="/product" />
      {/* If the URL is ANYTHING ELSE (*), show the Error Page */}
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);

export default App;
