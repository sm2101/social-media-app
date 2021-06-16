import validator from "email-validator";
export const isEmpty = (value) => {
  const ret =
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);
  return ret;
};

export const registerData = (user) => {
  const res = {
    status: false,
  };
  const email = validator.validate(user.email);
  const pass = user.password === user.confirmPassword;
  if (!email) {
    res.errorEmail = "Invalid Email";
  }
  if (!pass) {
    res.errorPass = "Passwords dont match";
  }
  if (email && pass) {
    res.status = true;
  }
  return res;
};
