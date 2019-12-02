import React from "react";

import styles from "./WeatherCard.module.css";
import humidityIcon from "../../../assets/images/004-rain.svg";
import windIcon from "../../../assets/images/001-wind.svg";
import pressureIcon from "../../../assets/images/003-air.svg";
import rainIcon from "../../../assets/images/013-sturm.svg";
import cloudIcon from "../../../assets/images/006-cloud.svg";
import sunriseIcon from "../../../assets/images/008-sun.svg";
import sunsetIcon from "../../../assets/images/010-sunset.svg";
import snowIcon from "../../../assets/images/012-frost.svg";

const currentWeather = props => {
  // Function to convert sunrise and sunset times to readable time from unix time
  const convertTime = time => {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(time * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Will display time in HH:MM format
    let formattedTime = hours + ":" + minutes.substr(-2);
    return formattedTime;
  };

  // Conver the cloud amount to a string
  let cloudStr = "";
  if (props.clouds >= 0 && props.clouds <= 5) {
    cloudStr = "Clear";
  }
  if (props.clouds > 5 && props.clouds <= 25) {
    cloudStr = "Few";
  }
  if (props.clouds > 25 && props.clouds <= 50) {
    cloudStr = "Scattered";
  }
  if (props.clouds > 50 && props.clouds <= 87) {
    cloudStr = "Broken";
  }
  if (props.clouds > 87 && props.clouds <= 100) {
    cloudStr = "Overcast";
  }

  // Get current time and compare to sunset/sunrise and display both also in the target place time

  // Times are users local time
  const sunrise = convertTime(props.sunrise);
  const sunset = convertTime(props.sunset);

  // Convert previous times to the locations time
  // First get target location timezone offset
  const targetOffset = props.timezone;
  // Then compare it to user timezone and then calculate the difference
  const localTime = new Date().getTimezoneOffset() * -1;
  // Convert time to seconds
  const targetOffsetS = targetOffset - localTime * 60;
  // Calculate the difference for the prop
  const sunsetLocal = convertTime(props.sunset + targetOffsetS);
  // Calculate the difference for the prop
  const sunriseLocal = convertTime(props.sunrise + targetOffsetS);

  // Convert current weather time
  let currentDate = new Date(props.weatherTime * 1000);
  // Date part from the timestamp
  let weekday = [];
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  let weekdayName = weekday[currentDate.getDay()];
  let date = currentDate.getDate();
  // Get month
  let month = [];
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  let monthName = month[currentDate.getMonth()];
  let year = currentDate.getFullYear();
  // Hours part from the timestamp
  let hours = currentDate.getHours();
  // Minutes part from the timestamp
  let minutes = "0" + currentDate.getMinutes();

  // Will display time in DDD DD.MMM/YYYY HH:MM format
  let weatherTime =
    weekdayName +
    " " +
    date +
    ". " +
    monthName +
    "/" +
    year +
    " " +
    hours +
    ":" +
    minutes.substr(-2);

  // Get the icon matching the weather
  const imgSrc =
    "https://openweathermap.org/img/wn/" + props.weatherIcon + "@2x.png";

  return (
    <div className={styles.WeatherCard}>
      <div className={styles.Title}>
        <h1>{props.city}</h1>
        <h3 className={styles.Station}>{"Station " + props.location}</h3>
        <h3 className={styles.Time}>{weatherTime}</h3>
      </div>

      <div className={styles.Temperature}>
        <h1>{parseInt(props.temperature - 273.15).toFixed(1) + " °C"}</h1>
      </div>

      <div className={styles.Icon}>
        <img src={imgSrc} alt={props.weatherDesc} />
        <h3 className={styles.Description}>{props.weatherDesc}</h3>
      </div>

      <div className={styles.SmallContainer}>
        <img src={humidityIcon} alt="Humidity" />
        <h3>{props.humidity + " %"}</h3>
      </div>

      <div className={styles.SmallContainer}>
        <img src={pressureIcon} alt="Pressure" />
        <h3>{props.pressure + " hPa"}</h3>
      </div>

      <div className={styles.SmallContainer}>
        <img src={windIcon} alt="Wind" />
        <h3>{parseFloat(props.wind) + " m/s"}</h3>
      </div>

      <div className={styles.SmallContainer}>
        <img src={cloudIcon} alt="Clouds" />
        <h3>{cloudStr + " (" + props.clouds + " %)"}</h3>
      </div>

      <div className={styles.SmallContainer}>
        <img src={rainIcon} alt="Rain" />
        <h3>{parseFloat(props.rain) + " mm"}</h3>
      </div>

      <div className={styles.SmallContainer}>
        <img src={snowIcon} alt="Snow" />
        <h3>{parseFloat(props.snow) + " mm"}</h3>
      </div>

      <div className={styles.SmallContainer}>
        <img src={sunriseIcon} alt="Sunrise" />
        <h3>{sunrise + " (" + sunriseLocal + " local)"}</h3>
      </div>

      <div className={styles.SmallContainer}>
        <img src={sunsetIcon} alt="Sunset" />
        <h3>{sunset + " (" + sunsetLocal + " local)"}</h3>
      </div>
    </div>
  );
};

export default currentWeather;
