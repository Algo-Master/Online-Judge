// src/Pages/NotFoundPage.js
import React from "react";
import { Xheader } from "./Components/Header";
import { Xfooter } from "./Components/Footer";
import inprogress from "./Assets/ExpFeature_OJ.png";
import "./NotFoundPage.css";

const InProgress = () => {
  return (
    <div>
      <Xheader />
      <div className="nfcontainer">
        <img className="nfimage" src={inprogress} />
      </div>
      <Xfooter />
    </div>
  );
};

export default InProgress;
