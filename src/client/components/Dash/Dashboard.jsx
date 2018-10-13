import React from 'react';
import './Dashboard.css';

import SongsComponent from './SongsComponent.jsx';
import FriendsComponent from './FriendsComponent.jsx';

const Dashboard = () => {
  return (
    <div>
      <header>HAWT-SPOT DASHBOARD</header>
      <main>
      <SongsComponent />
      <FriendsComponent />
      </main>
    </div>
  );
};

export default Dashboard;
