import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import ProductService from "../services/ProductService";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ProductPrice from "../components/ProductPrice";
import { CurrencyRateType, StoreType } from "../types";
import { connect } from "react-redux";

const styles = {
  root: {
    maxWidth: 900,
    marginLeft: "25vh",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  button_fav: {
    backgroundColor: "#f5f5f5",
    color: "#212121",
    "&:hover": {
      backgroundColor: "#d7ccc8",
      color: "#b71c1c",
    },
  },
  button_share: {
    backgroundColor: "#f5f5f5",
    color: "#212121",
    "&:hover": {
      backgroundColor: "#d7ccc8",
      color: "#0d47a1",
    },
  },
};

type Props = {
  selectedCurrency: CurrencyRateType;
};

type State = {
  productId: number; //don't use prodInfo: ProductType..later you can't access individuals after setState
  productName: string;
  productPrice: string;
  productImage: string;
  productSalePrice: string;
  productStock: number;
};

class ProductDetail extends React.Component<any, any> {
  state: State = {
    productId: 1,
    productName: "",
    productPrice: "1",
    productImage: "",
    productSalePrice: "",
    productStock: 1,
  };
  async componentDidMount() {
    try {
      const params: any = this.props.match.params;
      const { data } = await ProductService.getProductById(params.id);
      this.setState({
        productId: data.productId,
        productName: data.productName,
        productPrice: data.productPrice,
        productImage: data.productImage,
        productSalePrice: data.productSalePrice,
        productStock: data.productStock,
      });
      //console.log(this.state);
    } catch (e) {
      console.log("error", e);
    }
  }

  extractFirstLetter(name: string) {
    let na: string = name.substring(0, 1);
    return na.toUpperCase();
  }

  toUpper(name: string) {
    return name.toUpperCase();
  }

  getCorrectCurrencyValue(priceAmount: number) {
    let value: number = priceAmount * this.props.selectedCurrency.value;
    return value.toString();
  }
  convertStringToInt(myString: string) {
    return parseInt(myString);
  }

  render() {
    //console.log(this.props);
    //console.log(this.props.classes);
    //console.log(this.props.location);
    //console.log(history);
    //console.log(this.props.classes);
    const { classes } = this.props;
    return (
      <ErrorBoundary>
        <Card className={classes.root}>
          <div className={classes.header}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {this.extractFirstLetter(this.state.productName)}
                </Avatar>
              }
              title={this.toUpper(this.state.productName)}
            />
          </div>
          <CardMedia
            className={classes.media}
            image={this.state.productImage}
            title="Paella dish"
          />
          <CardContent>
            <ProductPrice
              price={this.getCorrectCurrencyValue(
                this.convertStringToInt(this.state.productPrice)
              )}
              salePrice={this.getCorrectCurrencyValue(
                this.convertStringToInt(this.state.productSalePrice)
              )}
              code={this.props.selectedCurrency.currencyCode}
            />
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              className={classes.button_fav}
              aria-label="add to favorites"
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton className={classes.button_share} aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </ErrorBoundary>
    );
  }
}

const mapStoreToProps = (store: StoreType) => {
  return {
    selectedCurrency: store.currency,
  };
};

export default connect(mapStoreToProps)(withStyles(styles)(ProductDetail));
