import express from 'express';
import validateBody from '../../../../framework/express/validators/validateBody';
import authBodySchemas from './authBodySchemas';
import AuthController from './AuthController';

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/auth/register', validateBody(authBodySchemas.register), authController.register.bind(authController));

authRouter.post('/auth/login', validateBody(authBodySchemas.login), authController.login.bind(authController));

authRouter.post(
  '/auth/refresh-token',
  validateBody(authBodySchemas.refreshToken),
  authController.refreshToken.bind(authController),
);

// authRouter.post('/auth/reset-password-email', authController.sendResetPasswordEmail.bind(authController));

// authRouter.post('/auth/reset-password', authController.resetPassword.bind(authController));

export default authRouter;
