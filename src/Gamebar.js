import { useEffect, useState } from 'react'
import "./Gamebar.css"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import SidebarChannel from './SidebarChannel';
import { selectUser } from './features/userSlice';
import { useSelector } from "react-redux";
import db, { firestore } from './firebase';
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { recommendGames } from "./functions/recommendGames";

function Gamebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);
  
  const [channelName, setChannelName] = useState();

  const [recGameList, setRecGameList] = useState([]);

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
    
    console.log(`current user UID: ${user.uid}`)
    console.log(`current user displayName: ${user.displayName}`)

  //   let gamesId = [];
  //   let gamesName = [];
  //   let formattedDatas = [];
  //   let vectorData = [];
  //   let similarityTable = [];
  //   let listItems = [];
    
  //   // Get recommendation
  //   // function to get index
  //   function contains(formattedData, obj) {
  //     var i = a.length;
  //     while (i--) {
  //        if (a[i] === obj) {
  //            return true;
  //        }
  //     }
  //     return false;
  // }
  //   // function to find games in the array //

  //   listItems = (getSimilarDocuments(2, similarityTable))



    //update the game recommended list
    setRecGameList(recommendGames(channelName));
  };

  return (
    <div className='gamebar'>
      <div className='gamebar_top'>
        <h3>Games</h3>
        <ExpandMoreIcon />
      </div>

      <div className='gamebar_channels'>
        <div className='gamebar_channelsHeader'>
          <div className='gamebar_header'>
            <ExpandMoreIcon />
            <h4>Game Recommended</h4>
          </div>
          <AddToPhotosIcon onClick={handleAddChannel} className='gamebar_addChannel' />
        </div>
        <div className="gamebar_channelsList">
          {recGameList.map((game, i) => <GameSideBar key={i} rank={i+1} gameName={game.id}/>)}

        </div>
      </div>



    </div>
  );


}

function GameSideBar({rank, gameName}){
  return (
    <div className='sidebarChannel'>
      <h4><span className='sidebarChannel_hash'>{rank}</span>{gameName}</h4>
    </div>
  )
}


export default Gamebar


