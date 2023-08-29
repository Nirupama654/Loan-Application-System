const balanceSheet = require("../Assets/balanceSheet.json")

module.exports = {
    get : (req,res) => {
        res.status(200).json({data : balanceSheet})
    }
}