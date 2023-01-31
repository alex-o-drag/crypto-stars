import {getAccountInfo} from '../api/api.js';

const profile = document.querySelector('.user-profile');

const setUserData = () => {
  getAccountInfo((user) => {
    const balanceCrypto = user.balances.find((element) => element.currency === 'KEKS')['amount'];
    const balanceRUB = user.balances.find((element) => element.currency === 'RUB')['amount'];

    profile.querySelector('[data-name]').textContent = user.userName;
    profile.querySelector('[data-crypto]').textContent = balanceCrypto;
    profile.querySelector('[data-rub]').textContent = balanceRUB;

  }, () => {

  });
};

export {setUserData};
