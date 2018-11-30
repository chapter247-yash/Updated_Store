import React, { Component } from 'react';
import logo from '../logo.svg';
import img from '../FB_IMG_1537510779190.jpg';
import img1 from '../amit.png';
import img2 from '../bhuvan.jpg';
import '../App.css';


class Main extends Component {

  state = {
    toggle: false,
  };

  function = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  render = () => {
    return (
      <div>
        <div className="row mx-0">
          <div className="col-12 px-0">
            <div className="App">
              <header className="App-header">
                <div className="caption-wrapper">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="Welcome-title">Welcome to React Workshop</h1>
                  <h2 className="App-title"> Learn how to create interactive UIs </h2>
                </div>
              </header>
              <div className="container">
                <div className="row speakerWrapper mx-0">
                  <h2 className="text-center speakerHeading my-5"> Our Speakers </h2>
                  <div className="col-3 section1 px-0">
                    <div>
                      <img src={img1} className="rajat-img" />
                      <h5 className="rajat-nameHeading"> Amit Pratap Singh </h5>
                      <p>IIT wale</p>
                    </div>
                  </div>
                  <div className="col-3 section1 mx-4 px-0">
                    <div>
                      <img src={img} className="rajat-img" />
                      <h5 className="rajat-nameHeading"> Rajat Pillai </h5>
                      <p> Car wale </p>
                    </div>
                  </div>
                  <div className="col-3 section1 px-0">
                    <div>
                      <img src={img2} className="rajat-img" />
                      <h5 className="rajat-nameHeading"> Bhuvan Mishra </h5>
                      <p> Sniper wale </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer mx-0 mt-5">
          <div className="container innerContainer">
            <div className="row innerFooter mx-0">
              <div className="col-6">
                Gyrix © 2018, All Rights Reserved.
              </div>
              <div className="col-6 text-right">
                Design by: Rishabh Jat
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;