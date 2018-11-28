import React from "react";
// import PeopleAlsoViewed from './peopleAlsoViewed.jsx';
// import CompareAtGlance from './compareAtGlance.jsx';
import Tents from "./Tents";
// import Shirts from "./Shirts";
import "unfetch/polyfill"; // This is required for jest tests. Node does not understand the fetch method until you download npm unfetch.

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentItem: false,
      tents: false
    };

    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    const url = window.location.href.split("/");
    const id = +url[url.length - 1];
    if (!isNaN(id) && id !== 0 && id < 103) {
      this.getCurrentItem(this.updateState, id);
    }

    this.getTentData(this.updateState);
    // this.getShirtData(this.updateState);
  }

  getCurrentItem(cb, id) {
    fetch(`http://localhost:8081/product/data/${id}`)
      .then(res => res.json())
      .then(data => cb("currentItem", data))
      .catch(error => console.error(error));
  }

  getTentData(cb) {
    fetch("http://localhost:8081/data/tents")
      .then(res => res.json())
      .then(data => cb("tents", data))
      .catch(error => console.error(error));
  }

  // getShirtData(cb) {
  //   fetch("http://trailblazer-pc.us-east-2.elasticbeanstalk.com/data/shirts")
  //     .then(res => res.json())
  //     .then(data => cb("shirts", data))
  //     .catch(error => console.error(error));
  // }

  updateState(prop, value) {
    this.setState({
      [prop]: value
    });
  }

  render() {
    const { currentItem, tents } = this.state;
    let display;
    if (currentItem) {
      console.log(currentItem);
      // console.log(currentItem.producttype);
      // console.log(currentItem, tents, shirts);
      if (currentItem.producttype === "Tent") {
        display = (
          <Tents
            tents={tents}
            current={currentItem}
            updateState={this.updateState}
          />
        );
      }
    }
    return !tents ? (
      <div className="centered">Loading...:D</div>
    ) : (
      <div>{display}</div>
    );
  }
}
