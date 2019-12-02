import React from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/">Weather Search</NavigationItem>
    <NavigationItem link="/searchhistory">Search History</NavigationItem>
    <NavigationItem link="/siteinfo">Site Info</NavigationItem>
  </ul>
);

export default navigationItems;
