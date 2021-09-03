import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { flexbox } from "@material-ui/system";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import formatter from "../utils/formatter";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 3,
    width: "30vw",
    height: "55vh",
    spacing: 8,
  },
  title: {
    fontSize: 20,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  items: {
    display: "flex",
    justifyContent: "space-between",
  },
  pos: {
    marginBottom: 12,
  },
}));

type Props = {
  numOfItems: number;
  total: number;
  currencyCode: string;
  currencyValue: number;
};

function getCorrectTotalValue(total: number, value: number) {
  let num: number = total * value;
  return num.toString();
}

const CartSummary: React.FC<Props> = ({
  numOfItems,
  total,
  currencyCode,
  currencyValue,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          PRICE DETAILS
        </Typography>
        <hr />
        <div className={classes.details}>
          <div className={classes.items}>
            <Typography variant="h6" component="h6" color="textSecondary">
              Price({numOfItems + " items"})
            </Typography>
            <Typography variant="h6" component="h6" color="textSecondary">
              {formatter.price(
                getCorrectTotalValue(total, currencyValue),
                currencyCode
              )}
            </Typography>
          </div>
          <div className={classes.items}>
            <Typography variant="h6" component="h6" color="textSecondary">
              Discount
            </Typography>
            <Typography variant="h6" component="h6" color="textSecondary">
              -{formatter.price("0", currencyCode)}
            </Typography>
          </div>
          <div className={classes.items}>
            <Typography variant="h6" component="h6" color="textSecondary">
              Buy more & save more
            </Typography>
            <Typography variant="h6" component="h6" color="textSecondary">
              -{formatter.price("0", currencyCode)}
            </Typography>
          </div>
          <div className={classes.items}>
            <Typography variant="h6" component="h6" color="textSecondary">
              Delivery Charges
            </Typography>
            <Typography variant="h6" component="h6" color="textSecondary">
              -{formatter.price("0", currencyCode)}
            </Typography>
          </div>
        </div>
        <hr />
        <div className={classes.items}>
          <Typography variant="h5" component="h6" color="textPrimary">
            Total Amount
          </Typography>
          <Typography variant="h6" component="h6" color="textSecondary">
            {formatter.price(
              getCorrectTotalValue(total, currencyValue),
              currencyCode
            )}
          </Typography>
        </div>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default CartSummary;
