import axios from "axios";
export const createOtp = async (email) => {
  return await axios.post("/api/otp/", { email });
};
