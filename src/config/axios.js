import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `https://realestate.bdata.asia/`,
})