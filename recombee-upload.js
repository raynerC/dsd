import { selectUser } from './features/userSlice';
import {useSelector} from "react-redux";


const user = useSelector(selectUser);

var recombee = require('recombee-api-client');
var rqs = recombee.requests;

var client = new recombee.ApiClient('gaming-social-platform-dev', 'nKceTJ1qFuxMi6WxBg6dA4TuDg3zLZgkP5vO55RA3HxVVVeueVVs7WzUujGz9ZUC');

var itemId = 'product-270';
var userId = user.uid;

client.send(new recombee.AddBookmark(userId, 1))
.then(() => {
  //Get 5 recommended items for user 'user-25'
  return client.send(new rqs.RecommendItemsToUser(userId, 5));
})
.then((response) => {
  console.log("Recommended items for user-25: %j", response.recomms);
})