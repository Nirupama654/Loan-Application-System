module.exports = {
  get: (req, res) => {
    try {
      const data = JSON.parse(req.params.body);
      const preAssessment = data.preAssessment;
      const loanAmount = data.loanAmount;
      const approvedLoanAmount = (preAssessment * loanAmount) / 100;

      return res.status(200).json({ data: approvedLoanAmount });
    } catch (err) {
      return res.status(404).json({ message: "Data is not sufficient" });
    }
  },
};
