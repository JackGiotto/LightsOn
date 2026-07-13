const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { requireAuth } = require('../../middleware/auth');

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

router.post('/logout', (req, res) => {
	res.clearCookie('lo_access_token', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax'
	});
	return res.status(200).json({ msg: 'Logout effettuato' });
});

module.exports = router;
