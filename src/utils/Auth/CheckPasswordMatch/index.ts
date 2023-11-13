const CheckPasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

export { CheckPasswordMatch };
