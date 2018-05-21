import axios from 'axios';
import constants from '../../constants';

const path = '/sportsmen/';

export default {
  updateSportsmenInfo(data, sportsmen) {
    return axios.put(`${constants.API_URL}${path}${sportsmen}`, data);
  },
};
