import React from "react";
import Column from "../components/Column";
import Product from "../components/Product";
import Row from "../components/Row";
import ProductService from "../services/ProductService";
import { ProductType, StoreType, CurrencyRateType } from "../types";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CartActions from "../store/actions/CartActions";
import TotalAmountActions from "../store/actions/TotalAmountActions";
import Paginate from "../components/Paginate";
import LoadingWrapper from "../components/LoadingWrapper";
import LoadingActions from "../store/actions/LoadingActions";
import OperationsOnProduct from "../components/OperationsOnProduct";

type Props = {
  selectedCurrency: CurrencyRateType;
  total: number;
  showLoader: () => void;
  hideLoader: () => void;
  addItem: (product: ProductType) => void;
  updateTotal: (total: number) => void;
} & RouteComponentProps;
type State = {
  plist: ProductType[];
  totalPages: number;
  pageNumber: number;
};
class ProductList extends React.Component<Props, State> {
  state: State = { plist: [], totalPages: 0, pageNumber: 1 };
  componentDidMount() {
    this.getData();
  }
  async getData() {
    try {
      this.props.showLoader();
      const { data } = await ProductService.getProducts(this.state.pageNumber);
      this.setState({
        plist: data.data,
        totalPages: data.totalPages,
        pageNumber: data.currentPage,
      });
      this.props.hideLoader();
    } catch (e) {
      console.log("error", e);
      this.props.hideLoader();
    }
  }

  clickAction(val: ProductType) {
    console.log("from store before updation--", this.props.total);
    console.log("saleprice--", parseInt(val.productSalePrice));
    let no: number = parseInt(val.productSalePrice);
    let sum: number = no + this.props.total;
    // console.log("sum", sum, typeof sum);
    console.log(" send to store--", sum);
    this.props.updateTotal(sum);
    console.log("value got from store --", this.props.total);
    this.addToCart(val);
  }

  addToCart(product: ProductType) {
    this.props.addItem(product);
    console.log("value got after addToCart-- ", this.props.total);
    const b = this.props.total;
    console.log("b", b);
    this.props.history.push({
      pathname: "/cart",
    }); // redirect to cart page*/
  }

  updateData = (page: number) =>
    this.setState({ pageNumber: page }, () => this.getData());

  render() {
    return (
      <LoadingWrapper>
        <Row>
          <OperationsOnProduct />
        </Row>
        <Row>
          {this.state.plist.map((val) => (
            <Column size={3} classes={"my-3"}>
              <Product
                clickAction={() => this.clickAction(val)}
                pdata={val}
                key={val.productId}
                currency={this.props.selectedCurrency}
              />
            </Column>
          ))}
          <Column size={12} classes={"text-center"}>
            <Paginate
              totalPages={this.state.totalPages}
              currentPage={this.state.pageNumber}
              changePage={this.updateData}
            />
          </Column>
        </Row>
      </LoadingWrapper>
    );
  }
}
// connect(how to connect)(what to connect/component)
// store data can be accessed thru the props of the component
const mapStoreToProps = (store: StoreType) => {
  return {
    selectedCurrency: store.currency, // undefined => INR => USD
    total: store.total,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    hideLoader: () => dispatch(LoadingActions.hideLoader()),
    showLoader: () => dispatch(LoadingActions.showLoader()),
    addItem: (p: ProductType) => dispatch(CartActions.addToCart(p)),
    updateTotal: (total: number) =>
      dispatch(TotalAmountActions.updateTotal(total)),
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(ProductList);
