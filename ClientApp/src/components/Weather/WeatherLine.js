import React from "react";

import styles from "./WeatherLine.module.css";

const WeatherLine = props => {
  return (
    <span className={styles.WeatherLine}>
      <h2 className={styles.Label}>{props.label}</h2>{" "}
      <p className={styles.Text}> {props.text}</p>
    </span>
  );
};

export default WeatherLine;
