const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const validatePhone = (phone) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phone);
};

const validatePassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

export { validateEmail, validatePhone, validatePassword };
