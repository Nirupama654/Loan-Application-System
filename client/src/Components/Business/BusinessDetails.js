import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const BusinessDetails = () => {

  const [businessName,setBusinessName] = useState("");
  const [businessEstdYear,setBusinessEstdYear] = useState("");
  const [loanAmount,setLoanAmount] = useState("");

  const handleSetBusinessName = (e) => {
    setBusinessName(e.target.value)
  }
  const handleSetBusinessEstdYear = (e) => {
    setBusinessEstdYear(e.target.value)
  }
  const handleSetBusinessLoanAmount = (e) => {
    setLoanAmount(e.target.value)
  }

  const handleSubmitBusinessDetails = (e) => {
    e.preventDefault();
    const obj = {
      "name" : businessName,
      "year" : businessEstdYear,
      "amount" : loanAmount
    }
    console.log(obj);
  }

  const fetchSheet = async () => {
    const response = await fetch(`https://localhost:5001/balance_sheet`);
    const apiData = await response.json();
    console.log("Balance Sheet : ", apiData.data);
  };
  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center">
        <div className="container m-3">
          <form>
            <div className="form-row align-items-center">
              <div className="col-sm-3 my-1">
                <label className="sr-only" for="inlineFormInputName">
                  {/* Business Name */}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inlineFormInputName"
                  placeholder="Business Name"
                  onChange={handleSetBusinessName}
                />
              </div>
              <div className="col-sm-3 my-1">
                <label className="sr-only" for="inlineFormInputName">
                  {/* Business Establishment Year */}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inlineFormInputName"
                  placeholder="Establishment Year"
                  onChange={handleSetBusinessEstdYear}
                />
              </div>
              <div className="col-sm-3 my-1">
                <label className="sr-only" for="inlineFormInputGroupUsername">
                  {/* Loan Amount */}
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
              <div className="col-sm-3 my-1">
              <label className="sr-only" for="inlineFormInputGroupUsername">
                  {/* Loan Amount */}
                </label>
                <select
                  className="my-1 mr-sm-2 form-control"
                  id="inlineFormCustomSelectPref"
                  placeholder="Loan Amount"
                >
                  <option selected>Select Accounting Provider</option>
                  <option value="1">Default</option>
                </select>
              </div>
              <div className="col-auto my-3">
                <button type="submit" className="btn btn-primary" onClick={handleSubmitBusinessDetails}>
                  Submit and Request Balance Sheet
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BusinessDetails;
