import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.spaceflightnewsapi.net/v4/articles/?format=json',
});
