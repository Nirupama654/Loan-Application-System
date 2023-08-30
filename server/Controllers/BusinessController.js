const fs = require('fs');
const path = require("path");

module.exports = {
    post: (req, res) => {
        console.log(req.body);
        const business = req.body;

        const filePath = path.join(__dirname, '../Data', 'businessData.json');
        let newData = [];
        try {
            if (fs.existsSync(filePath)) {
                const fileContent = fs.readFileSync(filePath, 'utf-8');
                const existingData = JSON.parse(fileContent);

                // const exists = existingData.some(existingBusiness =>
                //     existingBusiness.id === business.id
                // );

                // if (exists) {
                //     return res.status(401).json({ message: "Business data already exists!" });
                // }
                newData = [...existingData, business];
            }
        } catch (error) {
            console.error('Error reading existing data:', error);
        }

        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2)); // 2 spaces for indentation

        return res.status(200).json({ message: 'Business ID received and processed successfully' });
    }
};
