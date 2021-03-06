import axios from 'axios';
import config from '../../constants';


export default {
  logUser(data) {
    const resource = '/login';
    return axios.post(`${config.API_URL}${resource}`, data);
  },
  createUser(data) {
    const resource = '/register';
    return axios.post(`${config.API_URL}${resource}`, data);
  },
  regenPassword(userEmail) {
    const resource = '/forgottenpassword';
    const body = {
      email: userEmail,
    };
    return axios.put(`${config.API_URL}${resource}`, body);
  },
};
