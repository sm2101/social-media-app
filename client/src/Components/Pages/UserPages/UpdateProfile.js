import React, { useState, useEffect } from "react";
import { getCurrentProfile, updateProfile } from "../../../Functions/profile";
import { useSelector } from "react-redux";
import { Avatar, message } from "antd";
import { isEmpty } from "../../../Validators/Validators";
import EditProfileModal from "../../Modals/EditProfileModal";
const UpdateProfile = ({ history }) => {
  const [profile, setProfile] = useState(""),
    [usr, setUsr] = useState(""),
    [imageId, setImageId] = useState("");
  const [state, setState] = useState({
    name: "",
    bio: "",
    dob: "",
  });
  const { user } = useSelector((state) => ({ ...state }));
  const getData = (id) => {
    getCurrentProfile(id).then((res) => {
      setProfile(res.data.data);
      setUsr(res.data.data.user);
      setState({
        ...state,
        name: res.data.data.name,
        bio: res.data.data.bio,
        dob: res.data.data.dob,
      });
      if (res.data.data.user.imageId) {
        setImageId(res.data.data.user.imageId);
      }
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
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(usr._id, state)
      .then((res) => {
        message.success({ content: "Profile Updated" });
        history.push(`/user/${usr._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const id = user.user.id;
    getData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.user.id]);
  return (
    <div className="updateProfile">
      <div className="container user-info">
        <div className="row">
          <div className="col-lg-4">
            <div className="user-house">
              <div
                className={`user-img border-${
                  !isEmpty(profile) ? profile.house : ""
                }`}
              >
                {!isEmpty(usr) && usr.image.length > 0 ? (
                  <Avatar src={usr.image} size={150} />
                ) : (
                  <Avatar size={150}>
                    <span style={{ fontSize: "xxx-large" }}>
                      {!isEmpty(usr) && usr.username[0].toUpperCase()}
                    </span>
                  </Avatar>
                )}
              </div>
              <div
                className={`house-badge badge-${
                  !isEmpty(profile) ? profile.house : ""
                }`}
              ></div>
            </div>
            <div>
              <EditProfileModal imageId={imageId} />
            </div>
          </div>
          <div className="col-lg-8">
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
                <label htmlFor="name">Your Name</label>
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
                <label htmlFor="bio">Bio:</label>
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
                <label htmlFor="dob">Date of Birth:</label>
              </div>
              <input
                type="submit"
                className="btn btn-primary form-control"
                value="Update Profile"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
