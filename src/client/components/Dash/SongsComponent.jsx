import React from 'react';

const SongsComponent = () => {
  return (
    <div>
      <div className="songs-header-container">
        <div className="songs-header">
          <strong>Search Songs: </strong>
          <input className="song-search-field" name="songSearchField" type="text" value="" />
          <input className="song-search-submit" name="songSearchSubmit" type="submit" />
        </div>
      </div>
      <div className="songs-list">
        <strong>Your Songs:</strong>
      </div>
    </div>
  );
}

export default SongsComponent;
