import React, { useState } from "react";
import "./ImageContainer.scss";
const ImageContainer = ({ image }: { image: string }) => {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <div className="imagecontainer-container">
      <img
        src={image}
        alt=""
        onLoad={() => setImageLoading(false)}
        style={{ display: imageLoading ? "none" : "block" }}
      />
      <div
        style={{ display: !imageLoading ? "none" : "block" }}
        className="image-skeleton"
      ></div>
    </div>
  );
};

export default ImageContainer;
