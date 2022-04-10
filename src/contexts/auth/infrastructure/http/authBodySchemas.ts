import Joi from 'joi';

const authBodySchemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  refreshToken: Joi.object({
    refreshToken: Joi.string()
      .guid({
        version: ['uuidv4'],
      })
      .required(),
  }),
};

export default authBodySchemas;
