import React, { useEffect, useState } from 'react'
import "./Gamebar.css"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import SidebarChannel from './SidebarChannel';
import { selectUser } from './features/userSlice';
import {useSelector} from "react-redux";
import db, {auth} from './firebase';
var recombee = require('recombee-api-client');
var rqs = recombee.requests;
var client = new recombee.ApiClient('gaming-social-platform-dev', 'nKceTJ1qFuxMi6WxBg6dA4TuDg3zLZgkP5vO55RA3HxVVVeueVVs7WzUujGz9ZUC');


function Gamebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection('channels').onSnapshot(snapshot => (
      setChannels(snapshot.docs.map(doc => ({
        id: doc.id,
        channel: doc.data(),
      })))
    ))
  }, [])

  const handleAddChannel = () => {
    const channelName = prompt("What games do you play");
  
    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  var userId = user.uid;

client.send(new recombee.AddBookmark(userId, 1))
.then(() => {
  //Get 5 recommended items for user 'user-25'
  return client.send(new rqs.RecommendItemsToUser(userId, 5));
})
.then((response) => {
  console.log("Recommended items for user-25: %j", response.recomms);
})


  return (
    <div className='gamebar'>
      <div className='gamebar_top'>
        <h3>Games</h3>
        <ExpandMoreIcon/>
      </div>

      <div className='gamebar_channels'>
        <div className='gamebar_channelsHeader'>
          <div className='gamebar_header'>
             <ExpandMoreIcon/>
             <h4>Game Recommended</h4>
          </div>
          <AddToPhotosIcon onClick={handleAddChannel} className='gamebar_addChannel'/>
        </div>
        <div className="gamebar_channelsList">
            {channels.map(({id, channel}) => (
              <gamebarChannel
                key={id}
                id={id}
                channelName={channel.channelName}
              />
            ))}
       </div>
      </div>

      
    
    </div>
  );
}

export default Gamebar