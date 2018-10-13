import React from 'react';

const FriendsComponent = () => {
  return (
    <div>
      <div className="friends-header-container">
        <div className="friends-header">
          <strong>Search Friends: </strong>
          <input className="friend-search-field" name="friendSearchField" type="text" value="" />
          <input className="friend-search-submit" name="friendSearchSubmit" type="submit" />
        </div>
      </div>
      <div className="friends-list">
        <strong>Your Friends:</strong>
      </div>
    </div>
  );
};

export default FriendsComponent;
