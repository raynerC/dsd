import React from 'react'
import "./ChatHeader.css"
import NotificationsIcon from '@material-ui/icons/Notifications';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import GroupIcon from '@material-ui/icons/Group';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import HelpIcon from '@material-ui/icons/Help';

function ChatHeader({ channelName }) {
  return (
    <div className='chatHeader'>
        <div className='chatHeader_left'>
            <h3><span className='chatHeader_hash'>#</span>
              {channelName}
            </h3>
            
        </div>
       
        <div className='chatHeader_right'>

            <div className='chatHeader_search'>
                <input placeholder='search'/>
                <SearchIcon/>
            </div>
        </div>
    </div>
  )
}

export default ChatHeader
