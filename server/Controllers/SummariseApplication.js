const axios = require("axios");

const {
  calculateProfitInLastYear,
  calculateAverageAssetValue,
  calculatePreAssessmentValue,
} = require("../Utils/utils");

const callDecisionController = async (obj) => {
  const response = await axios.get(
    `http://localhost:5001/decision/${JSON.stringify(obj)}`
  );
  const apiData = response.data;
  const approvedLoanAmount = apiData.data;
  return approvedLoanAmount;
  console.log("Approved Loan Amount : ", apiData.data);
};

module.exports = {
  post: async (req, res) => {
    try {
      const id = req.body.id;
      const loanAmount = req.body.amount;
      const response = await axios.get(
        `http://localhost:5001/balance_sheet/${id}`
      );
      const apiData = response.data;
      const sheet = apiData.data["sheet"];
      const profitOrLoss = calculateProfitInLastYear(sheet);
      const averageAssetValue = calculateAverageAssetValue(sheet);
      const preAssessment = calculatePreAssessmentValue(
        profitOrLoss,
        loanAmount,
        averageAssetValue
      );

      const data = {
        name: req.body.name,
        year: req.body.year,
        summary: profitOrLoss,
        preAssessment: preAssessment,
        loanAmount: loanAmount,
      };

      const approvedLoanAmount = await callDecisionController(data);
      return res.status(200).json({ data: approvedLoanAmount });
    } catch (err) {
      return res.status(404).json({ message: err });
    }
  },
};
