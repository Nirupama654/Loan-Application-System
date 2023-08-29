module.exports = {
    get : (req,res) => {
        res.status(200).json({"message" : "Decision Controller"})
    }
}