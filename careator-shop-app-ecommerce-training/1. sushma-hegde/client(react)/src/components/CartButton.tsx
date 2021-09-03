import React from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import CartPage from "../containers/CartPage";
import { StoreType } from "../types";

const CartButton = () => {
  const numOfCartItems = useSelector<StoreType>((store) => {
    //The selector will be run whenever the function component renders
    //useSelector() runs your selector whenever an action is dispatched.
    let len = store.cart.length;
    return len;
  });

  return (
    <Link to={"/cart"}>
      <span className="fa-stack has-badge" data-count={numOfCartItems}>
        <i className="fa fa-circle fa-stack-2x"></i>
        <i className="fa fa-shopping-cart fa-stack-1x fa-inverse"></i>
      </span>
    </Link>
  );
};
export default CartButton;
