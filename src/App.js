import React, { Component } from "react";
import Jsonp from "jsonp";
import LazyLoad from "react-lazyload";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { urls: [], currentImage: 0 };
  }

  componentDidMount() {
    Jsonp(
      "https://www.reddit.com/r/SplitDepthGIFS/top.json?sort=top&t=all",
      { param: "jsonp" },
      async (err, data) => {
        if (err) console.error(err);
        const posts = data.data.children
          .filter(post => !post.data.over_18)
          .map(post => post.data.url)
          .filter(url => /gifv?$/.exec(url))
          .map(url => url.replace(/v$/, ""));
        this.setState({ urls: posts });
      }
    );
  }

  handleClick = () => {
    console.log(this.state.currentImage);
    this.setState({
      currentImage:
        this.state.currentImage === this.state.urls.length - 1
          ? 0
          : this.state.currentImage + 1
    });
  };

  render() {
    const images = this.state.urls.map((url, index) => {
      return (
        <LazyLoad key={index} height={400}>
          <img
            src={url}
            alt={url}
            style={index === this.state.currentImage ? {} : { display: "none" }}
          />
        </LazyLoad>
      );
    });
    return (
      <div
        onClick={this.handleClick}
        className="App"
        style={{ paddingBottom: "500px" }}
      >
        {images}
      </div>
    );
  }
}

export default App;
