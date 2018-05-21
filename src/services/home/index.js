import axios from 'axios';
import constants from '@/constants';
import Vue from 'vue';

const path = '/private/home/';
const profilePath = '/private/';

export default {
  getOverview(userName, token) {
    const resource = '/overview';
    const config = {
      headers: { authorization: `bearer ${token}` },
    };
    return axios.get(`${constants.API_URL}${path}${userName}${resource}`, config);
  },
  getInvestments(userName, token) {
    const resource = '/investments';
    const config = {
      headers: { authorization: `bearer ${token}` },
    };
    return axios.get(`${constants.API_URL}${path}${userName}${resource}`, config);
  },
  getWatchlist(userName, token) {
    const resource = '/watchlist';
    const config = {
      headers: { authorization: `bearer ${token}` },
    };
    return axios.get(`${constants.API_URL}${path}${userName}${resource}`, config);
  },
  followSportsmen(userName, sportsmen, sportsmenFullName, tokeValue, token) {
    const resource = '/watchlist';
    const config = {
      headers: { authorization: `bearer ${token}` },
    };
    const body = {
      sportsmanID: sportsmen,
      fullName: sportsmenFullName,
      tokenValue: tokeValue,
    };
    return axios.post(`${constants.API_URL}${path}${userName}${resource}`, body, config);
  },
  unFollowSportsmen(userName, sportsmen, token) {
    const resource = '/watchlist';
    const config = {
      headers: { authorization: `bearer ${token}` },
    };
    const body = {
      sportsmanID: sportsmen,
    };
    return axios.put(`${constants.API_URL}${path}${userName}${resource}`, body, config);
  },
  getInvesting(userName, sportsmen, token) {
    const resource = '/investing';
    const sportsmanID = `/${sportsmen}`;
    const config = {
      headers: { authorization: `bearer ${token}` },
    };
    return axios.get(`${constants.API_URL}${path}${userName}${resource}${sportsmanID}`, config);
  },
  putFunds(username, amount, token) {
    const resource = 'founds';
    const config = {
      headers: { authorization: `bearer ${token}` },
    };
    return axios.put(`${constants.API_URL}${path}${resource}`, { username, amount }, config);
  },

  validateUser(userName, token, step) {
    const resource = '/validate';
    const config = {
      headers: { authorization: `bearer ${token}` },
    };
    return axios.put(`${constants.API_URL}${path}${userName}${resource}`, { step }, config);
  },
  getProfile(userName, token) {
    const resource = '/profile';
    const config = {
      headers: { authorization: `bearer ${token}` },
    };
    return axios.get(`${constants.API_URL}${profilePath}${userName}${resource}`, config);
  },
  updateProfile(userName, uName, userSurname, userEmail, token) {
    const resource = '/profile';
    const body = {
      name: uName,
      surname: userSurname,
      email: userEmail,
    };
    const config = {
      headers: { authorization: `bearer ${token}` },
    };
    return axios.put(`${constants.API_URL}${profilePath}${userName}${resource}`, body, config);
  },
  updatePassword(userName, oldPwd, newPwd, token) {
    const resource = '/password';
    const body = {
      oldPassword: oldPwd,
      newPassword: newPwd,
    };
    const config = {
      headers: { authorization: `bearer ${token}` },
    };
    return axios.put(`${constants.API_URL}${profilePath}${userName}${resource}`, body, config);
  },

};

axios.interceptors.response.use(response => response, (error) => {
  if (error.response && error.response.data && error.response.data.code === '401') {
    Vue.ls.clear();
    window.location = '/';
  }
  return Promise.reject(error);
});
