import React from 'react';
import { useDispatch } from 'react-redux';
import {setChannelInfo} from "./features/appSlice";
import './SidebarChannel.css';
import DeleteIcon from '@material-ui/icons/Delete';
import db, {auth} from './firebase';

function SidebarChannel({id, channelName}) {
  const dispatch = useDispatch();

  const handleDeleteChannel = (id) => {
    if (id) {
      db.collection("channels").doc(id).delete();
    }
  };

  return (
    <div className='sidebarChannel' onClick={() => 
      dispatch (
        setChannelInfo({
         channelId: id,
         channelName: channelName,
        })
        )
      }
    >
      <h4><span className='sidebarChannel_hash'>#</span>{channelName}
      <DeleteIcon onClick={() => handleDeleteChannel(id)} className='sidebar_deleteChannel'/></h4>
      
    </div>
  )
}

export default SidebarChannel
