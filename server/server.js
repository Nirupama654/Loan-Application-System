const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json()); // Parse JSON body
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded body

const balanceSheetRoute = require('./Routes/BalanceSheet');
const decisionRoute = require('./Routes/Decision');
const outcomeRoute = require('./Routes/Outcome');
const businessRoute = require('./Routes/Business');
const summariseRoute = require('./Routes/Summarise')

app.use('/balance_sheet', balanceSheetRoute);
app.use('/decision',decisionRoute);
app.use('/outcome',outcomeRoute);
app.use('/business',businessRoute);
app.use('/summarise',summariseRoute);

const port = process.env.PORT || 5001;
app.listen(port, ()=> {
    console.log(`Server started on port ${port}`)
})