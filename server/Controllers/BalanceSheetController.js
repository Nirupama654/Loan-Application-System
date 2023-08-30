const balanceSheet = require("../Assets/balanceSheet.json")

module.exports = {
    get : (req,res) => {
        const id = req.params.id;
        const businessSheet = balanceSheet.filter(obj => obj["id"] == id);
        res.status(200).json({data : businessSheet[0]})
    }
}