import {getAccountInfo} from '../api/api.js';

const setModalInfo = (user, modal) => {
  getAccountInfo(() => {

    if(user.status === 'seller') {
      modal.querySelector('[data-name]').textContent = user.userName;
      modal.querySelector('[data-exchangerate]').textContent = user.exchangeRate;
      modal.querySelector('[data-cashlimit]').textContent = `${user.minAmount}\xA0₽\xA0-\xA0${user.exchangeRate * user.balance.amount}\xA0₽`;
      modal.querySelector('[data-rubinput]').setAttribute('placeholder', user.minAmount);

      const paymentMethodSelect = modal.querySelector('[data-paymentmetods]');
      user.paymentMethods.forEach((method) => {
        const newOption = document.createElement('option');
        newOption.textContent = method.provider;
        newOption.setAttribute('value', method.accountNumber || '');
        paymentMethodSelect.appendChild(newOption);
      });

      paymentMethodSelect.addEventListener('change', (evt) => {
        modal.querySelector('[data-bankcardinput]').setAttribute('value', evt.target.value);
      });
    }
  }, () => {

  });

};

export {setModalInfo};
