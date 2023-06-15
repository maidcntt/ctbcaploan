const express = require('express');
const router = express.Router();


router.all('*', (req, res) => {
    res.status(404).json({ httpStatus: 404, message: 'NOT FOUND' });
});


module.exports = router;
