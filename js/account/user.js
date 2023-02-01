import {getAccountInfo} from '../api/api.js';
import {serverErrorContainer, showServerError} from '../users-info/table.js';

const profile = document.querySelector('.user-profile');

const printUserData = () => {
  getAccountInfo((user) => {
    const balanceCrypto = user.balances.find((element) => element.currency === 'KEKS')['amount'];
    const balanceRUB = user.balances.find((element) => element.currency === 'RUB')['amount'];

    profile.querySelector('[data-name]').textContent = user.userName;
    profile.querySelector('[data-crypto]').textContent = balanceCrypto;
    profile.querySelector('[data-rub]').textContent = balanceRUB;
  }, () => {
    if(serverErrorContainer.style.display !== 'block') {
      showServerError();
    }
  });
};

export {printUserData};
