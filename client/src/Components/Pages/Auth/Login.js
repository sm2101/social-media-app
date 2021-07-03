import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../Functions/auth";
import { toast } from "react-toastify";
import { setUser } from "../../../app/Actions/auth";
import jwt_decode from "jwt-decode";
import { message } from "antd";
const Login = ({ history }) => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState(""),
    [visible, setVsible] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();
    const user = {
      email,
      password,
    };
    loginUser(user)
      .then((res) => {
        const token = res.data.token;
        const user = jwt_decode(token);
        setUser(dispatch, user);
        history.push("/");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };
  return (
    <div className="login">
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className="auth-card">
          <div className="row m-0 d-flex justify-content-center text-center mb-4">
            <h2>Login</h2>
            <small>To enter the castle</small>
          </div>
          <div className="row m-0 d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className={`form-control ${
                    error && error.length > 0 ? "is-invalid" : ""
                  }`}
                  id="email"
                  placeholder="someone@somewhere.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="email"> Email:</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type={`${visible ? "text" : "password"}`}
                  className={`form-control ${
                    error && error.length > 0 ? "is-invalid" : ""
                  }`}
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="password"> Password:</label>
                <span
                  className="btn pass-indicator"
                  onClick={() => setVsible(!visible)}
                >
                  {visible ? (
                    <i className="far fa-eye-slash"></i>
                  ) : (
                    <i className="far fa-eye"></i>
                  )}
                </span>
              </div>
              <input
                type="submit"
                className="btn btn-primary form-control"
                value="Enter"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
