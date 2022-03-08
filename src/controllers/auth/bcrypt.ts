import bcrypt from "bcryptjs";

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const validatePassword = async function (
  password: string,
  userPassword: string
): Promise<boolean> {
  const desifrado = await bcrypt.compare(password, userPassword);

  return desifrado;
};