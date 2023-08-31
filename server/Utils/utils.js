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
  console.log("profitInLastYear", profitInLastYear);
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
  console.log("averageAssetValue", averageAssetValue);
  return averageAssetValue;
};

const calculatePreAssessmentValue = (
  profitOrLoss,
  loanAmount,
  averageAssetValue
) => {
  let preAssessment;
  console.log(
    `average asset value : ${averageAssetValue}, loan amount : ${loanAmount}`
  );
  if (averageAssetValue > loanAmount) {
    preAssessment = 100;
  } else if (profitOrLoss > 0) {
    preAssessment = 60;
  } else {
    preAssessment = 20;
  }
  console.log("preAssessment", preAssessment);
  return preAssessment;
};

module.exports = {
  calculateProfitInLastYear,
  calculateAverageAssetValue,
  calculatePreAssessmentValue,
};
