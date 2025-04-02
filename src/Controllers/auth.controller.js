const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUserService, findUserByEmailService } = require("../Services/auth.service");

const register = async (req, res) => {
  try {
    const { email, password, fullName, phone } = req.body;

    const existing = await findUserByEmailService(email);
    if (existing) {
      return res.status(400).json({ error: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUserService({ email, password: hashedPassword, fullName, phone });

    res.status(201).json({ message:  "User created. Awaiting approval.", user });
  } catch (error) {
    console.error("❌ Register error:", error);
    res.status(500).json({ error:  "Registration error."});
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmailService(email);

    if (!user) return res.status(404).json({ error: "User not found." });
    if (user.status !== "ACCEPTED") return res.status(403).json({ error: "User not approved yet." });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Incorrect password." });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ error: "Login error."  });
  }
};

module.exports = { register, login };
