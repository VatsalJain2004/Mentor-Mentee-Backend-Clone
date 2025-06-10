const express = require('express');
const { signIn } = require('./signin');

const router = express.Router();

router.post('/signin', signIn);

module.exports = router;