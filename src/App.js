import React, { Component } from "react";
import Jsonp from "jsonp";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { urls: [] };
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

  render() {
    const images = this.state.urls.map((url, index) => {
      return <img src={url} key={index} alt={url} />;
    });
    return <div className="App">{images}</div>;
  }
}

export default App;
