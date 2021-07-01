import axios from 'axios';

const axios1 = axios.create({
    baseURL: 'https://my-app-ba0b0-default-rtdb.firebaseio.com/'
});
export default axios1;