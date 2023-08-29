const balanceSheet = require("../Assets/balanceSheet.json")

module.exports = {
    get : (req,res) => {
        const id = req.params.id;
        // console.log("id : ",id);
        const businessSheet = balanceSheet.filter(obj => obj["id"] == id);
        // console.log(businessSheet);
        res.status(200).json({data : businessSheet})
    }
}