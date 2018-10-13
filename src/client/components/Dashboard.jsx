import React, { Component } from 'react';

const Dashboard = (props) => {
  return (
    <h1>hello {props.loggedInUser} </h1>
  );
};

export default Dashboard;