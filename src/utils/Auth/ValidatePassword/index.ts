const ValidatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9.?/-]{8,}$/;
  return passwordRegex.test(password);
};

export { ValidatePassword };
