import axios from 'axios';
import constants from '../../constants';

const path = '/private/home/';


export default {
  getOverview(userName, token) {
    const resource = '/overview';
    const config = {
      headers: { authorization: `bearer ${token}` },
    };
    return axios.get(`${constants.API_URL}${path}${userName}${resource}`, config);
  },
  getOverview2(userName, token) {
    const resource = '/investments';
    const config = {
      headers: { authorization: `bearer ${token}` },
    };
    return axios.get(`${constants.API_URL}${path}${userName}${resource}`, config);
  },
};
