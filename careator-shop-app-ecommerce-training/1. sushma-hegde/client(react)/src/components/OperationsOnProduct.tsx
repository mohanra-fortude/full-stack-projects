import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useStateWithCallbackLazy } from "use-state-with-callback";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#fff",
    color: "#212121",
    "&:hover": {
      backgroundColor: "#d1c4e9",
      color: "#212121",
    },
  },
}));

function OperationsOnProduct() {
  const classes = useStyles();
  const [field, setField] = useStateWithCallbackLazy("");
  const [order, setOrder] = useStateWithCallbackLazy("");
  let history = useHistory();

  function clickfun(field: string, order: string) {
    history.push({
      pathname: "/sort_product",
      search: `?field=${field}&order=${order}`,
      state: { field: field, order: order },
    });
  }

  return (
    <div className={classes.root}>
      <span>Sort By</span>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={() => {
          //console.log("clicked");
          //by default setState will not take callback function in function components striclty takes 2 args
          //install use-state-callback or use-state-with-callback
          setField("price", (currentField: string) => {
            // console.log("field", currentField); //have to write currentField only to check
            setOrder("ascending", (currentOrder: string) => {
              //console.log("order", currentOrder);
              clickfun(currentField, currentOrder);
            });
          });
        }}
      >
        Price -- Low to High
      </Button>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={() => {
          setField("price", (currentField: string) => {
            setOrder("descending", (currentOrder: string) => {
              clickfun(currentField, currentOrder);
            });
          });
        }}
      >
        Price -- High to Low
      </Button>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={() => {
          setField("name", (currentField: string) => {
            setOrder("ascending", (currentOrder: string) => {
              clickfun(currentField, currentOrder);
            });
          });
        }}
      >
        Name
      </Button>
    </div>
  );
}

export default OperationsOnProduct;
