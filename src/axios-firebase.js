import axios from 'axios';

const instance = axios.create({
    baseURL: `https://faceit-b5b63.firebaseio.com`
});

export default instance;