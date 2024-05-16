/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import React from "react";
import guh from './guh.jpg';
import "./HomePageView.css";

const HomePageView = () => {
  // Render Home page view
  return (
    <div className="home" >
      <img src={guh} className="image" alt="kids"/>
      <div className="home-text">
        <h1>Manage Campuses Today!</h1>
        <p>Click buttons on the navigation bar to view all information</p>
      </div>
    </div>
  );    
}

export default HomePageView;