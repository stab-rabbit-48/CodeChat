import React from 'react';
import { useNavigate } from "react-router-dom";

const FavoriteElement = props => {

  const navigate = useNavigate();
  
  return(
    <div className='favorites'>
      <h2 onClick={(e) => {
        navigate('/chatroom', {state: {name: props.name, room: props.chatroomName}});
      }}>{props.chatroomName}'s Room</h2>
    </div>
  );
};

export default FavoriteElement;