import React from "react";
import UserRoute from "./Components/Routes/UserRoute";
import PublicRoute from "./Components/Routes/PublicRoute";
import Login from "./Components/Pages/Auth/Login";
import Register from "./Components/Pages/Auth/Register";
import Dashboard from "./Components/Pages/UserPages/Dashboard";
import CreateProfile from "./Components/Pages/UserPages/CreateProfile";
import UpdateProfile from "./Components/Pages/UserPages/UpdateProfile";
import PostPage from "./Components/PublicPages/PostPage";
import Nav from "./Components/Nav/Nav";
import UserPage from "./Components/PublicPages/UserPage";
import CommentDrawer from "./Components/Drawer/CommentDrawer";
import { ToastContainer } from "react-toastify";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
function App() {
  return (
    <>
      <ToastContainer />
      <div className="App">
        <Nav />
        <CommentDrawer />
        <Switch>
          {/* Strictily for Public Routes */}
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={Register} />
          {/* Private Routes */}
          <UserRoute exact path="/" component={Dashboard} />
          <Route exact path="/create-profile/:id" component={CreateProfile} />
          <UserRoute
            exact
            path="/update-profile/:id"
            component={UpdateProfile}
          />
          <UserRoute exact path="/post/:id" component={PostPage} />
          <UserRoute exact path="/user/:id" component={UserPage} />
        </Switch>
      </div>
    </>
  );
}

export default App;
