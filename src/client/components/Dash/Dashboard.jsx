import React from 'react';
import './Dashboard.css';

import SongsComponent from './SongsComponent.jsx';
import FriendsComponent from './FriendsComponent.jsx';

const Dashboard = (props) => {
  const { saveSong, searchSongs, songField, songQueryResults, updateSongField } = props;
  return (
    <div>
      <header>HAWT-SPOT DASHBOARD</header>
      <main>
        <SongsComponent saveSong={saveSong} searchSongs={searchSongs} songField={songField} songQueryResults={songQueryResults} updateSongField={updateSongField} />
        <FriendsComponent />
      </main>
    </div>
  );
};

export default Dashboard;
