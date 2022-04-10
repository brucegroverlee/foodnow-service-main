interface PasswordService {
  isValid(dbPassword: string, requestPassword: string): Promise<boolean>;
  encryptPassword(password: string): Promise<string>;
}

export default PasswordService;
