import React from "react";

import weatherLogo from "../../assets/images/logo.svg";
import styles from "./Logo.module.css";

const logo = props => (
  <div className={styles.Logo} style={{ height: props.height }}>
    <img src={weatherLogo} alt="WeatherIcon" />
  </div>
);

export default logo;
