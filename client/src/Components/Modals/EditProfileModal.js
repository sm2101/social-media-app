import React, { useState } from "react";
import { Modal, Button } from "antd";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { uploadImage, deleteImage } from "../../Functions/cloudinary";
import { updateUser } from "../../Functions/user";
import { isEmpty } from "../../Validators/Validators";
const EditProfileModal = ({ imageId }) => {
  const [visible, setVisible] = useState(false),
    [loading, setLoading] = useState(false),
    [originalImg, setOGImg] = useState(null),
    [crop, setCrop] = useState({ aspect: 1 / 1 }),
    [image, setImage] = useState(null),
    [croppedImage, setCroppedImage] = useState(null);
  const handleCancel = () => {
    setVisible(false);
  };
  const handleOk = () => {
    setLoading(true);
    if (!isEmpty(imageId)) {
      deleteImage(imageId)
        .then((res) => {
          uploadImage(croppedImage)
            .then((res) => {
              updateUser({
                image: res.data.url,
                imageId: res.data.public_id,
              });
              setLoading(false);
              setVisible(false);
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
              setVisible(false);
            });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setVisible(false);
        });
    } else {
      uploadImage(croppedImage)
        .then((res) => {
          updateUser({
            image: res.data.url,
            imageId: res.data.public_id,
          });
          setLoading(false);
          setVisible(false);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setVisible(false);
  };
  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };
  const handleUpload = (e) => {
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      setOGImg(dataURL);
      setVisible(true);
    };
    reader.readAsDataURL(file);
  };
  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // As Base64 string
    const base64Image = canvas.toDataURL("image/jpeg");
    setCroppedImage(base64Image);
  }
  return (
    <>
      <label className="btn form-control text-primary" htmlFor="img">
        Change Profile Picture
      </label>
      <input
        type="file"
        accept="images/JPEG images/PNG images/JPG"
        id="img"
        hidden
        onChange={handleUpload}
      />
      <Modal
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        title="Edit Picture"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            loading={loading}
            type="primary"
            onClick={handleOk}
          >
            Update
          </Button>,
        ]}
      >
        {originalImg && (
          <>
            <ReactCrop
              src={originalImg}
              crop={crop}
              onChange={(newCrop) => handleCropChange(newCrop)}
              onImageLoaded={setImage}
            />
            <small>Crop the image</small>
            <button className="btn" onClick={getCroppedImg}>
              Crop
            </button>
            <br />
          </>
        )}
        {croppedImage && (
          <>
            <div className="d-flex justify-content-around w-100 align-items-center">
              <span>Your new Profile Picture</span>
              <img
                src={croppedImage}
                alt="cropped"
                className="img-fluid dp-preview"
              />
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default EditProfileModal;
