import axios from 'axios'

export const fetchNews = (query) => axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`);

export const fetchDetails = id => axios.get(`http://hn.algolia.com/api/v1/items/${id}`);