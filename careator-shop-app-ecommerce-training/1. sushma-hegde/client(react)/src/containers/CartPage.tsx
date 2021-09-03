import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CartActions from "../store/actions/CartActions";
import { CartType, StoreType, CurrencyRateType } from "../types";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import TotalAmountActions from "../store/actions/TotalAmountActions";
// import ValidateAndClear1 from "../components/logics/ValidateAndClear1";
import "../styles/CartStyle.css";

type Props = {
  cartItems: CartType[];
  currency: CurrencyRateType;
  cartLength: number;
  total: number;
  incrementQty: (id: number) => void;
  decrementQty: (id: number) => void;
  removeItemFromCart: (id: number) => void;
  updateTotal: (total: number) => void;
};

type State = {};

const mapStoreToProps = (store: StoreType) => {
  return {
    cartItems: store.cart,
    currency: store.currency,
    cartLength: store.cart.length,
    total: store.total,
  };
};

class CartPage extends React.Component<Props, State> {
  getCorrectCurrencyValue(priceAmount: number) {
    //convert to correct currency value by doing calculation
    const value = priceAmount * this.props.currency.value;
    return value.toString();
  }

  incrementTotal(salePrice: string, id: number) {
    this.props.incrementQty(id); //quantity is now incremented in store
    let no: number = parseInt(salePrice);
    let sum: number = no + this.props.total;
    console.log(this.props.total);
    this.props.updateTotal(sum);
    console.log(this.props.total);
  }

  decrementTotal(salePrice: string, id: number, quantity: number) {
    if (quantity === 1) {
      this.removeCartItem(id, quantity, salePrice);
      //if quantity is 0 then remove, don't allow user to enter -ve quantity
    } else {
      this.props.decrementQty(id); //now qty is updated (decremented) in store
      let no: number = parseInt(salePrice);
      let sum: number = this.props.total - no; //everytime a user presses "+" or "-" icon decrementtotal func is getting executed..so there is no need of getting quantity, just do the sum as and when user clicks
      console.log(this.props.total);
      this.props.updateTotal(sum);
      console.log(this.props.total);
    }
  }

  removeCartItem(id: number, quantity: number, salePrice: string) {
    alert("Are you sure you want to remove this item?");
    console.log("total amount before deleting", this.props.total);
    let no: number = parseInt(salePrice);
    let newamount = this.props.total - no * quantity; //when you remove an item from cart, the price should be reduced according to the quanity
    this.props.updateTotal(newamount);
    console.log("quantity, saleprice", this.props.total, quantity, salePrice);
    this.props.removeItemFromCart(id);
  }

  render() {
    console.log(this.props.cartItems);
    console.log(this.props.total); //very very important
    return (
      <div className="cart">
        <div>
          <h5>My Cart ({this.props.cartLength})</h5>
          {this.props.cartItems.map((item: any) => (
            <CartItem
              id={item.productId}
              image={item.productImage}
              name={item.productName}
              price={this.getCorrectCurrencyValue(item.productPrice)}
              salePrice={this.getCorrectCurrencyValue(item.productSalePrice)}
              currencyCode={this.props.currency.currencyCode}
              quantity={item.productQty}
              incrementTotal={
                () => this.incrementTotal(item.productSalePrice, item.productId)
                //execute the function of parent from child by passing props to child..child can only use it and give it back to parent, child can't change the prop value
                //I'm passing sale price because I want to add it with total(from store)
                //product Id because I want to increment quantity, store wants id so that it can map and increment quantity of only this prod
              }
              decrementTotal={() =>
                this.decrementTotal(
                  item.productSalePrice,
                  item.productId,
                  item.productQty
                )
              }
              removeCartItem={() =>
                this.removeCartItem(
                  item.productId,
                  item.productQty,
                  item.productSalePrice
                )
              }
            />
          ))}
        </div>
        <CartSummary
          numOfItems={this.props.cartLength}
          total={this.props.total}
          currencyCode={this.props.currency.currencyCode}
          currencyValue={this.props.currency.value}
        />
        <div className="footer">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            //onClick={() => ValidateAndClear1()}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    incrementQty: (id: number) => dispatch(CartActions.incrementQty(id)),
    decrementQty: (id: number) => dispatch(CartActions.decrementQty(id)),
    removeItemFromCart: (id: number) => dispatch(CartActions.removeItem(id)),
    updateTotal: (total: number) =>
      dispatch(TotalAmountActions.updateTotal(total)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CartPage);
