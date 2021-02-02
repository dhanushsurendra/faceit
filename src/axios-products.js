import axios from 'axios';

const proxy = 'https://cors-anywhere.herokuapp.com/';

const instance = axios.create({
    baseURL: `${proxy}http://makeup-api.herokuapp.com/api/v1/products.json`,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
});

export default instance;