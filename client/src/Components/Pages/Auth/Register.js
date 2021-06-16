import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerData } from "../../../Validators/Validators";
import { SET_CURRENT_USER } from "../../../app/Actions/types";
import { registerUser, loginUser } from "../../../Functions/auth";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
const Register = ({ history }) => {
  const [state, setState] = useState({
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
      image: "",
      error: "",
    }),
    [errorEmail, setErrorEmail] = useState(""),
    [errorPass, setErrorPass] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    setErrorPass("");
    setErrorEmail("");
    console.log("register user");
    e.preventDefault();
    const user = {
      email: state.email,
      password: state.password,
      username: state.username,
      image: state.image,
      confirmPassword: state.passwordConfirm,
    };
    const validate = registerData(user);
    console.log(validate);
    if (validate.status) {
      // register the user
      registerUser(user)
        .then((res) => {
          loginUser(user)
            .then((res) => {
              const token = res.data.token;
              const user = jwt_decode(token);
              dispatch({
                type: SET_CURRENT_USER,
                payload: user,
              });
              history.push(`/create-profile/${user._id}`);
            })
            .catch((err) => {
              setState({ ...state, error: err.response.data.message });
              toast.error(state.error);
            });
        })
        .catch((err) => {
          setState({ ...state, error: err.response.data.message });
          toast.error(state.error);
        });
    } else {
      if (validate.errorEmail) {
        setErrorEmail(validate.errorEmail);
      }
      if (validate.errorPass) {
        setErrorPass(validate.errorPass);
      }
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };
  return (
    <div className="register">
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className="auth-card">
          <div className="row m-0 d-flex justify-content-center text-center mb-4">
            <h2>Register</h2>
            <small>And be a part of the community</small>
          </div>
          <div className="row m-0 d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    state.error && state.error.length > 0 ? "is-invalid" : ""
                  }`}
                  id="username"
                  placeholder="Your online identity"
                  value={state.username}
                  onChange={handleChange}
                  name="username"
                  required
                />
                <label htmlFor="email"> Username:</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    errorEmail && errorEmail.length > 0 ? "is-invalid" : ""
                  }`}
                  id="email"
                  placeholder="someone@somewhere.com"
                  value={state.email}
                  onChange={handleChange}
                  name="email"
                  required
                />
                <label htmlFor="email"> Email:</label>
                <div id="email" className="invalid-feedback">
                  {errorEmail}
                </div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="password"
                  className={`form-control ${
                    state.error && state.error.length > 0 ? "is-invalid" : ""
                  }`}
                  id="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password"> Password:</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="passwordConfirm"
                  className={`form-control ${
                    errorPass && errorPass.length > 0 ? "is-invalid" : ""
                  }`}
                  id="passwordConfirm"
                  placeholder="Confirm Password"
                  value={state.passwordConfirm}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password">Confirm Password:</label>
                <div id="passwordConfirm" className="invalid-feedback">
                  {errorPass}
                </div>
              </div>
              <input
                type="submit"
                className="btn btn-primary form-control"
                value="Register"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
