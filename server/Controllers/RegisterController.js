const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "../Data", "users.json");

function isEmailValid(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

function isPasswordValid(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z0-9\W_]{8,}$/;

  console.log("Password strength ? ",passwordRegex.test(password));
  return passwordRegex.test(password);
}

module.exports = {
  post: (req, res) => {
    console.log("Register controller called...");
    const { email, password } = req.body;

    console.log("Registered user details : ", email, password);

    let newData = [];

    try {
      if (fs.existsSync(usersFilePath)) {
        const existingData = fs.readFileSync(usersFilePath, "utf-8");
        const users = JSON.parse(existingData);

        if (!isEmailValid(email)) {
          return res.status(400).json({ message: "Invalid email" });
        }

        if (!isPasswordValid(password)) {
          return res.status(400).json({ 
            message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit" });
        }

        if (users.some((user) => user.email === email)) {
          return res.status(400).json({ message: "Username already exists" });
        }

        newData = [...users, req.body];
        
      }
      else {
        newData.push(req.body);
      }
    } catch (error) {
      console.error("Error reading existing data:", error);
    }

    fs.writeFileSync(usersFilePath, JSON.stringify(newData));
    return res.status(200).json({ message: "User Registered Successfully" });

    
  },
};
