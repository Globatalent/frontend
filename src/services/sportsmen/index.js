import axios from 'axios';
import constants from '@/constants';

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
  getSportsmenPicturePath(sportsmenId) {
    const resource = '/picture';
    return (`${constants.API_URL}${path}${sportsmenId}${resource}`);
  },
  buyTokens(username, amount, sportsmanID, token) {
    const resource = 'tokens';
    const config = {
      headers: { authorization: `bearer ${token}` },
    };
    return axios.put(`${constants.API_URL}${privatePath}${resource}`, { username, amount, sportsmanID }, config);
  },
};
