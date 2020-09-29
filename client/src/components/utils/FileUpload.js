import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";

function FileUpload(props) {
  const [Images, setImages] = useState([]);

  const dropHandler = files => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" }
    };
    formData.append("file", files[0]);

    axios.post("/api/product/image", formData, config).then(response => {
      try {
        setImages([...Images, response.data.filePath]);
        props.refreshFunction([...Images, response.data.filePath]);
      } catch (e) {
        console.log(e);
        alert("파일 저장에 실패했습니다.");
      }
    });
  };

  const deleteHandler = image => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: "44vw",
                height: "33vw",
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Icon type="plus" style={{ fontSize: "3rem" }} />
            </div>
          </section>
        )}
      </Dropzone>

      <div
        style={{
          display: "flex",
          width: "44vw",
          height: "33vw",
          overflow: "scroll"
        }}
      >
        {Images.map((image, index) => (
          <div onClick={() => deleteHandler(image)} key={index}>
            <img
              className="imageUpload-img"
              src={`http://localhost:5000/${image}`}
              style={{
                width: "100%",
                height: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />
            {/* <img style={{ minWidth: '300px', width: '300px', height: '240px'}}
                  src={`http://localhost:5000/${image}`} /> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
