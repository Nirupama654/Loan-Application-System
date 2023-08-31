const fs = require('fs');
const path = require("path");
const jwt = require("jsonwebtoken");
const secretKey = "do-&%@#%#$^4not-*%#%$^%&even-@!@$#%$try-&%%#@to*^^$#^*&*^%$@@@#-decode-key";
const usersFilePath = path.join(__dirname, '../Data', 'users.json');

module.exports = {
  post: (req, res) => {
    console.log("Login controller called",req.body)
    try{
      const { email, password } = req.body;
      const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

      console.log(`users : ${users}`)
  
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      console.log(`user : ${user}`)
  
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ email }, secretKey);
      res.status(200).json({ "token" : token, message : "Logged in successfully" });
    }catch(err){
      res.status(500).send(err)
    }
    
  },
};
