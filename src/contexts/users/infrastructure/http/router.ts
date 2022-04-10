import express from 'express';
import validateAuthentication from '../../../../framework/express/middlewares/validateAuthentication';
import UsersController from './UsersController';

const authRouter = express.Router();
const usersController = new UsersController();

authRouter.get('/users/me', validateAuthentication, usersController.me.bind(usersController));

export default authRouter;
