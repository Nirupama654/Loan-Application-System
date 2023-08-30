import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import BalanceSheet from "../BalanceSheet/BalanceSheet";

const BusinessDetails = () => {
  const [businessId, setBusinessId] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessEstdYear, setBusinessEstdYear] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [balanceSheet, setBalanceSheet] = useState([]);
  const [approvedLoanAmount, setApprovedLoanAmount] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [isInputInvalid, setIsInputInvalid] = useState(false);
  const [alert, setAlert] = useState(<></>);

  const handleSetBusinessId = (e) => {
    setBusinessId(e.target.value);
    setIsInputInvalid(false);
    setAlert(<></>);
  };
  const handleSetBusinessName = (e) => {
    setBusinessName(e.target.value);
    setIsInputInvalid(false);
    setAlert(<></>);
  };
  const handleSetBusinessEstdYear = (e) => {
    setBusinessEstdYear(e.target.value);
    setIsInputInvalid(false);
    setAlert(<></>);
  };
  const handleSetBusinessLoanAmount = (e) => {
    setLoanAmount(e.target.value);
    setIsInputInvalid(false);
    setAlert(<></>);
  };

  function isValidYear(year) {
    const currentYear = new Date().getFullYear();
    const earliestYear = 1900; // Adjust as needed

    return year >= earliestYear && year <= currentYear;
  }

  const handleRequestBalanceSheet = async (e) => {
    e.preventDefault();
    setAlert(<></>);
    setIsInputInvalid(false);
    if (
      businessId === "" ||
      businessName === "" ||
      !isValidYear(businessEstdYear) ||
      loanAmount === ""
    ) {
      setAlert(
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>Invalid Information!</strong> &nbsp; Please check in one of the
          fields below.
        </div>
      );
      setIsInputInvalid(true);
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
      const width = (approvedAmount * 100) / loanAmount;
      setProgressWidth(width);
    } catch (error) {
      console.error("Error fetching balance sheet:", error);
    }
  };

  return (
    <>
      <Navbar />
        <div className="container my-1">
        {alert}
        </div>
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
                <label
                  className="sr-only"
                  htmlFor="inlineFormInputGroupUsername"
                >
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
                <label
                  className="sr-only"
                  htmlFor="inlineFormInputGroupUsername"
                >
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
                  disabled = {isInputInvalid}
                >
                  Request Balance Sheet
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {balanceSheet.length !== 0 && (
        <div className="container card">
          <BalanceSheet balanceSheet={balanceSheet} />
          <div className="col-auto my-2">
            <button
              className="btn btn-primary"
              onClick={handleSubmitApplication}
            >
              Submit Application
            </button>
          </div>
        </div>
      )}
      <div className="container my-2">
        {progressWidth !== 0 && (
          <>
            <div className="card-header">
              <h3>Approved Loan Amount</h3>
            </div>
            <div className="progress" style={{ height: "50px" }}>
              <div
                className="progress-bar progress-bar-striped bg-success p-3"
                role="progressbar"
                style={{
                  width: `${progressWidth}%`,
                }}
                aria-valuenow={`${progressWidth}`}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {approvedLoanAmount} $
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BusinessDetails;
