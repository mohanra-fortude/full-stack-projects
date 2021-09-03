import { ProductType } from "../../types";

const ActionTypes = {
  ADD_TO_CART: "[Cart] Add to cart",
  REMOVE_ITEM: "[Cart] Remove item",
  INCREMENT_QTY: "[Cart] Increment qty",
  DECREMENT_QTY: "[Cart] Decrement qty",
};

const addToCart = (product: ProductType) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    product,
  };
};
const removeItem = (id: number) => {
  return {
    type: ActionTypes.REMOVE_ITEM,
    id,
  };
};
const incrementQty = (id: number) => {
  return {
    type: ActionTypes.INCREMENT_QTY,
    id,
  };
};

const decrementQty = (id: number) => {
  return {
    type: ActionTypes.DECREMENT_QTY,
    id,
  };
};
export default {
  ActionTypes,
  addToCart,
  removeItem,
  incrementQty,
  decrementQty,
};
