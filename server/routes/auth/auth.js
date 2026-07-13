const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const User = require('../../models/User');
const { createHashed, checkPassword } = require('../../utils/cipher');
const jwt = require("jsonwebtoken");
const { requireAuth } = require('../../middleware/auth');

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Registrazione nuovo utente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utente creato con successo, token JWT nel cookie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Campi mancanti o email già esistente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Errore del server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/signup', async (req, res) => {
    try {
    const {
      email,
      password,
      firstName: rawFirstName,
      lastName: rawLastName,
      FirstName,
      LastName
    } = req.body;
    const firstName = rawFirstName ?? FirstName;
    const lastName = rawLastName ?? LastName;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ msg: "Campi obbligatori mancanti" });
    }

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

        res.status(201).json({ msg: "Utente creato con successo", role: newUser.role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login utente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login riuscito, token JWT nel cookie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Credenziali errate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Errore del server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
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

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Restituisce il ruolo dell'utente autenticato
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Dati utente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: Non autenticato
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Errore del server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/me', requireAuth, async (req, res) => {
    try {
        res.status(200).json({
            userId: req.auth.userId,
            role: req.auth.role
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout (rimuove il cookie di accesso)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout effettuato con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Errore del server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/logout', (req, res) => {
    res.clearCookie("lo_access_token");
    res.status(200).json({ msg: "Logout effettuato" });
});

module.exports = router;