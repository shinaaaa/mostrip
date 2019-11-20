import React, { PureComponent } from "react";

export default class Header extends PureComponent {
  render() {
    return (
      <div id="wrapper">
        <header id="header">
          <div className="avatar">
            <img src="../images/avatar.jpg" alt="" />
          </div>
          <h1>毛stagram</h1>
        </header>
      </div>
    );
  }
}
