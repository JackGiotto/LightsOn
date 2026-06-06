const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const User = require('../../models/User');
const { createHashed, checkPassword } = require('../../utils/cipher');
const jwt = require("jsonwebtoken");

router.post('/signup', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        const existingUser = await
            User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "Esiste già un utente con questa email" });

        const hashedPassword = await createHashed(password);
        const newUser = new User({
            email,
            passwordHash: hashedPassword,
            profile: { firstName, lastName },
            authMethods: { hasPassword: true }
        });
        await newUser.save();

        const token = jwt.sign(
          {
            userID: newUser._id.toString(),
            userRole: newUser.role,
            jti: crypto.randomUUID()
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        res.cookie("lo_access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({ msg: "Utente creato con successo" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await
            User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Username o password errati" });
        const checked = await checkPassword(password, user.passwordHash);
        if (!checked) return res.status(400).json({ msg: "Username o password errati" });
        const token = jwt.sign(
          {
            userID: user._id.toString(),
            userRole: user.role,
            jti: crypto.randomUUID()
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        res.cookie("lo_access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ msg: "Login effettuato con successo", role: user.role });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;