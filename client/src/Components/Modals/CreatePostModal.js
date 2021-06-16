import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "antd";
import Resizer from "react-image-file-resizer";
import ReactQuill from "react-quill";
import { uploadImage } from "../../Functions/cloudinary";
import { createPost } from "../../Functions/posts";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
const CreatePostModal = () => {
  const [visible, setVisible] = useState(false),
    [image, setImage] = useState(""),
    [loading, setLoading] = useState(false),
    [caption, setCaption] = useState("");

  const history = useHistory();

  const handleChange = (e) => {
    setLoading(true);
    const files = e.target.files;
    if (files && files.length > 0) {
      const currentFile = files[0];
      Resizer.imageFileResizer(
        currentFile,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          setImage(uri);
          setLoading(false);
        },
        "base64"
      );
      setVisible(true);
    }
  };
  const handleCancel = () => {
    setImage("");
    setVisible(false);
  };
  const handleCaption = (val) => {
    setCaption(val);
    console.log(val);
  };
  const post = (uri) => {
    setLoading(true);
    uploadImage(uri).then((res) => {
      const post = {
        caption,
        images: res.data.url,
        imageId: res.data.public_id,
      };
      createPost(post)
        .then((res) => {
          setVisible(false);
          setCaption("");
          setImage("");
          setLoading(false);
          history.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong try Again");
        });
    });
  };
  const handleOk = () => {
    post(image);
  };
  return (
    <>
      <label htmlFor="file" className="btn">
        <i className="fas fa-plus-square"></i>
      </label>
      <input
        type="file"
        id="file"
        hidden
        onChange={handleChange}
        accept="images/*"
      />
      <Modal
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        title="Post"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <label htmlFor="file" className="btn btn-sm mx-1 btn-outline-primary">
            Change Image
          </label>,
          <Button
            key="submit"
            loading={loading}
            type="primary"
            onClick={handleOk}
          >
            Post
          </Button>,
        ]}
      >
        <div className="preview-img-cont">
          <img src={image} alt="preview" className="preview-img" />
        </div>
        <div className="caption-cont">
          <ReactQuill
            value={caption}
            onChange={handleCaption}
            theme="snow"
            placeholder={"Caption..."}
          />
        </div>
      </Modal>
    </>
  );
};

export default CreatePostModal;
