import { PermDataSettingTwoTone } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { ProductType, CurrencyRateType } from "../types";
import formatter from "../utils/formatter";
import ImageWithFallback from "./ImageWithFallback";
import ProductPrice from "./ProductPrice";

type ProductProps = {
  pdata: ProductType;
  wishlist?: boolean;
  currency: CurrencyRateType;
  clickAction: (val: ProductType) => void;
};
class Product extends React.Component<ProductProps> {
  renderStock(stock: number) {
    if (stock <= 0) {
      return (
        <button disabled className="btn btn-sm w-100 btn-danger text-uppercase">
          <i className="far fa-frown"></i>Out of stock
        </button>
      );
    }
    return (
      <button
        onClick={() => this.props.clickAction(this.props.pdata)} //parent to child, child to parent, you can't change prop taken from parent can only use it to display
        className="btn btn-sm w-100 btn-primary text-uppercase"
      >
        <i className="fab fa-opencart"></i> Add to Cart
      </button>
    );
  }
  getCorrectCurrencyValue(priceAmount: number) {
    // console.log(priceAmount, this.props.currency.value);
    const value = priceAmount * this.props.currency.value;
    return value.toString();
  }
  convertStringToInt(myString: string) {
    return parseInt(myString);
  }
  render() {
    const { pdata, wishlist, currency } = this.props;

    return (
      <div className="p-4 shadow-sm text-center">
        <Link to={`/productdetail/${pdata.productId}`}>
          <ImageWithFallback source={pdata.productImage} />
        </Link>
        <h5 className={"mt-4"}>{formatter.titlecase(pdata.productName)}</h5>
        <ProductPrice
          price={this.getCorrectCurrencyValue(
            this.convertStringToInt(pdata.productPrice)
          )}
          salePrice={this.getCorrectCurrencyValue(
            this.convertStringToInt(pdata.productSalePrice)
          )}
          code={this.props.currency.currencyCode}
        />
        {/* <button>Add to {wishlist ? "Wishlist" : "Cart"}</button> */}
        {this.renderStock(pdata.productStock)}
      </div>
    );
  }
}
export default Product;
