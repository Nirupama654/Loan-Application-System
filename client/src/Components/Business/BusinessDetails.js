import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import BalanceSheet from "../BalanceSheet/BalanceSheet";
import { useAuth } from "../../AuthContext";
import Home from "../Home/Home";

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

  const { isAuthenticated } = useAuth();

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

  const handleSetAlert = (message, status) => {
    const bg = status == "success" ? "success" : "danger";
    setAlert(
      <div
        className={`alert alert-${bg} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{message}</strong>
      </div>
    );
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
    setProgressWidth(0);
    setApprovedLoanAmount(0);
    setBalanceSheet([]);
    if (
      businessId === "" ||
      businessName === "" ||
      !isValidYear(businessEstdYear) ||
      loanAmount === ""
    ) {
      handleSetAlert(
        "One of the input fields is invalid. Please check once again!",
        "failure"
      );
      setIsInputInvalid(true);
      setTimeout(() => {
        setAlert(<></>);
      }, 3000);
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
        handleSetAlert(response.data.message);
        await fetchSheet(businessId);
      }
    } catch (error) {
      console.error("Error sending request:", error);
      // handleSetAlert(error);
    }
  };

  const fetchSheet = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/balance_sheet/${id}`
      );
      const apiData = response.data;
      console.log("Balance Sheet: ", apiData.data);
      setBalanceSheet(apiData.data);
      handleSetAlert("Balance sheet fetched successfully", "success");
    } catch (error) {
      console.error("Error fetching balance sheet:", error);
      handleSetAlert(error.response.data.message, "failure");
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
      {isAuthenticated ? (<>
        <div className="container my-1">{alert}</div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="container card m-3">
            <div className="card-header text-center">
              <h3>Loan Application Details</h3>
            </div>
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
                    <option value="1">Xero</option>
                    <option value="2">MYOB</option>
                  </select>
                </div>
                <div className="col-auto my-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleRequestBalanceSheet}
                    disabled={isInputInvalid}
                  >
                    Request Balance Sheet
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {balanceSheet && balanceSheet.length !== 0 && (
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
                <h3>Approved Loan Amount : {approvedLoanAmount} $</h3>
              </div>
              <div className="progress" style={{ height: "50px" }}>
                <div
                  className={`progress-bar progress-bar-striped ${
                    progressWidth < 50 ? "bg-danger" : "bg-success"
                  } p-3`}
                  role="progressbar"
                  style={{
                    width: `${progressWidth}%`,
                  }}
                  aria-valuenow={`${progressWidth}`}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {progressWidth} %
                </div>
              </div>
            </>
          )}
        </div>
      </>) : <Home/>}
    </>
  );
};

export default BusinessDetails;
