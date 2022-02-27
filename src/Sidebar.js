import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import SignalCellular4BarSharpIcon from '@material-ui/icons/SignalCellular4BarSharp';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar } from '@material-ui/core';
import SidebarChannel from './SidebarChannel';
import { selectUser } from './features/userSlice';
import {useSelector} from "react-redux";
import db, {auth} from './firebase';


function Sidebar() {
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
    const channelName = prompt("Enter a new channel name");
  
    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  const handleDeleteChannel = (id) => {
    if (id) {
      db.collection("channels").doc(id).delete();
    }
  };

  return (
    <div className='sidebar'>
      <div className='sidebar_top'>
        <h3>{user.displayName}</h3>
        <ExpandMoreIcon/>
      </div>

      <div className='sidebar_channels'>
        <div className='sidebar_channelsHeader'>
          <div className='sidebar_header'>
             <ExpandMoreIcon/>
             <h4>Group Chats</h4>
          </div>
          <AddToPhotosIcon onClick={handleAddChannel} className='sidebar_addChannel'/>
        </div>
        <div className="sidebar_channelsList">
            {channels.map(({id, channel}) => (
              <>
              <SidebarChannel
                key={id}
                id={id}
                channelName={channel.channelName}
              />
              <AddToPhotosIcon onClick={() => handleDeleteChannel(id)} className='sidebar_addChannel'/>
              </>
            ))}
       </div>
      </div>

      <div className='sidebar_voice'>
        <SignalCellular4BarSharpIcon className='sidebar_voiceicon'/>
        <div className='sidebar_voiceInfo'>
            <h3>Voice Connected</h3>
            <p>Stream</p>
        </div>

        <div className="sidebar_callIcons">
          <PhoneOutlinedIcon/>
          <InfoOutlinedIcon/> 
        </div>
      </div>
      <div className='sidebar_profile'>
        <Avatar onClick={() => auth.signOut()} src={user.photo} />
        <div className="sidebar_profileInfo">
          <h3>{user.displayName}</h3>
          <p>${user.uid.substring(0,5)}</p>
        </div>

        <div className="sidebar_profileIcons">
          <MicIcon/>
          <HeadsetIcon/>
          <MoreVertIcon/>
        </div>
      </div>
    </div>
  );
}

export default Sidebar
