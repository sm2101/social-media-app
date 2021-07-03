import React, { useState } from "react";
import { createProfile } from "../../../Functions/profile";
const CreateProfile = ({ history }) => {
  const [state, setState] = useState({
      name: "",
      bio: "",
      house: "",
      dob: "",
    }),
    [sorted, setSorted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    createProfile(state)
      .then((res) => {
        console.log(res.data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
  const sort = (e) => {
    e.preventDefault();
    let houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];
    const randomElement = houses[Math.floor(Math.random() * houses.length)];
    setState({
      ...state,
      house: randomElement,
    });
    setSorted(true);
  };
  return (
    <div className="createProfile">
      <div className="container-h-100 d-flex justify-content-center align-items-center">
        <div className="auth-card">
          <div className="row m-0 d-flex justify-content-center text-center mb-4">
            <h3>Welcome to the Grand Hall</h3>
            <small>Let's get you sorted</small>
          </div>
          <div className="row m-0 d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    state.error && state.error.length > 0 ? "is-invalid" : ""
                  }`}
                  id="name"
                  placeholder="Your Name"
                  value={state.name}
                  onChange={handleChange}
                  name="name"
                  required
                />
                <label htmlFor="name">Your Name*</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="bio"
                  placeholder="someone@somewhere.com"
                  value={state.bio}
                  onChange={handleChange}
                  name="bio"
                />
                <label htmlFor="bio">Bio:*</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  id="dob"
                  placeholder="dob"
                  value={state.dob}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="dob">Date of Birth:*</label>
              </div>
              <div className="form-floating mb-3 input-group">
                <input
                  type="text"
                  name="house"
                  className="form-control"
                  id="house"
                  placeholder="House"
                  value={state.house}
                  disabled
                  required
                />
                <label htmlFor="password">Your House*</label>
                <button
                  className="btn btn-outline-success"
                  onClick={sort}
                  disabled={sorted}
                >
                  Sort
                </button>
              </div>
              <input
                type="submit"
                className="btn btn-primary form-control"
                value="Enter"
                disabled={
                  state.name.length === 0 ||
                  state.bio.length === 0 ||
                  state.dob.length === 0 ||
                  state.house.length === 0
                }
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
