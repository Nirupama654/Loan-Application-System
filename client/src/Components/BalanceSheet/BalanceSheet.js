import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const BalanceSheet = ({ balanceSheet }) => {
  const month = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  return (
    <>
      <div className="container">
        <div className="card-header">
          <h3>Balance Sheet</h3>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Year</th>
              <th scope="col">Month</th>
              <th scope="col">Profit or Loss</th>
              <th scope="col">Asset Value</th>
            </tr>
          </thead>
          <tbody>
            {balanceSheet &&
              balanceSheet["sheet"] &&
              balanceSheet["sheet"].map((row, idx) => {
                return (
                  <tr key={idx}>
                    <th scope="row">{idx}</th>
                    <td>{row.year}</td>
                    <td>{month[row.month]}</td>
                    <td>{row.profitOrLoss}</td>
                    <td>{row.assetsValue}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BalanceSheet;
