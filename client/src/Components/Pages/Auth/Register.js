import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerData } from "../../../Validators/Validators";
import { SET_CURRENT_USER } from "../../../app/Actions/types";
import { registerUser, loginUser } from "../../../Functions/auth";
import jwt_decode from "jwt-decode";
import { message, Progress } from "antd";
const Register = ({ history }) => {
  const [state, setState] = useState({
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
      image: "",
    }),
    [passStrength, setPassStrength] = useState(0);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
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
              message.error({
                content: err.response.data.message,
              });
            });
        })
        .catch((err) => {
          message.error({
            content: err.response.data.message,
          });
        });
    }
  };
  function scorePassword(pass) {
    var score = 0;
    if (!pass) return score;

    // award every unique letter until 5 repetitions
    // eslint-disable-next-line no-new-object
    var letters = new Object();
    for (var i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
    };

    var variationCount = 0;
    for (var check in variations) {
      variationCount += variations[check] == true ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
  }
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    if (name === "password") {
      setPassStrength(scorePassword(value));
    }
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
                  className="form-control"
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
                  className="form-control"
                  id="email"
                  placeholder="someone@somewhere.com"
                  value={state.email}
                  onChange={handleChange}
                  name="email"
                  required
                />
                <label htmlFor="email"> Email:</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="password"> Password:</label>
                <Progress
                  type="circle"
                  percent={passStrength}
                  showInfo={false}
                  width={30}
                  strokeColor={
                    passStrength > 55
                      ? "green"
                      : passStrength > 30
                      ? "yellow"
                      : "red"
                  }
                  strokeWidth={12}
                  className="pass-indicator"
                />
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="passwordConfirm"
                  className="form-control"
                  id="passwordConfirm"
                  placeholder="Confirm Password"
                  value={state.passwordConfirm}
                  onChange={handleChange}
                  required
                />
                <span className="pass-indicator">
                  {state.passwordConfirm.length !== 0 ? (
                    state.passwordConfirm === state.password ? (
                      <i
                        className="far fa-check-circle"
                        style={{ color: "green", fontSize: "20px" }}
                      ></i>
                    ) : (
                      <i
                        className="far fa-times-circle"
                        style={{ color: "red", fontSize: "20px" }}
                      ></i>
                    )
                  ) : null}
                </span>
                <label htmlFor="password">Confirm Password:</label>
              </div>
              <input
                type="submit"
                className="btn btn-primary form-control"
                value="Register"
                disabled={
                  state.email.length === 0 ||
                  state.username.length === 0 ||
                  state.password.length === 0 ||
                  state.passwordConfirm.length === 0 ||
                  state.password !== state.passwordConfirm
                }
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
