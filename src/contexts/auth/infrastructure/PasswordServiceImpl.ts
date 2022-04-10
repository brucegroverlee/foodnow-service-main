import bcrypt from 'bcryptjs';
import PasswordService from '../application/PasswordService';

export const passwordServiceImpl: PasswordService = {
  isValid: async function (dbPassword: string, requestPassword: string): Promise<boolean> {
    return await bcrypt.compare(requestPassword, dbPassword);
  },

  encryptPassword: async function (password: string): Promise<string> {
    let salt = await bcrypt.genSalt(12);

    return await bcrypt.hash(password, salt);
  },
};
