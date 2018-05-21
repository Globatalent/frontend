import axios from 'axios';
import config from '../../constants';

export default {
  getMarket() {
    const resource = '/sportsmenmarket';
    return axios.get(`${config.API_URL}${resource}`);
    // console.debug(resource);
    // return [
    //   {
    //     country: 'Spain',
    //     completeName: 'Rafael Nadal',
    //     userName: 'rafanadal',
    //     born: '21/01/1988',
    //     totalSupply: 1000,
    //     currentSupply: 945,
    //     tokenValue: 3,
    //     change: '2',
    //   },
    //   {
    //     country: 'Spain',
    //     completeName: 'Jonh Cobra',
    //     userName: 'jonhcobra',
    //     born: '11/11/1985',
    //     totalSupply: 100,
    //     currentSupply: 94,
    //     tokenValue: 0.5,
    //     change: '1',
    //   },
    //   {
    //     country: 'Colombia',
    //     completeName: 'Marcos Luis',
    //     userName: 'narcos',
    //     born: '21/01/2008',
    //     totalSupply: 1234,
    //     currentSupply: 1000,
    //     tokenValue: 2,
    //     change: '5',
    //   },
    //   {
    //     country: 'Catalonia',
    //     completeName: 'Is Not Spain',
    //     userName: 'isnotspain',
    //     born: '17/12/1999',
    //     totalSupply: 500,
    //     currentSupply: 400,
    //     tokenValue: 1,
    //     change: '2',
    //   },
    //   {
    //     country: 'Spain',
    //     completeName: 'Rafael Nadal',
    //     userName: 'rafanadal',
    //     born: '21/01/2007',
    //     totalSupply: 1000,
    //     currentSupply: 945,
    //     tokenValue: 3,
    //     change: '2',
    //   },
    // ];
  },
};
