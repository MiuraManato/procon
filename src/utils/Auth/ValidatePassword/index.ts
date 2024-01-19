const ValidatePassword = (password: string): boolean => {
  // かっこ系の記号\は使えません
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9[ -/:-@[-`{-~]]{8,}$/;
  return passwordRegex.test(password);
};

export { ValidatePassword };
