import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CurrencyActions from "../store/actions/CurrencyActions";
import CurrencyExachangeService from "../services/CurrencyExchangeService";
import {
  ExchangeCurrencyType,
  CurrencyRateType,
  parentArrayType, //no need to combine objects
} from "../types";
import { createFunctionDeclaration } from "typescript";

type CurrencyProps = {
  currencyChange: (code: CurrencyRateType) => void;
  theme?: "light" | "dark";
};

//can give any name currencyState but use same name in defining default value
type State = {
  curCode: Map<string, number>;
  //curCode: object[]; //don't declare it as object, declare it as object array you will get this error
  //Error: Objects are not valid as a React child (found: object with keys {curCode}). If you meant to render a collection of children, use an array instead.
  currencyMap: Map<string, number>;
  currencyValue: number;
  currencyName: string;
  currencyNumber: number;
  //dispatch method will take care, it will make change in the store, takes same value which is passed as parameter to predefined func currencyChange
  //but if you want to use some data from api or defined in this file, you have to use setState, else you can't change the value
};

class CurrencyMyMistakes extends React.Component<CurrencyProps> {
  // constructor(props: any) {
  //   super(props);
  //   this.state = {
  //     currencyRateObject: {
  //       base: "",
  //       date: new Date(),
  //       rates: {},
  //       success: "",
  //       timestamp: "",
  //       __proto_: {},
  //     },
  //     currencyRate: new Map(),
  //   };
  // }
  // state: State = {
  //   parentArray: [
  //     currencyRateObject: {
  //       base: "",
  //       date: new Date(),
  //       rates: new Map<string, number>(),
  //       success: "",
  //       timestamp: "",
  //       __proto_: {},
  //     },
  //     currencyRate: new Map(),
  //   ]

  // currencyRateObject: {
  //   base: "",
  //   date: new Date(),
  //   rates: new Map<string, number>(),
  //   success: "",
  //   timestamp: "",
  //   __proto_: {},
  // },
  // currencyRate: new Map(),
  //};

  // state: State = {
  //   curreCode: {
  //     currencyCode: "INR",//Error: Objects are not valid as a React child (found: object with keys {curCode}). If you meant to render a collection of children, use an array instead.
  //     value: 1,
  //   },
  // };

  state: State = {
    curCode: new Map<string, number>(),
    currencyMap: new Map<string, number>(),
    //curCode: [],
    currencyValue: 1,
    currencyName: "",
    currencyNumber: 1,
  };
  async componentDidMount() {
    try {
      const { data } = await CurrencyExachangeService.getExchangeRate(); //should be data only the response is only data object
      const curCode = data.rates;
      console.log(curCode);
      console.log(data.rates);
      const convertedMap = new Map(Object.entries(curCode));
      this.setState({ currencyMap: convertedMap });
      console.log("converted map", this.state.currencyMap);
      // console.log("converted map", covertedMap);

      // covertedMap.forEach((value: number, key: string) => {
      //   console.log(key, value);
      // });
      // console.log("SZL", covertedMap.get("SZL"));
      // let name = covertedMap.get("SZL");
      // console.log("naaaaaaaaame", name);
      // let name1 = "SZL";
      // console.log(covertedMap.get(name1));
      // console.log("code and value", curCode);
      // this.setState((state) => {
      //   return { currencyMap: covertedMap };
      // });
      // this.setState({ currencyValue: 10 });
      // this.setState((state) => {
      //   return {currencyMap: c}
      // });
    } catch (e) {
      console.log("error", e);
    }
  }
  render() {
    const codes = ["INR", "USD", "CAD", "GBP", "EUR"];
    const bgcolor = this.props.theme === "dark" ? "text-light" : "text-dark";
    return (
      <div>
        <select
          onChange={(e) => {
            console.log("inside the onchange func", this.state.currencyMap); //if you want to add
            console.log("currencyValue", this.state.currencyValue); //it is taking value from state
            console.log("inside slz", this.state.currencyMap.get("SZL"));
            const currencyName = e.target.value;
            console.log("currecyName", currencyName);
            const currencyNumber = this.state.currencyMap.get(currencyName);
            console.log(currencyNumber);
            // console.log(currencyNumber);

            this.setState({ currencyValue: 9 });
            this.props.currencyChange({
              currencyCode: e.target.value,
              value: this.state.currencyNumber, //this.state.curCode, //data.rates.e.target.value  take e.target.value in new var-- curCode.val
            });
          }}
          className={`form-control-sm ${bgcolor} bg-${this.props.theme}`}
        >
          {codes.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <h1>{this.state.curCode}</h1> {/* can't use curCode without setState */}
      </div>
    );
  }
}
// connect(what data to fetch from the store, what data to update inside the store)(component)
//defined all data types correctly, see where it is defined string. Then change it to user defined datatype
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    currencyChange: (code: CurrencyRateType) =>
      dispatch(CurrencyActions.updateCurrency(code)),
  };
};
export default connect(null, mapDispatchToProps)(CurrencyMyMistakes);
