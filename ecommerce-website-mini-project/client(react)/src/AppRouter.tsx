import React from "react";
import { Route, Switch } from "react-router-dom";
import Container from "./components/Container";
import ErrorPage from "./components/ErrorPage";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./containers/Login";
import Register from "./containers/Register";
import ProductDetail from "./containers/ProductDetail";
import ProductList from "./containers/ProductList";
import CartPage from "./containers/CartPage";
import SearchPage from "./containers/SearchPage";
import UserAddressCollection from "./components/user/UserAddressCollection";
import Checkout from "./containers/Checkout";
import SortProductPage from "./containers/SortProductPage";
import Banner from "./Banner";

const LazyProfile = React.lazy(() => import("./containers/Profile"));

const AppRouter: React.FC = (props) => {
  return (
    <main>
      <Container fluid>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={"/"} component={Banner} exact />
            <Route path={"/products"} component={ProductList} />
            <Route path={"/login"} component={Login} />
            <PrivateRoute path={"/profile"} component={LazyProfile} />
            <Route path={"/productdetail/:id"} component={ProductDetail} />
            <Route path={"/register"} component={Register} />
            <Route path={"/cart"} component={CartPage} />
            <Route path={"/search_product"} component={SearchPage} />
            <Route path={"/sort_product"} component={SortProductPage} />
            <Route path={"/checkout"} component={Checkout} />
            <Route
              path={"/user/collect-address"}
              component={UserAddressCollection}
            />

            {/* 404 Route */}
            <Route component={ErrorPage} />
          </Switch>
        </React.Suspense>
      </Container>
    </main>
  );
};
export default AppRouter;
