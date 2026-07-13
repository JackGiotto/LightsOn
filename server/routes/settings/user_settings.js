const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { requireAuth } = require('../../middleware/auth');

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Restituisce i dati dell'utente autenticato
 *     tags: [User]
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
 *                 email:
 *                   type: string
 *                   format: email
 *                 profile:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                 role:
 *                   type: string
 *       404:
 *         description: Utente non trovato
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
router.get('/me', requireAuth, async (req, res) => {
	try {
		const user = await User.findById(req.auth.userId).select('email profile role');

		if (!user) {
			return res.status(404).json({ msg: 'Utente non trovato' });
		}

		return res.status(200).json({
			userId: user._id,
			email: user.email,
			profile: user.profile,
			role: user.role
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout (rimuove il cookie di accesso)
 *     tags: [User]
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
 */
router.post('/logout', (req, res) => {
	res.clearCookie('lo_access_token', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax'
	});
	return res.status(200).json({ msg: 'Logout effettuato' });
});

module.exports = router;