import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import CandidateService from "../../../services/CandidateService";
import "./BasicInfo.css";

function BasicInfo() {
  const [candInfo, setCandInfo] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phoneNo: "",
    aadharCard: "",
    dob: "",
    panCard: "",
    parentFirstName: "",
    parentLastName: "",
    address: "",
    address2: "",
    address3: "",
    city: "",
    state: "",
    pinCode: "",
    emergencyContactName: "",
    emergencyEmail: "",
    emergencyPhone: "",
  });
  var candUserId = window.location.pathname.split("/")[3];
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data } = await CandidateService.getCandidateInfo(candUserId);
    setCandInfo({
      firstName: data.firstname,
      lastName: data.lastName,
      gender: data.gender,
      email: data.email,
      phoneNo: data.mobile,
      aadharCard: data.aadhaarCard,
      dob: data.dateBirth,
      panCard: data.panCard,
      parentFirstName: data.parentFirstName,
      parentLastName: data.parentLastName,
      address: data.address,
      address2: data.address2,
      address3: data.address3,
      city: data.city,
      state: data.state,
      pinCode: data.zip,
      emergencyContactName: data.emergencyContactName,
      emergencyEmail: data.emergencyEmail,
      emergencyPhone: data.emergencyPhone,
    });
  }

  return (
    <div>
      <h3 className="basic-info__heading">Basic Information</h3>
      <div className="basic-info__container">
        <div className="basic-info__box">
          <div className="data">
            <h4>First Name:</h4>
            <h5>{candInfo.firstName}</h5>
          </div>

          <div className="data">
            <h4>Gender:</h4>
            <h5>{candInfo.gender}</h5>
          </div>

          <div className="data">
            <h4>Mobile number:</h4>
            <h5>{candInfo.phoneNo}</h5>
          </div>

          <div className="data">
            <h4>Aadhar Card:</h4>
            <h5>{candInfo.aadharCard}</h5>
          </div>
        </div>
        <div className="basic-info__box">
          <div className="data">
            <h4>Last Name:</h4>
            <h5>{candInfo.lastName}</h5>
          </div>

          <div className="data">
            <h4>Date of Birth:</h4>
            <h5>{moment(candInfo.dob).format("DD/MM/YYYY")}</h5>
          </div>

          <div className="data">
            <h4>Email:</h4>
            <h5>{candInfo.email}</h5>
          </div>

          <div className="data">
            <h4>Pan Card:</h4>
            <h5>{candInfo.panCard}</h5>
          </div>

        </div>
      </div>
      <br />

      <h3 className="basic-info__heading">Parents Information</h3>
      <div className="basic-info__container">
        <div className="basic-info__box">
          <div className="data">
            <h4>First Name:</h4>
            <h5>{candInfo.parentFirstName}</h5>
          </div>
        </div>

        <div className="basic-info__box">
            <div className="data">
              <h4>Last Name:</h4>
              <h5>{candInfo.parentLastName}</h5>
            </div>
        </div>
      </div>
      <br />

      <h3 className="basic-info__heading">Present Address</h3>
      <div className="basic-info__container">
        <div className="basic-info__box">
          <div className="data">
            <h4>Line1:</h4>
            <h5>{candInfo.address}</h5>
          </div>

          <div className="data">
            <h4>Line3:</h4>
            <h5>{candInfo.address3}</h5>
          </div>
    
          <div className="data">
            <h4>City:</h4>
            <h5>{candInfo.city}</h5>
          </div>
        </div>

        <div className="basic-info__box">
          <div className="data">
              <h4>Line2:</h4>
              <h5>{candInfo.address2}</h5>
          </div>

          <div className="data">
            <h4>State:</h4>
            <h5>{candInfo.state}</h5>
          </div>

          <div className="data">
            <h4>Pin Code:</h4>
            <h5>{candInfo.pinCode}</h5>
          </div>
        </div>
      </div>
      <br />

      <h3 className="basic-info__heading">Emergency Contact Details</h3>
      <div className="basic-info__container">
        <div className="basic-info__box">
          <div className="data">
            <h4>Name:</h4>
            <h5>{candInfo.emergencyContactName}</h5>
          </div>

          <div className="data">
            <h4>Email:</h4>
            <h5>{candInfo.emergencyEmail}</h5>
          </div>
        
        </div>
        <div className="basic-info__box">
          <div className="data">
            <h4>Phone No.</h4>
            <h5>{candInfo.emergencyPhone}</h5>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
