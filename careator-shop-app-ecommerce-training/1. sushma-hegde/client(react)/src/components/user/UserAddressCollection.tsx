import React, { useState } from "react";
import AddressService from "../../services/AddressService"; //You are inside user folder
import { useHistory } from "react-router-dom";
import axios from "axios";
import StorageService from "../../services/StorageService";

const UserAddressCollection = () => {
  let history = useHistory();
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState(1);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    //console.log(StorageService.getData("token"));
    //console.log(line1, line2, city, state, pincode);
    /*const { data } = await AddressService.postAddress(
      line1,
      line2,    //Property data does not exist on type 'void' have defined the property of data but not taking
      city,
      state,
      pincode
    );*/
    return StorageService.getData("token").then((token) =>
      axios
        .post(
          "http://localhost:5000/address",
          { line1, line2, city, state, pincode },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log("respose id", res.data.id);
          console.log("success");
          let no: number = res.data.id;
          history.push({ pathname: "/profile", state: { id: no } });
        })
    );
  };

  return (
    <div className="container">
      <div className="w-50 mx-auto shadow p-3">
        <h4 className="text-center mb-4 mt-3">Address</h4>
        <form>
          <div className="form-group m-3">
            <label>Line1</label>
            <input
              type="text"
              className="form-control"
              placeholder="Banashankari"
              name="line1"
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
            />
          </div>
          <div className="form-group m-3">
            <label>Line2</label>
            <input
              type="text"
              className="form-control"
              placeholder="Hoskerehalli"
              name="line2"
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
            />
          </div>
          <div className="form-group m-3">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              placeholder="Bangalore"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="form-group m-3">
            <label>State</label>
            <input
              type="text"
              className="form-control"
              placeholder="Karnataka"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="form-group m-3">
            <label>Pincode</label>
            <input
              type="number" //type="number" is only for user, e.target.value is always string. typeof e.target.value
              className="form-control"
              placeholder="560056"
              name="pincode"
              value={pincode}
              onChange={(e) => {            
                let a: number = parseInt(e.target.value); //you can't assign e.target.value to some other datatype other than string 
                //setPinCode(e.target.valueAsNumber)
                setPincode(a);
                console.log(pincode, typeof pincode);
              }}
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-secondary btn-lg m-4"
              onClick={(e) => onSubmit(e)}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAddressCollection;
