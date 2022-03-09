import { useEffect, useState } from 'react'
import "./Gamebar.css"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import SidebarChannel from './SidebarChannel';
import { selectUser } from './features/userSlice';
import { useSelector } from "react-redux";
import db, { firestore } from './firebase';
import { collection, query, where, getDocs, doc } from "firebase/firestore";

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

    var recombee = require('recombee-js-api-client');
    var client = new recombee.ApiClient('gaming-social-platform-dev', '5ibqr03apGw93S3cZR7pWkEdernCIQbX1troI03Z2UCwcfm7vZSTdzxG7xyEQwee');
    
    console.log(`current user UID: ${user.uid}`)
    console.log(`current user displayName: ${user.displayName}`)
      
    let gamesId = [];
    let gamesName = [];

    fetchItemIdByGameName(channelName)
    .then((gameId) => 
      client.send(new recombee.AddBookmark(user.uid, gameId))
    )
    .then(() => client.send(new recombee.RecommendItemsToUser(user.uid, 5)))
    .then((response) => {
      gamesId = response.recomms.map((game) => parseInt(game.id));
      return fetchGameInfo(gamesId);
    })
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        gamesName.push(doc.data().name)
      })

      //update the game recommended list
      setRecGameList(gamesName)
    })
    .catch(console.log);
  };

  async function fetchItemIdByGameName(gameName){
    const q = query(collection(firestore, "games"), where("name","==", gameName));
    const querySnapshot = await getDocs(q);

    let gameId = null;
    querySnapshot.forEach((doc) => {
      gameId = gameId || doc.id
    })

    return !gameId || (gameId).toString();
  }

  async function fetchGameInfo(gamesId){
    const q = query(collection(firestore, "games"), where("itemId","in", gamesId));
    const querySnapshot = await getDocs(q);  
    return querySnapshot;
  }


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
          {recGameList.map((gameName, i) => <GameSideBar key={i} rank={i+1} gameName={gameName}/>)}
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