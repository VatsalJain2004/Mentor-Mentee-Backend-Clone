import express from 'express';
import { signIn } from '../controllers/auth/signin.controller.js'
import { logOut } from '../controllers/auth/logout.controller.js'

const router = express.Router();

router.post('/signin', signIn);
router.post('/logout', logOut);


export { router };