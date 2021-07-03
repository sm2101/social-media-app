import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getPosts } from "../../../Functions/posts";
import PostCards from "../../Cards/PostCards";
import { isEmpty } from "../../../Validators/Validators";
import emptyImg from "../../../Images/pngwing.com.png";
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
                {!isEmpty(posts) ? (
                  <div className="row d-flex justify-content-center">
                    {posts.map((post) => (
                      <PostCards post={post} key={post._id} user={user} />
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      height: "calc(100vh - 10rem)",
                    }}
                  >
                    <img
                      src={emptyImg}
                      alt=""
                      style={{
                        width: "100px",
                        filter: "grayscale(100%)",
                      }}
                      className="center-xy"
                    />
                    <small className="text-muted d-block mb-3 fw-bold text-center center-xy">
                      Such Empty, Much wow
                    </small>
                    <p className="text-muted center-xy text-center">
                      Follow some poeple, or make a post to see it here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-4 d-none d-md-flex"></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
