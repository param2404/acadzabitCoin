import axios from 'axios';

export default function fetchUrl() {
    const defaultOptions = {
        baseURL: 'https://api.nomics.com/v1',
    };

    // Create instance
    let instance = axios.create(defaultOptions);


    return instance;
};