const balanceSheet = require("../Assets/balanceSheet.json");

module.exports = {
  get: (req, res) => {
    const id = req.params.id;
    const businessSheet = balanceSheet.filter((obj) => obj["id"] == id);

    if (businessSheet.length > 0) {
      res.status(200).json({ data: businessSheet[0] });
    } else {
      res.status(404).json({
        message: "Oops! No Balance sheet found for this Business.",
      });
    }
  },
};
