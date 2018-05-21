import axios from 'axios';
import constants from '../../constants';

const path = '/sportsmen/';
const privatePath = '/private/sportsmen/';

export default {
  getSportsman() {
    const resource = '/sportsmen';
    return axios.get(`${constants.API_URL}${resource}`);
  },
  getSportsmen(sportsmenId) {
    return axios.get(`${constants.API_URL}${path}${sportsmenId}`);
  },
  getSportsmenInformation(sportsmenId) {
    const resource = '/information';
    return axios.get(`${constants.API_URL}${path}${sportsmenId}${resource}`);
  },
  getSportsmenMilestones(sportsmenId) {
    const resource = '/milestones';
    return axios.get(`${constants.API_URL}${path}${sportsmenId}${resource}`);
  },
  getSportsmenTokens(sportsmenId) {
    const resource = '/tokens';
    return axios.get(`${constants.API_URL}${path}${sportsmenId}${resource}`);
  },
  getSportsmenExpenses(sportsmenId) {
    const resource = '/expenses';
    return axios.get(`${constants.API_URL}${path}${sportsmenId}${resource}`);
  },
  async checkSportsmenPicture(sportsmenId) {
    try {
      await axios.get(this.getSportsmenPicturePath(sportsmenId));
      return true;
    } catch (err) {
      return false;
    }
  },
  getSportsmenPicturePath(sportsmenId) {
    const resource = '/picture';
    return (`${constants.API_URL}${path}${sportsmenId}${resource}`);
  },
  setSportsmenPicturePath(sportsmenId, fd) {
    console.log(`entrando en setSportsmenPicturePath de index.js con sportsmenId: ${sportsmenId}`);
    // const fd = new FormData();
    // fd.append('newPicture', file);
    const resource = '/picture';
    // const conf = {
    //   headers: { 'content-type': 'multipart/form-data' },
    // };
    return axios.post(`${constants.API_URL}${path}${sportsmenId}${resource}`, fd);
  },

  buyTokens(username, amount, sportsmenId, token) {
    const resource = 'tokens';
    const config = {
      headers: { authorization: `bearer ${token}` },
    };
    return axios.put(`${constants.API_URL}${privatePath}${resource}`, { username, amount, sportsmenId }, config);
  },
};
