const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { createHashed, checkPassword } = require('../../utils/cipher');

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
        res.status(200).json({ msg: "Login effettuato con successo" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;