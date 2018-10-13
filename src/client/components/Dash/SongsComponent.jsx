import React from 'react';

const SongsComponent = (props) => {
  const { searchSongs, songField, updateSongField } = props;
  return (
    <div>
      <div className="songs-header-container">
        <div className="songs-header">
          <strong>Search Songs: </strong>
          <input className="song-search-field" name="songSearchField" onChange={updateSongField} type="text" value={songField} />
          <input className="song-search-submit" name="songSearchSubmit" onClick={searchSongs} type="submit" />
        </div>
      </div>
      <div className="songs-list">
        <strong>Your Songs:</strong>
      </div>
    </div>
  );
}

export default SongsComponent;
