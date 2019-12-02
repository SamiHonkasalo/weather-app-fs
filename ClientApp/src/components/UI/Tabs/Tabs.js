import React, { Component } from "react";

import styles from "./Tabs.module.css";

class Tabs extends Component {
  state = {
    activeTab: null
  };
  constructor(props) {
    super(props);

    this.selector = React.createRef();
    this.t1 = React.createRef();
    this.t2 = React.createRef();
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    let activeTab = this.t1.current;
    let activeWidth = activeTab.offsetWidth;

    // Set the selector initial position
    this.selector.current.style.left = activeTab.offsetLeft + "px";
    this.selector.current.style.width = activeWidth + "px";
    this.setState({ activeTab: activeTab });
  }

  updateDimensions() {
    // Move the selector when the screen is resized
    const activeTab = this.state.activeTab;
    let activeWidth = activeTab.offsetWidth;
    this.selector.current.style.left = activeTab.offsetLeft + "px";
    this.selector.current.style.width = activeWidth + "px";
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  tabClickedHandler = e => {
    // First prevent default behaviour
    e.preventDefault();
    // Set the selected item as the active item after removing the previous
    const prevTab = this.state.activeTab;
    const activeTab = e.target;
    prevTab.className = "";
    const activeClass = [styles.Active];
    activeTab.className = activeClass;
    this.setState({ activeTab: activeTab });

    // Move the selector
    let activeWidth = activeTab.offsetWidth;
    this.selector.current.style.left = activeTab.offsetLeft + "px";
    this.selector.current.style.width = activeWidth + "px";

    // Let the Parent know, which tab is selected
    this.props.clicked(activeTab.name);
  };

  render() {
    return (
      <nav className={styles.Tabs}>
        <div className={styles.Selector} ref={this.selector}></div>
        <a
          href="/"
          onClick={e => this.tabClickedHandler(e)}
          className={styles.Active}
          ref={this.t1}
          name="0"
        >
          Current Weather/5 Day
        </a>
        <a
          href="/"
          onClick={e => this.tabClickedHandler(e)}
          className={null}
          ref={this.t2}
          name="1"
        >
          10 Day Forecast
        </a>
      </nav>
    );
  }
}

export default Tabs;
