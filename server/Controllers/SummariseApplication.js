const axios = require("axios");

const calculateProfitInLastYear = (sheet) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  let profitInLastYear = 0;
  for (const item of sheet) {
    const itemDate = new Date(item.year, item.month - 1);
    const twelveMonthsAgo = new Date(currentYear - 1, currentMonth - 1);
    if (itemDate >= twelveMonthsAgo && itemDate < currentDate) {
      profitInLastYear += item["profitOrLoss"];
    }
  }
  return profitInLastYear;
};

const calculateAverageAssetValue = (sheet) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
  
    let totalAssetValue = 0;
    let count = 0;
  
    for (let item of sheet) {
      const itemDate = new Date(item.year, item.month - 1); 
      const twelveMonthsAgo = new Date(currentYear - 1, currentMonth - 1);
  
      if (itemDate >= twelveMonthsAgo && itemDate < currentDate) {
        totalAssetValue += item.assetsValue;
        count += 1;
      }
    }
  
    if (count === 0) {
      return 0;
    }
  
    const averageAssetValue = totalAssetValue / count;
    return averageAssetValue.toFixed(2);
  };
  

const calculatePreAssessmentValue = (
  profitOrLoss,
  loanAmount,
  averageAssetValue
) => {
  let preAssessment;
  if (averageAssetValue > loanAmount) {
    preAssessment = 100;
  } else if (profitOrLoss > 0) {
    preAssessment = 60;
  } else {
    preAssessment = 20;
  }

  return preAssessment;
};

const callDecisionController = async(obj) => {
    const response = await axios.get(
        `http://localhost:5001/decision/${JSON.stringify(obj)}`
      );
      const apiData = response.data;
      const approvedLoanAmount = apiData.data;
      return approvedLoanAmount;
      console.log("Approved Loan Amount : ", apiData.data);
}

module.exports = {
  post: async (req, res) => {
    
    try{
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
            "name" : req.body.name,
            "year" : req.body.year,
            "summary" : profitOrLoss,
            "preAssessment" : preAssessment,
            "loanAmount" : loanAmount
        }
    
        const approvedLoanAmount = await callDecisionController(data);
        return res.status(200).json({data : approvedLoanAmount});
    }
    catch(err){
        return res.status(404).json({message : err})
    }

  },
};
