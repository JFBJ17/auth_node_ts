import { Router } from 'express';
import passport from 'passport';
const route = Router();

import * as auth from '../controllers/auth.controllers';
import * as authMiddleware from '../middlewares/auth.middleware'

route.post('/register', auth.registrar);

route.post('/login', passport.authenticate('local'), auth.login);

route.get('/logout', auth.logout);

route.get('/user', auth.getUser);

route.delete('/deleteUser/:id', auth.deleteUser);

route.get('/allUsers', authMiddleware.isAdministratorMiddleware, auth.getUsers);

export default route;