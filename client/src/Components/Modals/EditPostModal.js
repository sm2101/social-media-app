import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button, message } from "antd";
import { updatePost } from "../../Functions/posts";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
const EditPostModal = ({ id, cap, image, func }) => {
  const [visible, setVisible] = useState(false),
    [loading, setLoading] = useState(false),
    [caption, setCaption] = useState("");
  const history = useHistory();
  const handleCancel = () => {
    setVisible(false);
  };
  const handleCaption = (val) => {
    setCaption(val);
  };
  const handleOk = () => {
    setLoading(true);
    updatePost(id, caption)
      .then((res) => {
        message.success({ content: "Post Updated" });
        func();
        setVisible(false);
        setLoading(false);
      })
      .catch((err) => {
        message.error({ content: "Some error occured, try again" });
        setVisible(false);
        setLoading(false);
      });
  };
  useEffect(() => {
    setCaption(cap);
  }, [cap]);
  return (
    <>
      <button className="btn" onClick={() => setVisible(true)}>
        <i className="fas fa-pen"></i> Edit
      </button>
      <Modal
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        title="Edit Post"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            loading={loading}
            type="primary"
            onClick={handleOk}
            disabled={caption.length === 0}
          >
            Update
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

export default EditPostModal;
