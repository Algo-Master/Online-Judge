// src/Pages/NotFoundPage.js
import React from "react";
import { Xheader } from "./Components/Header";
import { Xfooter } from "./Components/Footer";
import notfound from "./Assets/404_OJ.png";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div>
      <Xheader />
      <div className="nfcontainer">
        <img className="nfimage" src={notfound} />
      </div>
      <Xfooter />
    </div>
  );
};

export default NotFoundPage;
