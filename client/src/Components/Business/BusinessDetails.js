import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import BalanceSheet from "../BalanceSheet/BalanceSheet";

const BusinessDetails = () => {
  const [businessId, setBusinessId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessEstdYear, setBusinessEstdYear] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [balanceSheet, setBalanceSheet] = useState([]);
  const [approvedLoanAmount,setApprovedLoanAmount] = useState(0);
  const [progressWidth,setProgressWidth] = useState(0);

  const handleSetBusinessId = (e) => {
    setBusinessId(e.target.value);
  };
  const handleSetBusinessName = (e) => {
    setBusinessName(e.target.value);
  };
  const handleSetBusinessEstdYear = (e) => {
    setBusinessEstdYear(e.target.value);
  };
  const handleSetBusinessLoanAmount = (e) => {
    setLoanAmount(e.target.value);
  };

  const handleRequestBalanceSheet = async (e) => {
    e.preventDefault();
    if (
      businessId === "" ||
      businessName === "" ||
      businessEstdYear === "" ||
      loanAmount === ""
    ) {
      return;
    }
    const obj = {
      id: businessId,
      name: businessName,
      year: businessEstdYear,
      amount: loanAmount,
    };
    console.log(obj);
    try {
      const response = await axios.post(`http://localhost:5001/business`, obj);
      // console.log("Response from backend:", response.status);
      if (response.status === 200) {
        await fetchSheet(businessId);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  const fetchSheet = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/balance_sheet/${id}`
      );
      const apiData = response.data;
      // console.log("Balance Sheet: ", apiData.data);
      setBalanceSheet(apiData.data);
    } catch (error) {
      console.error("Error fetching balance sheet:", error);
    }
  };

  const handleSubmitApplication = async () => {
    const obj = {
      id: businessId,
      name: businessName,
      year: businessEstdYear,
      amount: loanAmount,
    };

    try {
      const response = await axios.post(`http://localhost:5001/summarise`, obj);
      const apiData = response.data;
      // console.log("Approved Loan Amount : ", apiData.data);
      const approvedAmount = apiData.data;
      setApprovedLoanAmount(approvedAmount);
      const width = (approvedAmount * 100)/loanAmount;
      setProgressWidth(width);

    } catch (error) {
      console.error("Error fetching balance sheet:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center">
        <div className="container card m-3">
          <form>
            <div className="form-row align-items-center">
              <div className="col my-3">
                <label className="sr-only" htmlFor="inlineFormInputName">
                  Business Id
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inlineFormInputName"
                  placeholder="Business Id"
                  onChange={handleSetBusinessId}
                />
              </div>
              <div className="col my-3">
                <label className="sr-only" htmlFor="inlineFormInputName">
                  Business Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inlineFormInputName"
                  placeholder="Business Name"
                  onChange={handleSetBusinessName}
                />
              </div>
              <div className="col my-3">
                <label className="sr-only" htmlFor="inlineFormInputName">
                  Business Establishment Year
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inlineFormInputName"
                  placeholder="Establishment Year"
                  onChange={handleSetBusinessEstdYear}
                />
              </div>
              <div className="col my-3">
                <label className="sr-only" htmlFor="inlineFormInputGroupUsername">
                  Loan Amount
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">$</div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroupUsername"
                    placeholder="Loan Amount"
                    onChange={handleSetBusinessLoanAmount}
                  />
                </div>
              </div>
              <div className="col my-3">
                <label className="sr-only" htmlFor="inlineFormInputGroupUsername">
                  Accounting Provider
                </label>
                <select
                  className="my-1 mr-sm-2 form-control"
                  id="inlineFormCustomSelectPref"
                  placeholder="Loan Amount"
                  defaultValue="0"
                >
                  <option value="0">Select Accounting Provider</option>
                  <option value="1">Default</option>
                </select>
              </div>
              <div className="col-auto my-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleRequestBalanceSheet}
                >
                  Request Balance Sheet
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="container card">
      <BalanceSheet balanceSheet={balanceSheet} />
        <button
          className="btn btn-primary my-3"
          onClick={handleSubmitApplication}
        >
          Submit Application
        </button>
      </div>
      <div className="container my-2">

        {progressWidth !== 0 && <>
        <div className="card-header">
          <h3>Approved Loan Amount</h3>
        </div>
        <div className="progress" style={{height : '50px'}}>
          <div
            className="progress-bar progress-bar-striped bg-success p-3"
            role="progressbar"
            style=
            {{
            width : `${progressWidth}%`, 
          }}
            aria-valuenow={`${progressWidth}`}
            aria-valuemin="0"
            aria-valuemax="100"
          >{approvedLoanAmount} $</div>
        </div>
        </>}


       
      </div>
    </>
  );
};

export default BusinessDetails;
