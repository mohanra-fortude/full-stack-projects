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
import Paginate from "../components/Paginate";
import LoadingWrapper from "../components/LoadingWrapper";
import TotalAmountActions from "../store/actions/TotalAmountActions";
import LoadingActions from "../store/actions/LoadingActions";

type Props = {
  total: number;
  selectedCurrency: CurrencyRateType;
  showLoader: () => void;
  hideLoader: () => void;
  addItem: (product: ProductType) => void;
  updateTotal: (total: number) => void;
} & RouteComponentProps;

type State = {
  plist: ProductType[];
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};

class SearchPage extends React.Component<Props, State> {
  state: State = {
    plist: [],
    totalPages: 0,
    pageNumber: 1,
    pageSize: 20,
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      this.props.showLoader();
      const { data } = await ProductService.searchByProductName(
        history.state.state.prodname,
        this.state.pageNumber,
        this.state.pageSize
      );
      console.log("prod data", data);
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
    let no: number = parseInt(val.productSalePrice);
    let sum: number = no + this.props.total;
    this.props.updateTotal(sum);
    this.addToCart(val);
  }

  addToCart(product: ProductType) {
    this.props.addItem(product);
    this.props.history.push({
      pathname: "/cart",
    });
  }

  updateData = (page: number) =>
    this.setState({ pageNumber: page }, () => this.getData());

  render() {
    console.log(location.pathname);
    console.log(history.state.state.prodname); //most important, when a parameter is passed by using history, you can access it using this method. No need of any HOC withRouter
    return (
      <LoadingWrapper>
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

const mapStoreToProps = (store: StoreType) => {
  return {
    selectedCurrency: store.currency,
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

export default connect(mapStoreToProps, mapDispatchToProps)(SearchPage);
