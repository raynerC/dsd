// import { selectUser } from './features/userSlice';
// import {useSelector} from "react-redux";


// const user = useSelector(selectUser);

var recombee = require('recombee-js-api-client');
var rqs = recombee.requests;

var client = new recombee.ApiClient('gaming-social-platform-dev', '5ibqr03apGw93S3cZR7pWkEdernCIQbX1troI03Z2UCwcfm7vZSTdzxG7xyEQwee');

var itemId = '1';
var userId = 'SHxd242LfmPKvkHZtnh4UKp0NSy1';

client.send(new rqs.AddBookmark(userId, itemId))
.then(() => {
  //Get 5 recommended items for user 'user-25'
  return client.send(new rqs.RecommendItemsToUser(userId, 5));
})
.then((response) => {
  console.log("Recommended items for : %j", response.recomms);
})


// client.send(new rqs.AddUser(userId));