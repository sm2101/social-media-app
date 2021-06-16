import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getPosts } from "../../../Functions/posts";
import PostCards from "../../Cards/PostCards";
const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const getPost = () => {
    getPosts().then((res) => {
      setPosts(res.data.posts);
    });
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <>
      <div className="dashboard">
        <div className="container">
          <div className="row h-100 m-0">
            <div className="col-12 col-md-8 p-0">
              {/* Posts */}
              <div className="container">
                <div className="row"></div>
                <div className="row d-flex justify-content-center">
                  {posts.map((post) => (
                    <PostCards post={post} key={post._id} user={user} />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-4 d-none d-md-flex"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
