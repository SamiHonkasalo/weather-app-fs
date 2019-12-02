import React from "react";

import styles from "./SiteInfo.module.css";

const siteInfo = props => {
  return (
    <div className={styles.InfoContainer}>
      <h1>Weather App Information</h1>
      <h3>Application made by Sami Honkasalo</h3>
      <p>
        This application was built during a course about Web Programming. The
        site was made with React. The "navigation" on the single page
        application was done with React-router. The city search was done with
        the{" "}
        <a
          href="https://rapidapi.com/dev132/api/city-geo-location-lookup"
          target="_blank"
          rel="noreferrer noopener"
        >
          City-Geo-Location Lookup API
        </a>
        . The weather results are taken from the{" "}
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Open Weather Map API
        </a>
        . The graphs for the results are done using{" "}
        <a
          href="https://canvasjs.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          CanvasJS
        </a>
        . The weather icons on the current weather "card" are from{" "}
        <a
          href="https://www.flaticon.com/home"
          target="_blank"
          rel="noreferrer noopener"
        >
          Flaticon
        </a>{" "}
        from the following authors:
      </p>
      <ul>
        <li>
          <a
            href="https://www.flaticon.com/authors/swifticons"
            target="_blank"
            rel="noreferrer noopener"
          >
            Swifticons
          </a>
        </li>
        <li>
          <a
            href="https://www.flaticon.com/authors/vitaly-gorbachev"
            target="_blank"
            rel="noreferrer noopener"
          >
            Vitaly Gorbachev
          </a>
        </li>
        <li>
          <a
            href="https://www.flaticon.com/authors/pixel-perfect"
            target="_blank"
            rel="noreferrer noopener"
          >
            Pixel Perfect
          </a>
        </li>
        <li>
          <a
            href="https://www.flaticon.com/authors/nikita-golubev"
            target="_blank"
            rel="noreferrer noopener"
          >
            Nikita Golubev
          </a>
        </li>
        <li>
          <a
            href="https://www.flaticon.com/authors/pause08"
            target="_blank"
            rel="noreferrer noopener"
          >
            Pause08
          </a>
        </li>
        <li>
          <a
            href="https://www.flaticon.com/authors/smashicons"
            target="_blank"
            rel="noreferrer noopener"
          >
            Smashicons
          </a>
        </li>
        <li>
          <a
            href="https://www.flaticon.com/authors/good-ware"
            target="_blank"
            rel="noreferrer noopener"
          >
            Good Ware
          </a>
        </li>
      </ul>
    </div>
  );
};

export default siteInfo;
