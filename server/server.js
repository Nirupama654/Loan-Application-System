const express = require("express");
const app = express();

const balanceSheetRoute = require('./Routes/BalanceSheet');
const decisionRoute = require('./Routes/Decision');
const outcomeRoute = require('./Routes/Outcome');

app.use('/balance_sheet', balanceSheetRoute);
app.use('/decision',decisionRoute);
app.use('/outcome',outcomeRoute);

const port = process.env.PORT || 5001;
app.listen(port, ()=> {
    console.log(`Server started on port ${port}`)
})