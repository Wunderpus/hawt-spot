import React from 'react';
import './Dashboard.css';

import SongsComponent from './SongsComponent.jsx';
import FriendsComponent from './FriendsComponent.jsx';

const Dashboard = (props) => {
  const { searchSongs, songField, updateSongField } = props;
  return (
    <div>
      <header>HAWT-SPOT DASHBOARD</header>
      <main>
        <SongsComponent searchSongs={searchSongs} songField={songField} updateSongField={updateSongField} />
        <FriendsComponent />
      </main>
    </div>
  );
};

export default Dashboard;
