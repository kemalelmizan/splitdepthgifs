import React, { Component } from "react";
import Jsonp from "jsonp";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { urls: [] };
  }

  DisplayGifs = urls => {
    var elem = document.querySelector(".App");
    elem.innerHTML = urls.map(url => `<img src="${url}">`).join("\n");
  };

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
        this.setState({ urls: posts }, this.DisplayGifs(posts));
      }
    );
  }

  render() {
    return <div className="App">GIFS GO HERE!!!</div>;
  }
}

export default App;
